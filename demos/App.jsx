import React from 'react';
import demos from './demos';

export default class App extends React.Component {
  render() {
    return (
      <div>
        {React.createElement(demos[0].demo)}
      </div>
    );
  }
}
