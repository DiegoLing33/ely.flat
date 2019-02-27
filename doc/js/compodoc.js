var compodoc = {
  EVENTS: {
    READY: "compodoc.ready",
    SEARCH_READY: "compodoc.search.ready"
  }
};

Object.assign(compodoc, EventDispatcher.prototype);

document.addEventListener("DOMContentLoaded", function() {
  compodoc.dispatchEvent({
    type: compodoc.EVENTS.READY
  });
});

window.onload = () => {
  let elements = document.getElementsByClassName(" language-typescript");
  let elements2 = document.getElementsByClassName(" language-ts");

  for (let element of elements) fixStarts(element);
  for (let element of elements2) fixStarts(element);

  function fixStarts(element) {
    element.innerHTML = element.innerHTML.replace(/<span class="token operator">\*<\/span>/g, "");
    element.innerHTML = element.innerHTML.replace(/      /g, "");
  }

};