/* global d3, topojson */

/**
 * A globe at the images location.
 */
backgrounds.Globe = new Model({
  options: {
    size: 80,
    selector: '.content__location__globe'
  },
  /**
   * Initialize.
   */
  init: function(options) {
    this.options = options || this.options;

    this.elSelector = this.options.selector;
    this.$el = $(this.elSelector);

    this.data_ = backgrounds.GlobeData;
    this.current_ = [0, 0];

    this.projection_ = d3.geo.orthographic()
      .scale(this.options.size / 2)
      .translate([this.options.size / 2, this.options.size / 2])
      .clipAngle(90)
      .rotate([-this.current_[0], -this.current_[1]]);

    this.path_ = d3.geo.path()
      .projection(this.projection_)
      .pointRadius(3);

    this.svg_ = d3.select(this.elSelector).append('svg')
      .attr('width', this.options.size)
      .attr('height', this.options.size);

    this.world_ = this.svg_.append('path');

    this.currentPoint_ = this.svg_.append('path')
      .attr('class', 'point')
      .attr('d', this.path_)
      .datum({'type': 'Point', 'coordinates': this.current_});

    this.world_
      .datum(
        topojson.feature(
          this.data_,
          this.data_['objects']['land'] // jshint ignore:line
        )
      )
      .attr('class', 'land')
      .attr('d', this.path_);

    this.paths_ = this.svg_.selectAll('path');
  },

  /**
   * Set the photos position as the globes position.
   * @param {Object} photo The photo position to set
   */
  set: function(photo) {
    var lat = photo.lat,
      lng = photo.lng;

    this.current_ = [lng, lat];
    this.currentPoint_.datum({'type': 'Point', 'coordinates': this.current_});
    this.projection_.rotate([-lng, -lat]);
    this.paths_.attr('d', this.path_);
  }
});
