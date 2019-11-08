const $ = require('jquery');

/**
 * Creates a new tip
 */
function Throbber() {
  // h5p-throbber css is described in core
  var $throbber = $('<div/>', {
    'class': 'h5p-throbber'
  });

  return $throbber;
}

export default Throbber;
