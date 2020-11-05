import React from 'react';

/* const withClass = props => ( // First example of HOC
    <div className={props.classes}>
        {props.children}
    </div>
); */

const withClass = (WrappedComponent, className) => { // Second example of HOC
    return props => (
        <div className={className}>
            <WrappedComponent {...props} />
        </div>
    );
};

export default withClass;