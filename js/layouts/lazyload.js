export default function initLazyLoad(){const t=document.querySelectorAll("img"),e=new IntersectionObserver(((t,e)=>{t.forEach((t=>{if(t.isIntersecting){const r=t.target;r.src=r.getAttribute("data-src"),r.removeAttribute("lazyload"),e.unobserve(r)}}))}),{rootMargin:"0px",threshold:.1});t.forEach((t=>{t.hasAttribute("lazyload")&&e.observe(t)}))}