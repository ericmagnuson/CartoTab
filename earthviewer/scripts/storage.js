/**
 * A wrapper around the localStorage to cache photo
 */
backgrounds.Storage = new Model({
  /**
   * Set the photo.
   * @param  {Object} photo The photo to save
   */
  setPhoto: function(photo) {
    photo.timestamp = new Date().getTime();

    var string = JSON.stringify(photo);

    localStorage.setItem('photo', string);
  },

  /**
   * Get the cached photo.
   * @return {Object} The cached photo
   */
  getPhoto: function() {
    var photo = localStorage.getItem('photo');

    if (!photo) {
      return null;
    }

    return JSON.parse(photo);
  }
});
