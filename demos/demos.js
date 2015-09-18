export default resolveDemos([
  {
    name: 'Hello World!',
    slug: 'hello',
    description: 'Hello world! in React'
  },
  {
    name: 'Wrapper',
    slug: 'wrapper',
    description: 'Wrapper demo in React'
  },
  {
    name: 'Dynamic',
    slug: 'dynamic',
    description: 'This bit is loaded dynamically using Webpack'
  },
  {
    name: 'Context',
    slug: 'context',
    description: 'This demo shows how to set up context'
  }
]);

function resolveDemos(configuration) {
  const req = require.context('.', true, /index\.jsx$/);
  const reqRaw = require.context(
    'html!../loaders/prism?language=javascript!../loaders/content!.', true, /index\.jsx$/
  );

  return configuration.map((item) => {
    const path = './' + item.slug + '/index.jsx';

    item.demo = req(path);
    item.code = reqRaw(path);

    return item;
  });
}
