// https://medium.com/@skwee357/the-land-of-undocumented-react-js-the-context-99b3f931ff73
var Demo = React.createClass({
  childContextTypes: {
    name: React.PropTypes.string.isRequired
  },
  getChildContext: function() {
    return {name: 'Jim'};
  },

  render: function() {
    return <Parent/>;
  }
});

var Parent = React.createClass({
  render: function() {
    return <Child/>;
  }
});

var Child = React.createClass({
  contextTypes: {
    name: React.PropTypes.string.isRequired
  },
  render: function() {
    return <div>My name is {this.context.name}</div>;
  }
});
