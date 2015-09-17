import React from 'react';

export default class Dynamic extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      component: null
    };
  }
  componentDidMount() {
    // load hello dynamically
    // in practice this could be a big component/dependency
    require.ensure([], (require) => {
      this.setState({
        component: require('./hello.jsx')
      })
    });
  }
  render() {
    const component = this.state.component;

    return (
      <div>
        {component && React.createElement(component)}
      </div>
    );
  }
}
