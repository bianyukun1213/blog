export function initMasonry(){var e=document.querySelector(".loading-placeholder"),t=document.querySelector("#masonry-container");if(e&&t){e.style.display="block",t.style.display="none";for(var n=document.querySelectorAll("#masonry-container .masonry-item img"),o=0,i=0;i<n.length;i++){var a=n[i];a.complete?r():a.addEventListener("load",r)}o===n.length&&l()}function r(){++o===n.length&&l()}function l(){e.style.opacity=0,setTimeout((()=>{var n;e.style.display="none",t.style.display="block",n=window.innerWidth>=768?255:150,new MiniMasonry({baseWidth:n,container:t,gutterX:10,gutterY:10,surroundingGutter:!1}).layout(),t.style.opacity=1}),100)}}if(data.masonry){try{swup.hooks.on("page:view",initMasonry)}catch(e){}document.addEventListener("DOMContentLoaded",initMasonry)}