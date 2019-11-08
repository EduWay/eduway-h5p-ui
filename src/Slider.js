const $ = require('jquery');
const { EventDispatcher } = require('./EventDispatcher');
const Transition = require('./Transition');

/**
 * Creates a new Slider
 *
 * @param {object} [params] Additional parameters
 */
function Slider(params) {
  EventDispatcher.call(this);

  this.$slider = $('<div>', $.extend({
    'class': 'h5p-joubel-ui-slider'
  }, params));

  this.$slides = [];
  this.currentIndex = 0;
  this.numSlides = 0;
}
Slider.prototype = Object.create(EventDispatcher.prototype);
Slider.prototype.constructor = Slider;

Slider.prototype.addSlide = function ($content) {
  $content.addClass('h5p-joubel-ui-slide').css({
    'left': (this.numSlides*100) + '%'
  });
  this.$slider.append($content);
  this.$slides.push($content);

  this.numSlides++;

  if(this.numSlides === 1) {
    $content.addClass('current');
  }
};

Slider.prototype.attach = function ($container) {
  $container.append(this.$slider);
};

Slider.prototype.move = function (index) {
  var self = this;

  if(index === 0) {
    self.trigger('first-slide');
  }
  if(index+1 === self.numSlides) {
    self.trigger('last-slide');
  }
  self.trigger('move');

  var $previousSlide = self.$slides[this.currentIndex];
  Transition.onTransitionEnd(this.$slider, function () {
    $previousSlide.removeClass('current');
    self.trigger('moved');
  });
  this.$slides[index].addClass('current');

  var translateX = 'translateX(' + (-index*100) + '%)';
  this.$slider.css({
    '-webkit-transform': translateX,
    '-moz-transform': translateX,
    '-ms-transform': translateX,
    'transform': translateX
  });

  this.currentIndex = index;
};

Slider.prototype.remove = function () {
  this.$slider.remove();
};

Slider.prototype.next = function () {
  if(this.currentIndex+1 >= this.numSlides) {
    return;
  }

  this.move(this.currentIndex+1);
};

Slider.prototype.previous = function () {
  this.move(this.currentIndex-1);
};

Slider.prototype.first = function () {
  this.move(0);
};

Slider.prototype.last = function () {
  this.move(this.numSlides-1);
};

export module Slider;
