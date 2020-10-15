import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Fredrik', age: 25 },
      { name: 'Peter', age: 45 },
      { name: 'Gustav', age: 54 }
    ]
  }

  switchNameHandler = () => {
    console.log('Clicked!');
    //DON'T do this: this.state.persons[0].name = 'Fredrik Blomberg';
    this.setState({
      persons: [
        { name: 'Fredrik Blomberg', age: 25 },
        { name: 'Peter Berg', age: 45 },
        { name: 'Gustav Jansson', age: 54 }
      ]
    })
  }

  render() {
    return (
      // JSX, looks like HTML but JS in the end. Gets compiled to code underneath (greyed out).
      <div className="App">
        <h1>Hi, React App Test</h1>
        <p>This is really working!</p>
        <button onClick={this.switchNameHandler}>Show full name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>My hobbies: Dancing</Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
      </div>
    );
    // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;


// FUNCTIONAL COMPONENT WITH REACT HOOKS EXAMPLE

/* import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const app = props => {
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: 'Fredrik', age: 25 },
      { name: 'Peter', age: 45 },
      { name: 'Gustav', age: 54 }
    ]
  });

  const [otherState, setOtherState] = useState('some other value');

  console.log(personsState, otherState);

  const switchNameHandler = () => {
    console.log('Clicked!');
    //DON'T do this: this.state.persons[0].name = 'Fredrik Blomberg';
    setPersonsState({
      persons: [
        { name: 'Fredrik Blomberg', age: 25 },
        { name: 'Peter Berg', age: 45 },
        { name: 'Gustav Jansson', age: 54 }
      ]
    })
  }

  return (
    // JSX, looks like HTML but JS in the end. Gets compiled to code underneath (greyed out).
    <div className="App">
      <h1>Hi, React App Test</h1>
      <p>This is really working!</p>
      <button onClick={switchNameHandler}>Show full name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My hobbies: Dancing</Person>
      <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
    </div>
  );
  // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Does this work now?'));
}

export default app; */
