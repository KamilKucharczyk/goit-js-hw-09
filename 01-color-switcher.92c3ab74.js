const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");let d;e.addEventListener("click",(()=>{d=setInterval((()=>{const e=`#${Math.floor(16777215*Math.random()).toString(16)}`;document.body.style.backgroundColor=e}),1e3),e.disabled=!0,t.disabled=!1})),t.addEventListener("click",(()=>{clearInterval(d),e.disabled=!1,t.disabled=!0}));
//# sourceMappingURL=01-color-switcher.92c3ab74.js.map
