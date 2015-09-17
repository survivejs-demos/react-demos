import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react-immutable-store';
import demos from './demos';

@Cerebral({
  url: ['url']
})
export default class App extends React.Component {
  render() {
    const url = this.props.url;

    // TODO: push to a smarter lifecycle method. this works for now
    const demo = demos.find((d) => url === '/' + d.slug);

    if(!demo) {
      if(url !== '/') {
        console.error('Failed to find demo!');
      }

      return <div>No demo</div>;
    }

    return (
      <div className='app'>
        <div className='name'>{demo.name}</div>
        <div className='description'>{demo.description}</div>
        <div className='demo'>{React.createElement(demo.demo)}</div>
      </div>
    );
  }
}
