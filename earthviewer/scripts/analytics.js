/**
 * Set up goole analytics namespace.
 * @type {Array}
 */
var _gaq = _gaq || [];

/**
 * Analytics Id.
 * @type {String}
 */
var ANALYTICS_ID = 'UA-54021204-2';

/**
 * Get all link on the page.
 * @type {nodelist}
 */
var links = document.querySelectorAll('a');

/**
 * Set main page tracking.
 */
_gaq.push(['_setAccount', ANALYTICS_ID]);
_gaq.push(['_setCustomVar', 1, 'Version', app.version, 3]);
_gaq.push(['_trackPageview', '/' + app.photo.id]);

/**
 * Insert and load google analytics script.
 */

(function() {
  var ga, s;

  ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';

  s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

/**
 * Track every click on a given link.
 * Use data-type attribute on the link to define click type.
 * @this {event}
 */
function trackClick() {
  var type = this.getAttribute('data-type');

  if (type == 'bookmarks-link') {
    _gaq.push(['_trackEvent', type, 'Open bookmarks']);
  } else if (type == 'share') {
    _gaq.push(['_trackEvent', type, this.getAttribute('title')]);
  } else {
    _gaq.push(['_trackEvent', type, this.id, app.photo.id]);
  }
}

for (var i = 0; i < links.length; i++) {
  var el = links[i];
  el.addEventListener('click', trackClick, true);
}

/**
 * Track install/update events (trying)
 */
var analytics = localStorage.getItem('analytics');

if (analytics) {
  _gaq.push(analytics.split(','));
  localStorage.removeItem('analytics');
}
