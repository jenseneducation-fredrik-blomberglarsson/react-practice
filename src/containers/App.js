import React, { Component } from 'react';

// using CSS modules, for importing CSS modules with react-scripts higher version than 2. -> add modules "person.modules.css". Then you don't have to do the eject steps.
import classes from './App.css';
import PersonList from '../components/PersonList/PersonList';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

// The idea behind container is that it only manages the states and manipulates the state.
class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: '1', name: 'Fredrik', age: 25 },
      { id: '2', name: 'Peter', age: 45 },
      { id: '3', name: 'Gustav', age: 54 },
    ],
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };

  //Lifecycle hooks in class components, react hooks can be used in functional components.
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() { // most important hooks
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) { // most important hooks, can be used for performance improvements
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() { // most important hooks because typically fetching data from server
    console.log('[App.js] componentDidUpdate');
  }

  nameChangedHandler = (event, id) => {
    // Using chrome debugger tools with source maps which are generated automatically, is a powerful feature for detecting logical errors.
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex], // Kopia, för att inte mutera orignal staten.
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
      persons: persons, 
      changeCounter: prevState.changeCounter + 1
      };
    });
  };

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice; // Kopierar arrayen och returnera en ny array och lagrar här
    const persons = [...this.state.persons]; // Spread operator - Mer använt, samma funktionalitet som ovan.
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <PersonList
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated}
        />
      );
    }

    return (
      // JSX, looks like HTML but JS in the end. Gets compiled to code underneath (greyed out).
      <Aux>
        <button
        onClick={() => {
          this.setState({showCockpit: false});
          }}
          >
            Remove Cockpit
          </button>
          <AuthContext.Provider value={{
            authenticated: this.state.authenticated, 
            login: this.loginHandler}}>
        {this.state.showCockpit ? (
        <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          clicked={this.togglePersonsHandler}
        />
        ) : null}
        {persons}
        </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);


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
