(function(){"use strict";const B=`
:host { all: initial; }
*, *::before, *::after { box-sizing: border-box; }

.rc-root {
  --rc-primary: #5b5bf5;
  --rc-on-primary: #ffffff;
  --rc-bg: #ffffff;
  --rc-surface: #f4f5f9;
  --rc-text: #1a1d29;
  --rc-text-2: #6b7280;
  --rc-border: #e6e8ef;
  --rc-z: 2147483000;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--rc-text);
}

/* ── Launcher bubble ── */
.rc-launcher {
  position: fixed; bottom: 22px; z-index: var(--rc-z);
  width: 58px; height: 58px; border-radius: 50%;
  background: var(--rc-primary); color: var(--rc-on-primary);
  border: none; cursor: pointer; font-size: 26px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 24px rgba(0,0,0,0.22);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.rc-launcher:hover { transform: scale(1.06); }
.rc-launcher:active { transform: scale(0.97); }
.rc-pos-right .rc-launcher { right: 22px; }
.rc-pos-left  .rc-launcher { left: 22px; }

/* ── Panel ── */
.rc-panel {
  position: fixed; bottom: 92px; z-index: var(--rc-z);
  width: 380px; max-width: calc(100vw - 32px);
  height: 560px; max-height: calc(100vh - 130px);
  background: var(--rc-bg); border-radius: 16px; overflow: hidden;
  box-shadow: 0 12px 48px rgba(0,0,0,0.24);
  display: flex; flex-direction: column;
  transform-origin: bottom right; animation: rc-pop 0.16s ease;
}
.rc-pos-right .rc-panel { right: 22px; transform-origin: bottom right; }
.rc-pos-left  .rc-panel { left: 22px; transform-origin: bottom left; }
@keyframes rc-pop { from { opacity: 0; transform: translateY(10px) scale(0.97); } }
.rc-hidden { display: none !important; }

/* ── Header ── */
.rc-header {
  background: var(--rc-primary); color: var(--rc-on-primary);
  padding: 16px 18px; display: flex; align-items: center; gap: 12px;
}
.rc-header-text { flex: 1; min-width: 0; }
.rc-title { font-weight: 650; font-size: 15px; }
.rc-subtitle { font-size: 12.5px; opacity: 0.85; }
.rc-head-btn {
  background: rgba(255,255,255,0.18); border: none; color: inherit;
  width: 30px; height: 30px; border-radius: 8px; cursor: pointer; font-size: 16px;
  display: flex; align-items: center; justify-content: center;
}
.rc-head-btn:hover { background: rgba(255,255,255,0.3); }

/* ── Messages ── */
.rc-messages {
  flex: 1; overflow-y: auto; padding: 16px; display: flex;
  flex-direction: column; gap: 10px; background: var(--rc-surface);
}
.rc-row { display: flex; }
.rc-row.user { justify-content: flex-end; }
.rc-bubble {
  max-width: 80%; padding: 10px 13px; border-radius: 14px;
  white-space: pre-wrap; word-wrap: break-word; font-size: 14px;
}
.rc-bubble.bot {
  background: var(--rc-bg); border: 1px solid var(--rc-border);
  border-bottom-left-radius: 4px;
}
.rc-bubble.user {
  background: var(--rc-primary); color: var(--rc-on-primary);
  border-bottom-right-radius: 4px;
}
.rc-bubble.error { background: #fdeded; border: 1px solid #f5c2c2; color: #c0392b; }
.rc-bubble.agent {
  background: #eef2ff; border: 1px solid #d6ddff; color: var(--rc-text);
  border-bottom-left-radius: 4px;
}
.rc-bubble-meta {
  font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.04em;
  font-weight: 700; color: var(--rc-primary); margin-bottom: 3px;
}

/* ── Live-agent banner + system lines ── */
.rc-banner {
  background: #e9f7ed; color: #1e7a34; font-size: 12.5px; font-weight: 600;
  padding: 8px 14px; text-align: center; border-bottom: 1px solid #cdebd6;
}
.rc-sys {
  text-align: center; font-size: 11.5px; color: var(--rc-text-2);
  margin: 2px 0; padding: 2px 8px;
}

/* ── Typing indicator ── */
.rc-typing { display: inline-flex; gap: 4px; align-items: center; padding: 2px 0; }
.rc-typing span {
  width: 7px; height: 7px; border-radius: 50%; background: var(--rc-text-2);
  animation: rc-blink 1.2s infinite both;
}
.rc-typing span:nth-child(2) { animation-delay: 0.2s; }
.rc-typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes rc-blink { 0%,80%,100% { opacity: 0.25; } 40% { opacity: 1; } }

/* ── Composer ── */
.rc-composer {
  display: flex; gap: 8px; padding: 12px; border-top: 1px solid var(--rc-border);
  background: var(--rc-bg);
}
.rc-input {
  flex: 1; resize: none; border: 1px solid var(--rc-border); border-radius: 10px;
  padding: 10px 12px; font-family: inherit; font-size: 14px; outline: none;
  max-height: 96px; color: var(--rc-text); background: var(--rc-bg);
}
.rc-input:focus { border-color: var(--rc-primary); }
.rc-send {
  background: var(--rc-primary); color: var(--rc-on-primary); border: none;
  border-radius: 10px; width: 42px; cursor: pointer; font-size: 18px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.rc-send:disabled { opacity: 0.5; cursor: not-allowed; }

.rc-footer {
  text-align: center; font-size: 11px; color: var(--rc-text-2);
  padding: 6px; background: var(--rc-bg);
}
.rc-footer a { color: var(--rc-text-2); }
`;function P(s,o,t,n){const l=`${s.replace(/^http/,"ws").replace(/\/$/,"")}/ws/chat/${encodeURIComponent(t)}?api_key=${encodeURIComponent(o)}`;let r=null,w=!1;const k=()=>{r=new WebSocket(l),r.onopen=()=>n.onStatus(!0),r.onclose=()=>{n.onStatus(!1),w||setTimeout(k,2e3)},r.onmessage=m=>{let c;try{c=JSON.parse(m.data)}catch{return}switch(c.type){case"history":n.onHistory(c.messages||[],c.mode||"ai",c.agent_name);break;case"token":n.onToken(c.token||"");break;case"ai_done":n.onAiDone();break;case"agent_message":n.onAgentMessage(c.text||"",c.agent_name||"Agent");break;case"mode":n.onMode(c.mode,c.text,c.agent_name);break;case"system":n.onSystem(c.text||"");break}}};k();const i=m=>{r&&r.readyState===WebSocket.OPEN&&r.send(JSON.stringify(m))};return{send:m=>i({type:"message",text:m}),requestHuman:()=>i({type:"request_human"}),close:()=>{w=!0,r==null||r.close()}}}function L(){return Math.random().toString(36).slice(2,10)+Date.now().toString(36)}const J={visitor:"user",ai:"bot",agent:"agent",system:"system"};function j(s){var q;const o=s.theme??{},t=s.target??document.body,n=o.position??"bottom-right",g=`ragchat:${s.chatbotId}`;let l;try{l=((q=JSON.parse(localStorage.getItem(g)||"null"))==null?void 0:q.sessionId)||L()}catch{l=L()}try{localStorage.setItem(g,JSON.stringify({sessionId:l}))}catch{}let r=[],w="ai",k=null,i=null;const m=document.createElement("div");m.setAttribute("data-ragchat",s.chatbotId);const c=m.attachShadow({mode:"open"}),U=document.createElement("style");U.textContent=B,c.appendChild(U);const h=document.createElement("div");h.className=`rc-root rc-pos-${n==="bottom-left"?"left":"right"}`,o.primaryColor&&h.style.setProperty("--rc-primary",o.primaryColor),o.textOnPrimary&&h.style.setProperty("--rc-on-primary",o.textOnPrimary),o.zIndex!=null&&h.style.setProperty("--rc-z",String(o.zIndex)),c.appendChild(h);const f=document.createElement("button");f.className="rc-launcher",f.setAttribute("aria-label","Open chat"),f.textContent=o.launcherIcon??"💬",h.appendChild(f);const x=document.createElement("div");x.className="rc-panel rc-hidden",x.setAttribute("role","dialog"),x.innerHTML=`
    <div class="rc-header">
      <div class="rc-header-text">
        <div class="rc-title"></div>
        <div class="rc-subtitle"></div>
      </div>
      <button class="rc-head-btn rc-human" title="Talk to a human" aria-label="Talk to a human">🧑‍💼</button>
      <button class="rc-head-btn rc-close" title="Close" aria-label="Close">×</button>
    </div>
    <div class="rc-banner rc-hidden"></div>
    <div class="rc-messages"></div>
    <form class="rc-composer">
      <textarea class="rc-input" rows="1"></textarea>
      <button type="submit" class="rc-send" aria-label="Send">➤</button>
    </form>
    <div class="rc-footer">Powered by RAG Console</div>
  `,h.appendChild(x);const b=e=>x.querySelector(e);b(".rc-title").textContent=o.title??"Assistant",b(".rc-subtitle").textContent=o.subtitle??"Ask me anything";const y=b(".rc-messages"),E=b(".rc-banner"),W=b(".rc-composer"),u=b(".rc-input"),M=b(".rc-human");u.placeholder=o.placeholder??"Type your message…";let C=null,v=null;const I=()=>{y.scrollTop=y.scrollHeight},N=e=>{if(e.role==="system"){const p=document.createElement("div");return p.className="rc-sys",p.textContent=e.text,p}const a=document.createElement("div");a.className=`rc-row ${e.role==="user"?"user":"bot"}`;const d=document.createElement("div");if(d.className=`rc-bubble ${e.role}`,e.role==="agent"&&e.name){const p=document.createElement("div");p.className="rc-bubble-meta",p.textContent=e.name,d.appendChild(p)}return d.appendChild(document.createTextNode(e.text)),a.appendChild(d),a},z=()=>{y.innerHTML="";const e=r.length===0&&o.welcomeMessage?[{role:"bot",text:o.welcomeMessage}]:r;for(const a of e)y.appendChild(N(a));I()},S=e=>{r.push(e),y.appendChild(N(e)),I()},F=()=>{if(C)return;const e=document.createElement("div");e.className="rc-row bot",e.innerHTML='<div class="rc-bubble bot"><span class="rc-typing"><span></span><span></span><span></span></span></div>',y.appendChild(e),C=e,I()},T=()=>{C==null||C.remove(),C=null},_=e=>{e?(E.classList.remove("rc-hidden"),E.textContent=e):(E.classList.add("rc-hidden"),E.textContent="")},$=(e,a)=>{w=e==="human"?"human":"ai",k=a??k,w==="human"?(_(`🟢 You're chatting with ${k||"a team member"}`),M.classList.add("rc-hidden")):(_(null),M.classList.remove("rc-hidden"))},D=()=>({onStatus:()=>{},onHistory:(e,a,d)=>{r=e.map(p=>({role:J[p.sender]||"bot",text:p.content,name:p.agent_name||void 0})),$(a,d),z()},onToken:e=>{if(T(),!v){const a={role:"bot",text:""};r.push(a);const d=N(a);y.appendChild(d),v={msg:a,el:d.querySelector(".rc-bubble")}}v.msg.text+=e,v.el.textContent=v.msg.text,I()},onAiDone:()=>{T(),v=null},onAgentMessage:(e,a)=>{T(),S({role:"agent",text:e,name:a})},onMode:(e,a,d)=>{$(e,d),a&&S({role:"system",text:a})},onSystem:e=>S({role:"system",text:e})});i=P(s.apiUrl,s.apiKey,l,D());const R=()=>{const e=u.value.trim();e&&(u.value="",u.style.height="auto",S({role:"user",text:e}),w==="ai"&&F(),i==null||i.send(e))};W.addEventListener("submit",e=>{e.preventDefault(),R()}),u.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),R())}),u.addEventListener("input",()=>{u.style.height="auto",u.style.height=Math.min(u.scrollHeight,96)+"px"}),M.addEventListener("click",()=>{i==null||i.requestHuman(),S({role:"system",text:"Requesting a human agent…"})});let O=!1;const A=()=>{O=!0,x.classList.remove("rc-hidden"),f.classList.add("rc-hidden"),z(),setTimeout(()=>u.focus(),50)},H=()=>{O=!1,x.classList.add("rc-hidden"),f.classList.remove("rc-hidden")},G=()=>O?H():A(),Y=()=>{l=L();try{localStorage.setItem(g,JSON.stringify({sessionId:l}))}catch{}r=[],v=null,z(),i==null||i.close(),i=P(s.apiUrl,s.apiKey,l,D())};return f.addEventListener("click",A),b(".rc-close").addEventListener("click",H),t.appendChild(m),z(),{open:A,close:H,toggle:G,reset:Y,destroy:()=>{i==null||i.close(),m.remove()}}}function K(s){if(!s||!s.apiUrl||!s.apiKey||!s.chatbotId)throw new Error("RagChat.init requires { apiUrl, apiKey, chatbotId }.");return j(s)}window.RagChat={init:K},function(){const o=document.currentScript||(()=>{const l=document.getElementsByTagName("script");for(let r=l.length-1;r>=0;r--)if(l[r].src&&l[r].dataset.apiKey)return l[r];return null})();if(!o)return;const t=o.dataset;if(!t.apiUrl||!t.apiKey||!t.chatbotId)return;const n={};t.primaryColor&&(n.primaryColor=t.primaryColor),t.textOnPrimary&&(n.textOnPrimary=t.textOnPrimary),(t.position==="bottom-left"||t.position==="bottom-right")&&(n.position=t.position),t.title&&(n.title=t.title),t.subtitle&&(n.subtitle=t.subtitle),t.welcomeMessage&&(n.welcomeMessage=t.welcomeMessage),t.placeholder&&(n.placeholder=t.placeholder),t.launcherIcon&&(n.launcherIcon=t.launcherIcon);const g=()=>K({apiUrl:t.apiUrl,apiKey:t.apiKey,chatbotId:t.chatbotId,theme:n});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",g):g()}()})();
