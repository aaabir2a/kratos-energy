/**
 * Kratos CRM public API — client bindings.
 *
 * Base URL comes from NEXT_PUBLIC_API_BASE (must include the /api/v1 suffix).
 * Falls back to the production host so a missing env never breaks a build.
 */
export const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE || "https://api.kratos-energy.com/api/v1"
).replace(/\/+$/, "");

/* ----------------------------------------------------------------- types -- */

export type ApiEnvelope<T> =
  | { success: true; data: T; meta?: PageMeta }
  | { success: false; error: { code: string; message: string; details?: unknown } };

export type PageMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Product = {
  id: string;
  category: string;
  brandName: string;
  capacity: string | null;
  stock: number | null;
  basePrice: string;
  stateRebate: string;
  federalRebate: string;
  imageUrl: string | null;
  officialUrl: string | null;
  isActive: boolean;
  finalPrice: number;
};

export type PackageProduct = {
  productId: string;
  quantity: number;
  sortOrder: number;
  product: Product;
};

export type Package = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  power: string | null;
  estimatedPrice: string;
  imageUrl: string | null;
  isPublished: boolean;
  products: PackageProduct[];
  componentsTotal: number;
  displayPrice: number;
};

export type HeroImage = {
  url: string;
  originalUrl: string;
  width: number;
  height: number;
};

export type HeroImages = {
  desktop: HeroImage[];
  mobile: HeroImage[];
};

export type Project = {
  id: string;
  title: string;
  description: string | null;
  /** Always an array; images[0] is the cover. */
  images: string[];
  location: string | null;
  projectDate: string | null;
  createdAt: string;
};

export type LeadFieldType =
  | "text"
  | "textarea"
  | "email"
  | "phone"
  | "number"
  | "select"
  | "radio"
  | "multiselect"
  | "checkbox"
  | "date";

export type LeadFormField = {
  field_name: string;
  label: string;
  type: LeadFieldType;
  required: boolean;
  order: number;
  /** First-class lead column this field feeds (e.g. "firstName", "email"). */
  maps_to?: string;
  options?: string[];
  placeholder?: string;
  help_text?: string;
  validation?: { min?: number; max?: number; pattern?: string };
};

export type LeadForm = {
  id: string;
  formTitle: string;
  submitButtonText: string;
  version: number;
  fieldsSchema: LeadFormField[];
};

/** CRM-managed landing page (GET /p/:slug), including its attached form. */
export type LandingPage = {
  id: string;
  title: string;
  urlSlug: string;
  heroDescription: string | null;
  heroImageUrl: string | null;
  detailedDescription: string | null;
  thankYouMessage: string | null;
  redirectUrl: string | null;
  seoMeta: Record<string, unknown> | null;
  themeConfig: Record<string, unknown> | null;
  customLeadForm: LeadForm | null;
};

export type LeadSubmission = {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  message?: string;
  consentMarketing?: boolean;
  /** Attribute the lead to a CRM landing page (increments its conversions). */
  landingPageSlug?: string;
  /** Attribute to a standalone custom form. */
  customLeadFormId?: string;
  customFields?: Record<string, unknown>;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
  fbclid?: string;
  referrerUrl?: string;
  /** Honeypot — always send empty. */
  website?: string;
};

/* --------------------------------------------------------------- helpers -- */

class ApiError extends Error {
  constructor(message: string, readonly code: string, readonly details?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: { Accept: "application/json", ...(init?.headers ?? {}) },
    });
  } catch {
    // fetch rejects on network failure / CORS / mixed-content block.
    throw new ApiError(
      `Could not reach the server at ${API_BASE}. Check the API URL, CORS and http/https.`,
      "NETWORK",
    );
  }

  let body: ApiEnvelope<T> | null = null;
  try {
    body = (await res.json()) as ApiEnvelope<T>;
  } catch {
    /* non-JSON response */
  }

  if (!body) {
    throw new ApiError(`Request failed (${res.status})`, "NETWORK");
  }
  if (!body.success) {
    throw new ApiError(body.error.message, body.error.code, body.error.details);
  }
  return body.data;
}

/* ------------------------------------------------------------- endpoints -- */

export function getHeroImages(signal?: AbortSignal): Promise<HeroImages> {
  return request<HeroImages>("/public/hero-images", { signal });
}

/**
 * Server-side variant (RSC only): ISR-cached so hero image URLs are in the
 * first HTML payload — the browser starts loading them with the page instead
 * of after hydration. Revalidates on the backend's own 5-minute cache window.
 */
export function getHeroImagesServer(): Promise<HeroImages> {
  return request<HeroImages>("/public/hero-images", {
    next: { revalidate: 300 },
  } as RequestInit);
}

/** CRM-managed lead form schema (specific form ID, or the global form). */
export function getLeadForm(id?: string, signal?: AbortSignal): Promise<LeadForm | null> {
  const url = id ? `/public/lead-form/${encodeURIComponent(id)}` : "/public/lead-form";
  return request<LeadForm | null>(url, { signal });
}

/** CRM-managed landing page by slug (content + attached form). RSC ISR-cached. */
export function getLandingPageServer(slug: string): Promise<LandingPage> {
  return request<LandingPage>(`/p/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  } as RequestInit);
}

export function getProjects(
  params: { limit?: number } = {},
  signal?: AbortSignal,
): Promise<Project[]> {
  const q = new URLSearchParams();
  q.set("limit", String(params.limit ?? 24));
  return request<Project[]>(`/public/projects?${q.toString()}`, { signal });
}

/** Server-side (RSC) variant, ISR-cached so project data ships in the HTML. */
export function getProjectsServer(limit = 24): Promise<Project[]> {
  return request<Project[]>(`/public/projects?limit=${limit}`, {
    next: { revalidate: 300 },
  } as RequestInit);
}

export function getProducts(
  params: { category?: string; limit?: number } = {},
  signal?: AbortSignal,
): Promise<Product[]> {
  const q = new URLSearchParams();
  if (params.category) q.set("category", params.category);
  q.set("limit", String(params.limit ?? 24));
  return request<Product[]>(`/public/products?${q.toString()}`, { signal });
}

export function getPackages(
  params: { limit?: number } = {},
  signal?: AbortSignal,
): Promise<Package[]> {
  const q = new URLSearchParams();
  q.set("limit", String(params.limit ?? 12));
  return request<Package[]>(`/public/packages?${q.toString()}`, { signal });
}

export function submitLead(payload: LeadSubmission): Promise<{ message: string; reference?: string }> {
  return request<{ message: string; reference?: string }>("/leads/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ website: "", ...payload }),
  });
}

export { ApiError };
