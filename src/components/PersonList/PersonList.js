import React, {PureComponent} from 'react'; /* PureComponent is a normal component 
that implements shouldComponentUpdate with a complete props check */
import Person from '../Person/Person';

class Persons extends PureComponent {
/*   static getDerivedStateFromProps(props, state) {
    console.log('[PersonList.js] getDerivedStateFromProps');
    return state;
  } */

/*   shouldComponentUpdate(nextProps, nextState) { //manually check props if not using PureComponent
    console.log('[PersonList.js] shouldComponentUpdate');
    if(
      nextProps.persons !== this.props.persons || 
      nextProps.changed !== this.props.changed || 
      nextProps.clicked !== this.props.clicked
    ) {
      return true;
    } else {
      return false;
    }
  } */

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[PersonList.js] getSnapShotBeforeUpdate');
    return {message: 'Snapshot!'};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[PersonList.js] componentDidUpdate');
    console.log(snapshot);
  }

  componentWillUnmount() {
    console.log('[PersonList.js] componentWillUnmount');
  }

  render() {
  console.log('[PersonList.js] rendering...');
  return this.props.persons.map((person, index) => {
    return (
      <Person
        click={() => this.props.clicked(index)}
        name={person.name}
        age={person.age}
        key={person.id}
        changed={(event) => this.props.changed(event, person.id)}
      />
    );
  });
};
}

export default Persons;
