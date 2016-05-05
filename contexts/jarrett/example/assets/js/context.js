var ContextApp = {
  // Queries the <input type="slider"> for its current value and emits
  // the changeRadius event. The event receives the radius as its parameter.
  emitChangeRadius: function() {
    var radius = parseFloat(ContextApp.radiusSlider.val());
    ContextApp.emit('changeRadius', radius);
  },
  
  initialize: function() {
    ContextApp.initSlider();
    ContextApp.initOutput();
    ContextApp.initCircle();
    
    ContextApp.emitChangeRadius();
    
    ContextApp.emit('initialize');
  },
  
  // The <circle> tag.
  initCircle: function() {
    ContextApp.circle = $('#circle-svg circle');
    ContextApp.on('changeRadius', function(radius) {
      ContextApp.circle.attr('r', radius * 5);
    });
  },
  
  // The <output> tag.
  initOutput: function() {
    ContextApp.radiusOutput = $('#radius-output');
    ContextApp.on('changeRadius', function(radius) {
      ContextApp.radiusOutput.html(
        radius.toFixed(1)
      );
    });
  },
  
  // The <input type="slider"> tag.
  initSlider: function() {
    ContextApp.radiusSlider = $('#radius-slider');
    ContextApp.radiusSlider.rangeslider({polyfill: false});
    ContextApp.radiusSlider.on('input',
      _.throttle(ContextApp.emitChangeRadius, 75)
    );
  },
  
  // Returns the maximum value of the radius.
  maxRadius: function() {
    return parseFloat(ContextApp.radiusSlider.attr('max'));
  },
  
  // Returns the minimum value of the radius.
  minRadius: function() {
    return parseFloat(ContextApp.radiusSlider.attr('min'));
  },
  
  // Returns the current radius.
  radius: function() {
    return parseFloat(ContextApp.radiusSlider.val());
  },
  
  // Sets the radius, triggering the changeRadius event.
  setRadius: function(radius) {
    // To update the slider widget, we must trigger its change event.
    ContextApp.radiusSlider.val(radius).change();
    ContextApp.emitChangeRadius();
  }
};

// https://github.com/allouis/minivents
Events(ContextApp);

$(ContextApp.initialize);