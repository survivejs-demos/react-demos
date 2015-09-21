'use strict';
var qs = require('querystring');
var highlight = require('prismjs').highlight;
var languages = require('prism-languages');

module.exports = function(source) {
  this.cacheable();
  var query = qs.parse(this.query.slice(1));
  var language = query.language;

  if(language === 'html') {
    language = 'markup';
  }

  if(!language) {
    throw new Error('prism - missing language!');
  }
  if(!languages[language]) {
    throw new Error('prism - failed to find language definition');
  }

  try {
    return highlight(source, languages[language]);
  }
  catch(e) {
    throw new Error('prism - failed to highlight', e);
  };

  return source;
};
