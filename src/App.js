import React, { Component } from 'react';
import './App.css';
import person from './Person/Person';
import Person from './Person/Person';

class App extends Component {
  render() {
    return (
      // JSX, looks like HTML but JS in the end. Gets compiled to code underneath.
      <div className="App">
        <h1>Hi, React App Test</h1>
        <p>This is really working!</p>
        <Person name="Fredrik" age="25" />
        <Person name="Peter" age="45" />
        <Person name="Gustav" age="54" />
      </div>
    );
    // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
