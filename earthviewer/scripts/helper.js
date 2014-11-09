/**
 * Fake jQuery Selector
 * @param  {String}  selector The CSS selector
 * @return {Element}          The found element(s)
 */
function $(selector) {
  return document.querySelector(selector);
}
