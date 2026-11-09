// Section backgrounds attach after the page has loaded (see .has-bg in index.css).
// A file rather than an inline script so the Content-Security-Policy can forbid inline scripts.
(function () {
  var ready = function () { document.documentElement.classList.add('bg-ready') }
  if (document.readyState === 'complete') ready(); else window.addEventListener('load', ready)
})()
