"use client";

/**
 * Content store — caches CRM public-API reads across the app so a section
 * fetches each resource at most once per page load. Sections read the cached
 * slice and lazily trigger the fetch; in-flight requests are de-duped so
 * mounting two consumers never doubles the network call.
 */
import { create } from "zustand";
import {
  getProducts,
  getPackages,
  getLeadForm,
  type Product,
  type Package,
  type LeadForm,
} from "@/lib/api";

type Status = "idle" | "loading" | "ready" | "error";

type Slice<T> = { status: Status; data: T };

type ContentState = {
  products: Slice<Product[]>;
  packages: Slice<Package[]>;
  /** Lead forms cached per id ("global" for the default form) so a page-
   *  specific form (e.g. a campaign form) never collides with the global one. */
  leadForms: Record<string, Slice<LeadForm | null>>;
  loadProducts: (category?: string) => void;
  loadPackages: () => void;
  loadLeadForm: (id?: string) => void;
};

export const EMPTY_LEAD_FORM: Slice<LeadForm | null> = { status: "idle", data: null };

const inflight = new Map<string, Promise<unknown>>();

export const useContentStore = create<ContentState>((set, get) => {
  /** Run `fetcher` once per key, writing the slice; ignores repeat calls. */
  function load<T>(
    key: keyof ContentState,
    cacheKey: string,
    fetcher: () => Promise<T>,
    apply: (data: T) => Partial<ContentState>,
  ) {
    const slice = get()[key] as Slice<unknown>;
    if (slice.status === "loading" || slice.status === "ready") return;
    if (inflight.has(cacheKey)) return;

    set({ [key]: { ...slice, status: "loading" } } as Partial<ContentState>);

    const p = fetcher()
      .then((data) => set(apply(data) as Partial<ContentState>))
      .catch(() => {
        const cur = get()[key] as Slice<unknown>;
        set({ [key]: { ...cur, status: "error" } } as Partial<ContentState>);
      })
      .finally(() => inflight.delete(cacheKey));

    inflight.set(cacheKey, p);
  }

  return {
    products: { status: "idle", data: [] },
    packages: { status: "idle", data: [] },
    leadForms: {},

    loadProducts: (category) =>
      load(
        "products",
        `products:${category ?? "all"}`,
        () => getProducts({ category }),
        (data) => ({ products: { status: "ready", data } }),
      ),

    loadPackages: () =>
      load("packages", "packages", () => getPackages(), (data) => ({
        packages: { status: "ready", data },
      })),

    loadLeadForm: (id?: string) => {
      const key = id || "global";
      const cacheKey = `leadForm:${key}`;
      const cur = get().leadForms[key] ?? EMPTY_LEAD_FORM;
      if (cur.status === "loading" || cur.status === "ready") return;
      if (inflight.has(cacheKey)) return;

      const setForm = (slice: Slice<LeadForm | null>) =>
        set((s) => ({ leadForms: { ...s.leadForms, [key]: slice } }));

      setForm({ ...cur, status: "loading" });
      const p = getLeadForm(id)
        .then((data) => setForm({ status: "ready", data }))
        .catch(() => setForm({ status: "error", data: null }))
        .finally(() => inflight.delete(cacheKey));
      inflight.set(cacheKey, p);
    },
  };
});
