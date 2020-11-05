import React, {Component} from 'react'; // Fragment does the same thing as the aux component.
import PropTypes from 'prop-types';

import Aux from '../../hoc/Auxiliary'
import withClass from '../../hoc/withClass';
import classes from './Person.css';
import AuthContext from '../../context/auth-context';

class Person extends Component {
  constructor(props) { // second example - Always when you add a constructor, add super first
    super(props);
    this.inputElementRef = React.createRef(); // More modern approach
  }

  static contextType = AuthContext; // class based components
  
  componentDidMount() { // executes after render()
    //this.inputElement.focus(); // this approach only works in class based components (first example)
    this.inputElementRef.current.focus(); // second example
    console.log(this.context.authenticated);
  }


  render() {
    console.log('[Person.js] rendering...');
    return (
    <Aux>
        {this.context.authenticated ? (
          <p>Authenticated!</p> 
        ) : ( 
        <p>Please log in!</p>
        )}
        <p key="i1" onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p key="i2">{this.props.children}</p>
        <input 
          key="i3" 
          //ref={(inputEl) => {this.inputElement = inputEl}} first example - older approach, also works in older versions of react
          ref={this.inputElementRef}
          type='text' 
          onChange={this.props.changed} 
          value={this.props.name} 
        />
        </Aux>
    );
  };
}

Person.propTypes = { //Define which props this component uses and which type of data each component should be of
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person, classes.Person);

// Install PropTypes: npm install --save prop-types
