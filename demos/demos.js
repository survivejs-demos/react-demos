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
  }
]);

function resolveDemos(configuration) {
  var req = require.context('.', true, /index\.jsx$/);

  return configuration.map((item) => {
    item.demo = req('./' + item.slug + '/index.jsx');

    return item;
  });
}
