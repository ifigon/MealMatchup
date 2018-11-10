import React from 'react';
import PropTypes from 'prop-types';

/*
Auth Context:
This is set by <root>/App.js and contains
authN / authZ + agency data
*/
export const Auth = React.createContext({
    authenticated: false,
    isActivated: false,
    isVerified: false,
    signInDenied: false,
    account: null,
    donatingAgency: null
});
// Proptypes for context consumers
export const AuthProps = PropTypes.shape({
    authenticated: PropTypes.bool,
    isActivated: PropTypes.bool,
    isVerified: PropTypes.bool,
    signInDenied: PropTypes.bool,
    account: PropTypes.any,
    donatingAgency: PropTypes.any
});

/*
Auth HOC:
Allows you to consume auth:{...} without drilling props from App.js 
*/
export const withAuth = (Component) => {
    return (props) => (
        <Auth.Consumer>
            {state => <Component {...props} auth={state} />}
        </Auth.Consumer>
    );
};
