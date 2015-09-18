'use strict';
var fs = require('fs');

module.exports = function(source) {
  this.cacheable();
  var callback = this.async();

  fs.readFile(this.resource, 'utf-8', callback);
};
