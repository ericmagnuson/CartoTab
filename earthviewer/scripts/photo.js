/**
 * The current photo view.
 */
backgrounds.Photo = new Model({
  /**
   * Link template to Google Maps
   * @type {String}
   */
  MAPS_LINK: 'https://www.google.com/maps/@{{lat}},{{lng}},{{zoom}}z/' +
    'data=!3m1!1e3',

  /**
   * Initialize.
   */
  init: function() {
    this.$background = $('.background');
    this.$location = $('.content__location');
    this.$locationRegion = $('.content__location__region');
    this.$locationCountry = $('.content__location__country');
    this.$attributionText = $('.content__attribution__text');
    this.$attributionLogo = $('.content__attribution__logo');

    this.$shareLinks = document.querySelectorAll('.share__popup');

    for (var i = 0; i < this.$shareLinks.length; i++) {
      this.$shareLinks[i].addEventListener('click', this.share);
    }
  },

  /**
   * Set Background photo to the passed photo.
   * @param {Object} photo The photo to set the background to
   */
  set: function(photo) {
    var linkUrl = this.MAPS_LINK
      .replace('{{lat}}', photo.lat)
      .replace('{{lng}}', photo.lng)
      .replace('{{zoom}}', photo.zoom + 1 || 11),
      country = photo.geocode.country,
      location = photo.geocode.locality ||
      photo.geocode.administrative_area_level_2 ||
      photo.geocode.administrative_area_level_1 || '',
      linkTitle = 'See ' + location + ', ' + country +
      ' on Google Maps';

    this.id = photo.id;

    this.$background.style.backgroundImage = 'url(' + photo.dataUri + ')';
    this.$attributionText.textContent = photo.attribution;
    this.$attributionLogo.setAttribute('href', linkUrl);
    this.$attributionLogo.setAttribute('title', linkTitle);
    this.$location.setAttribute('href', linkUrl);
    this.$location.setAttribute('title', linkTitle);
    this.$locationRegion.textContent = location;
    this.$locationCountry.textContent = country;
  },

  /**
   * Share the extension url
   * @param  {Event} event The click event on a share link
   */
  share: function(event) {
    event.preventDefault();

    window.open(
      event.target.href,
      'Share',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
    );
  }
});
