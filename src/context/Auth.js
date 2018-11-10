import React from 'react';

export const Auth = React.createContext({
    authenticated: false,
    isActivated: false,
    isVerified: false,
    signInDenied: false,
    account: null,
    donatingAgency: null
});

export function withAuth(Component) {
    return (props) => (
        <Auth.Consumer>
            {state => <Component {...props} auth={state} />}
        </Auth.Consumer>
    );
}
