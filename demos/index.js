import 'array.prototype.find';
import Promise from 'es6-promise';
import 'whatwg-fetch';

Promise.polyfill();

import React from 'react';
import ReactiveRouter from 'reactive-router';
import Controller from 'cerebral-react-immutable-store';
import App from './App.jsx';

const controller = Controller({
  url: '/'
});

controller.signal('demoRouter', (args, state) => {
  state.set('url', args.path);
});

controller.eventEmitter.on('change', (state) => {
  router.set(state.url);
});

const router = ReactiveRouter({
  '/:demo': controller.signals.demoRouter
}, {
  hashbang: false
});

main();

function main() {
  const app = document.createElement('div');

  document.body.appendChild(app);

  React.render(controller.injectInto(App), app);
}
