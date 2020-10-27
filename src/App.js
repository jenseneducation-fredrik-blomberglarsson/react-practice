import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Fredrik', age: 25 },
      { name: 'Peter', age: 45 },
      { name: 'Gustav', age: 54 }
    ],
    showPersons: false
  }

  switchNameHandler = (newName) => {
    console.log('Clicked!');
    //DON'T do this: this.state.persons[0].name = 'Fredrik Blomberg';
    this.setState({
      persons: [
        { name: newName, age: 25 },
        { name: 'Peter', age: 45 },
        { name: 'Gustav', age: 54 }
      ]
    })
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: 'Fredrik', age: 25 },
        { name: event.target.value, age: 45 },
        { name: 'Gustav', age: 54 }
      ]
    })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  render() {
    const style = { // Inline styles, Camel case
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          <Person name={this.state.persons[0].name}
            age={this.state.persons[0].age} />
          <Person name={this.state.persons[1].name}
            age={this.state.persons[1].age}
            click={this.switchNameHandler.bind(this, 'Fredrik!')}
            changed={this.nameChangedHandler}>
            My hobbies: Dancing</Person>
          <Person name={this.state.persons[2].name}
            age={this.state.persons[2].age} />
        </div>
      )
    }

    return (
      // JSX, looks like HTML but JS in the end. Gets compiled to code underneath (greyed out).
      <div className="App">
        <h1>Hi, React App Test</h1>
        <p>This is really working!</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle persons</button>
        {persons}
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
