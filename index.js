import{S as p,i as n}from"./assets/vendor-5ObWk2rO.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();async function y(s){return(await(await fetch(`https://pixabay.com/api/?key=49218943-825793be7dcf8f9e924089ba3&q=${s}&image_type=photo&per_page=30&orientation=horizontal&safesearch=true`)).json()).hits}const l=document.getElementById("loader"),u=document.getElementById("gallery");async function m(s){const r=s.map(({webformatURL:o,largeImageURL:a,tags:e,likes:t,views:i,comments:c,downloads:d})=>`
          <li class="gallery-item">
            <div class="loader" id="loader" style="display: block"></div>
            <a href="${a}">
              <img src="${o}" alt="${e}"/>
              <div class="info">
                <p><b>Likes:</b> ${t}</p>
                <p><b>Views:</b> ${i}</p>
                <p><b>Comments:</b> ${c}</p>
                <p><b>Downloads:</b> ${d}</p>
              </div>
            </a>
          </li>`).join("");u.insertAdjacentHTML("beforeend",r),f()}function f(){document.querySelectorAll(".gallery-item img").forEach(r=>{const o=r.closest(".gallery-item").querySelector(".loader");o&&(o.style.display="none")})}function g(){l.style.display="block"}function h(){l.style.display="none"}const b=document.getElementById("search-form"),L=document.getElementById("gallery");let $=new p(".gallery a",{captionsData:"alt",captionDelay:250});b.addEventListener("submit",async s=>{s.preventDefault(),L.innerHTML="";const r=s.target.elements.searchQuery.value.trim();if(!r){n.error({title:"Error",message:"Please enter a search query",position:"topRight"});return}g();try{const o=await y(r);o.length===0?n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):(m(o),$.refresh())}catch{n.error({title:"Error",message:"An error occurred while fetching images",position:"topRight"})}finally{h()}});
//# sourceMappingURL=index.js.map
