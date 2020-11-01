import React, { Component } from 'react';

// using CSS modules, for importing CSS modules with react-scripts higher version than 2. -> add modules "person.modules.css". Then you don't have to do the eject steps.
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'


class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Fredrik', age: 25 },
      { id: '2', name: 'Peter', age: 45 },
      { id: '3', name: 'Gustav', age: 54 }
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => { // Using chrome debugger tools with source maps which are generated automatically, is a powerful feature for detecting logical errors. 
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

    let persons = null;

    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}> {/* key always have to be on the outer element in a map method because that's the element we replicate */}
            <Person
            click={() => this.deletePersonHandler(index)}
            name={person.name} 
            age={person.age} 
            changed={(event) => this.nameChangedHandler(event, person.id)}
            />
            </ErrorBoundary>
          })}
        </div>
      );

      btnClass = classes.red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red) // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold); // classes = ['red', 'bold']
    }

    return ( // JSX, looks like HTML but JS in the end. Gets compiled to code underneath (greyed out).
      <div className={classes.App}>
        <h1>Hi, React App Test</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button className={btnClass} onClick={this.togglePersonsHandler}>
            Toggle persons
          </button>
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
