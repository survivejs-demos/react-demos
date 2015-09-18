import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react-immutable-store';
import demos from './demos';
import i18n from './i18n';

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

    this.setState({demo});
  }
  render() {
    const demo = this.state.demo;

    return (
      <div className='app'>
        {this.renderDemos(i18n, demos)}
        {demo ? this.renderDemo(i18n, demo) : this.renderNoDemo(i18n)}
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
        <pre className='code'>
          <code className='lang-javascript' dangerouslySetInnerHTML={{__html: demo.code}} />
        </pre>
      </div>
    );
  }
  renderNoDemo(i18n) {
    return <div>{i18n.noDemo}</div>;
  }
}
