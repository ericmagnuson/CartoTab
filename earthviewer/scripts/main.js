/**
 * Main entry point of the app.
 */
backgrounds.App = new Model({

  /**
   * How often we load a new image.
   * @type {Number} The update interval in miliseconds.
   */
  UPDATE_INTERVAL: 0,

  /**
   * Initialize.
   */
  init: function() {
    this.$el = $('body');
    // this.$startPageLink = $('.content__startpage-link');

    this.getVersion();
    this.apiUrl = 'https://www.gstatic.com/prettyearth/' +
      this.getImageId() +
      '.json';

    this.globe = new backgrounds.Globe();
    this.storage = new backgrounds.Storage();
    this.photo = new backgrounds.Photo();

    this.hasPhoto = false;

    this.update();

    // this.$startPageLink.addEventListener('click', this.onStartPageLinkClick);
  },

  /**
   * Get a new image id.
   * @return {int} The new image id.
   */
  getImageId: function() {
    var imageIds = backgrounds.imageIds;
    return imageIds[Math.floor(Math.random() * imageIds.length)];
  },

  /**
   * Get the version of the extension.
   */
  getVersion: function() {
    // var app = chrome.app.getDetails();
    // this.version = app ? app.version : 'dev';
    this.version = 'mac';
  },

  /**
   * When the apps link got clicked.
   * @param  {Event} event The click event
   */
  onStartPageLinkClick: function(event) {
    event.preventDefault();

    // chrome.tabs.update({
    //   url: this.$startPageLink.getAttribute('href')
    // });
  },

  /**
   * Update the shown photo.
   */
  update: function() {
    var photo = this.storage.getPhoto(),
      lastUpdated;

    if (photo) {
      this.hasPhoto = true;
      this.photo.set(photo);
      this.globe.set(photo);
      lastUpdated = new Date().getTime() - photo.timestamp;
    }

    if (lastUpdated < this.UPDATE_INTERVAL) {
      return;
    }

    this.preload();
  },

  /**
   * Preload a new photo.
   */
  preload: function() {
    var request = new XMLHttpRequest(),
      self = this;

    request.open(
      'GET',
      this.apiUrl,
      true
    );

    request.onload = function() {
      if (this.status < 200 || this.status >= 400) {
        return;
      }

      var newPhoto = JSON.parse(this.response);
      self.onPhotoLoad(newPhoto);
    };

    request.send();
  },

  /**
   * When a photo got loaded.
   * @param  {Object} newPhoto The new photo
   */
  onPhotoLoad: function(newPhoto) {
    var oldPhoto = this.storage.getPhoto();

    if (newPhoto === oldPhoto) {
      this.preload();
      return;
    }

    this.storage.setPhoto(newPhoto);

    if (!this.hasPhoto) {
      this.update();
    }
  }
});

/**
 * Initilize app
 * @type {backgrounds app}
 */
window.app = new backgrounds.App();
