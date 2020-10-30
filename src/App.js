import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';

class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Fredrik', age: 25 },
      { id: '2', name: 'Peter', age: 45 },
      { id: '3', name: 'Gustav', age: 54 }
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex] // Kopia, för att inte mutera orignal staten.
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons : persons})
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice; // Kopierar arrayen och returnera en ny array och lagrar här
    const persons = [...this.state.persons] // Spread operator - Mer använt, samma funktionalitet som ovan.
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  render() {
    const style = { // Inline styles, Camel case
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': { // radium (npm install --save radium)
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
            click={() => this.deletePersonHandler(index)}
            name={person.name} 
            age={person.age} 
            key={person.id}
            changed={(event) => this.nameChangedHandler(event, person.id)}
            />
          })}
        </div>
      );
      style.backgroundColor = 'red'; // dynamic styling
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red') // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold'); // classes = ['red', 'bold']
    }

    // Wrap root component with the styleroot component provided by radium to access advanced features ( like media queries)
    return ( // JSX, looks like HTML but JS in the end. Gets compiled to code underneath (greyed out).
      <StyleRoot>
      <div className="App">
        <h1>Hi, React App Test</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle persons</button>
        {persons}
      </div>
      </StyleRoot>
    );
    // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default Radium(App);


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
