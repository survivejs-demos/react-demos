import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react-immutable-store';
import demos from './demos';

@Cerebral({
  url: ['url']
})
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      demo: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    const url = nextProps.url;
    const demo = demos.find((d) => url === '/' + d.slug);

    if(!demo) {
      console.error('Failed to find demo!');
    }

    this.setState({demo});
  }
  render() {
    const i18n = {
      name: 'Name',
      description: 'Description'
    };

    return (
      <div className='app'>
        {this.renderDemos(i18n, demos)}
        {this.renderDemo(i18n, this.state.demo)}
      </div>
    );
  }
  renderDemos(i18n, demos) {
    return (
      <ul className='demos'>
        {demos.map((demo) => <li key={`demo-${demo.slug}`}>
          <a href={demo.slug}>{demo.name}</a>
        </li>)}
      </ul>
    );
  }
  renderDemo(i18n, demo) {
    return (
      <div className='demo'>
        <div className='name'>{i18n.name}: {demo.name}</div>
        <div className='description'>{i18n.description}: {demo.description}</div>
        <div className='demo'>{demo.demo && React.createElement(demo.demo)}</div>
        {/*<div className='code'>{demo.code}</div>*/}
      </div>
    );
  }
}
