!function(){var t,e=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]");e.addEventListener("click",(function(){t=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));document.body.style.backgroundColor=t}),1e3),e.disabled=!0,a.disabled=!1})),a.addEventListener("click",(function(){clearInterval(t),e.disabled=!1,a.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.2a19974c.js.map
