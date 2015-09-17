import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react-immutable-store';
import demos from './demos';

@Cerebral({
  url: ['url']
})
export default class App extends React.Component {
  render() {
    const url = this.props.url;

    console.log('url', url);

    return (
      <div>
        {React.createElement(demos[0].demo)}
      </div>
    );
  }
}
