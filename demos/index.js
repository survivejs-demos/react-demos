import 'array.prototype.find';
import Promise from 'es6-promise';
import 'whatwg-fetch';

Promise.polyfill();

import js from 'codemirror/mode/javascript/javascript';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactiveRouter from 'reactive-router';
import Controller from 'cerebral-react-immutable-store';
import App from './App.jsx';

if(process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

const controller = Controller({
  url: '/'
});

controller.signal('demoRouter', (args, state) => {
  state.set('url', args.path);
});

controller.eventEmitter.on('change', (state) => {
  router.set(state.url);
});

let config = {
  hashbang: false
};

if(process.env.NODE_ENV === 'production') {
  config.hashbang = true;
}

const router = ReactiveRouter({
  '/:demo': controller.signals.demoRouter
}, config);

main();

function main() {
  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(controller.injectInto(App), app);
}
