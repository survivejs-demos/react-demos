import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react-immutable-store';
import demos from './demos';
import i18n from './i18n';
import Editor from './Editor.jsx';
import Preview from './Preview.jsx';

@Cerebral({
  url: ['url']
})
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeCode = this.onChangeCode.bind(this);

    this.state = {
      demo: null
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
        <div className='demo'>
        <Preview
          code={demo.code}
          scope={{React}}
        />
        </div>
        <pre className='code'>
          <Editor
            onChange={this.onChangeCode}
            className="code-editor"
            codeText={demo.code}
            theme={"monokai"}
          />
        </pre>
      </div>
    );
  }
  onChangeCode(code) {
    const demo = this.state.demo;

    demo.code = code;

    this.setState({demo});
  }
  renderNoDemo(i18n) {
    return <div>{i18n.noDemo}</div>;
  }
}
