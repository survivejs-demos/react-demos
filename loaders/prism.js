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
    console.error('prism - missing language!');

    return source;
  }
  if(!languages[language]) {
    console.error('prism - failed to find language definition');

    return source;
  }

  try {
    return highlight(source, languages[language]);
  }
  catch(e) {
    console.error('prism - failed to highlight', e);
  };

  return source;
};
