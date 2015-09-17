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
  const req = require.context('.', true, /index\.jsx$/);

  // TODO: figure out the correct way to get just code. now it returns
  // the preprocessed version...
  //const reqRaw = require.context('raw!.', true, /index\.jsx$/);

  return configuration.map((item) => {
    const path = './' + item.slug + '/index.jsx';

    item.demo = req(path);
    //item.code = reqRaw(path);

    return item;
  });
}
