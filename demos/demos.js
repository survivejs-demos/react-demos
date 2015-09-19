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
    name: 'Context',
    slug: 'context',
    description: 'This demo shows how to set up a context'
  }
]);

function resolveDemos(configuration) {
  const reqRaw = require.context(
    'raw!../loaders/content!.', true, /index\.jsx$/
  );

  return configuration.map((item) => {
    const path = './' + item.slug + '/index.jsx';

    item.code = reqRaw(path);

    return item;
  });
}
