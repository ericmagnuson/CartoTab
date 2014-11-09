/**
 * This script runs on extension installation.
 * Tracking events for installing and suspending the extension.
 */

/**
 * Track events to google analytics.
 * @param  {event} event Extension event
 */
function analytics(event) {
  var _gaq = _gaq || [],
    manifest = chrome.runtime.getManifest();

  localStorage.setItem(event.reason, new Date());

  localStorage.setItem('analytics', [
    '_trackEvent',
    event.reason,
    manifest.version,
    event.previousVersion || 0
  ]);
}

/**
 * On uninstall extension.
 */
function onSuspend() {
  analytics({
    reason: 'suspend'
  });
}

/**
 * Get a new image id.
 * @return {int} The new image id.
 */
function getImageId() {
  var imageIds = backgrounds.imageIds;
  return imageIds[Math.floor(Math.random() * imageIds.length)];
}

/**
 * Get the first random picture and store it in localStorage.
 * Caching the first call image.
 * @param {event} event The install event
 */
function onInit(event) {
  var request = new XMLHttpRequest();
  request.open(
    'GET',
    'https://www.gstatic.com/prettyearth/' + getImageId() + '.json',
    true
  );

  request.onload = function() {
    if (this.status < 200 || this.status >= 400) {
      return;
    }

    this.response.timestamp = new Date().getTime();

    localStorage.setItem('photo', this.response);
  };

  request.send();
  analytics(event);
}

/**
 * Add event listeners
 */
chrome.runtime.onInstalled.addListener(onInit);
chrome.runtime.onSuspend.addListener(onSuspend);
