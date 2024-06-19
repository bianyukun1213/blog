import{main}from"../main.js";const elementCode=".mermaid",saveOriginalData=function(){return new Promise(((e,t)=>{try{var i=document.querySelectorAll(".mermaid"),a=i.length;i.forEach((t=>{t.setAttribute("data-original-code",t.innerHTML),0==--a&&e()}))}catch(e){t(e)}}))},resetProcessed=function(){return new Promise(((e,t)=>{try{var i=document.querySelectorAll(".mermaid"),a=i.length;i.forEach((t=>{null!=t.getAttribute("data-original-code")&&(t.removeAttribute("data-processed"),t.innerHTML=t.getAttribute("data-original-code")),0==--a&&e()}))}catch(e){t(e)}}))};export const ModeToggle={modeToggleButton_dom:null,iconDom:null,mermaidLightTheme:null,mermaidDarkTheme:null,async mermaidInit(e){window.mermaid&&(await resetProcessed(),mermaid.initialize({theme:e}),mermaid.init({theme:e},document.querySelectorAll(".mermaid")))},enableLightMode(){document.body.classList.remove("dark-mode"),document.documentElement.classList.remove("dark"),document.body.classList.add("light-mode"),document.documentElement.classList.add("light"),this.iconDom.className="fa-regular fa-moon",main.styleStatus.isDark=!1,main.setStyleStatus(),this.mermaidInit(this.mermaidLightTheme),this.setGiscusTheme()},enableDarkMode(){document.body.classList.remove("light-mode"),document.documentElement.classList.remove("light"),document.body.classList.add("dark-mode"),document.documentElement.classList.add("dark"),this.iconDom.className="fa-regular fa-brightness",main.styleStatus.isDark=!0,main.setStyleStatus(),this.mermaidInit(this.mermaidDarkTheme),this.setGiscusTheme()},async setGiscusTheme(e){if(document.querySelector("#giscus-container")){let t=document.querySelector("iframe.giscus-frame");for(;!t;)await new Promise((e=>setTimeout(e,1e3))),t=document.querySelector("iframe.giscus-frame");for(;t.classList.contains("giscus-frame--loading");)await new Promise((e=>setTimeout(e,1e3)));e??=main.styleStatus.isDark?"dark":"light",t.contentWindow.postMessage({giscus:{setConfig:{theme:e}}},"https://giscus.app")}},isDarkPrefersColorScheme:()=>window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)"),initModeStatus(){const e=main.getStyleStatus();e?e.isDark?this.enableDarkMode():this.enableLightMode():this.isDarkPrefersColorScheme().matches?this.enableDarkMode():this.enableLightMode()},initModeToggleButton(){this.modeToggleButton_dom.addEventListener("click",(()=>{document.body.classList.contains("dark-mode")?this.enableLightMode():this.enableDarkMode()}))},initModeAutoTrigger(){this.isDarkPrefersColorScheme().addEventListener("change",(e=>{e.matches?this.enableDarkMode():this.enableLightMode()}))},async init(){this.modeToggleButton_dom=document.querySelector(".tool-dark-light-toggle"),this.iconDom=document.querySelector(".tool-dark-light-toggle i"),this.mermaidLightTheme=void 0!==theme.mermaid&&void 0!==theme.mermaid.style&&void 0!==theme.mermaid.style.light?theme.mermaid.style.light:"default",this.mermaidDarkTheme=void 0!==theme.mermaid&&void 0!==theme.mermaid.style&&void 0!==theme.mermaid.style.dark?theme.mermaid.style.dark:"dark",this.initModeStatus(),this.initModeToggleButton(),this.initModeAutoTrigger();try{await saveOriginalData().catch(console.error)}catch(e){}}};export default function initModeToggle(){ModeToggle.init()}