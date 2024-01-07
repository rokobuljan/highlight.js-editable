import hljs from "../hljs/es/core.min.js";
import hljs_javascript from '../hljs/es/languages/javascript.min.js';
import hljs_xml from '../hljs/es/languages/xml.min.js';
import hljs_css from '../hljs/es/languages/css.min.js';

hljs.registerLanguage('javascript', hljs_javascript);
hljs.registerLanguage('xml', hljs_xml);
hljs.registerLanguage('css', hljs_css);

const elHTML = document.querySelector(`[data-lang="html"]`);
const elCSS = document.querySelector(`[data-lang="css"]`);
const elJS = document.querySelector(`[data-lang="js"]`);
const elPreview = document.querySelector("#preview");

const hilite = (el) => {
  const elCode = el.previousElementSibling.querySelector("code");
  elCode.textContent = el.textContent;
  delete elCode.dataset.highlighted;
  hljs.highlightElement(elCode);
};

const preview = () => {
  const encodedCSS = encodeURIComponent(`<style>${elCSS.textContent}</style>`);
  const encodedHTML = encodeURIComponent(elHTML.textContent);
  const encodedJS = encodeURIComponent(`<scr` + `ipt>${elJS.textContent}</scr` + `ipt>`);
  const dataURL = `data:text/html;charset=utf-8,${encodedCSS + encodedHTML + encodedJS}`;
  elPreview.src = dataURL;
};

// Initialize!

[elHTML, elCSS, elJS].forEach((el) => {
  el.addEventListener("input", () => {
    hilite(el);
    preview();
  });
  hilite(el);
});

preview();