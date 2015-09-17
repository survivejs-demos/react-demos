import React from 'react';
import ReactiveRouter from 'reactive-router';
import Controller from 'cerebral-react-immutable-store';
import App from './App.jsx';

const controller = Controller({
  url: '/'
});

controller.signal('demoRouter', (args, state) => {
  console.log('set route', args.path);

  state.set('url', args.path);
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
