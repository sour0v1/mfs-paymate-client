import React, { createContext } from 'react';

export const AuthContext = createContext(null);

const Provider = ({children}) => {
    const userIdentity = localStorage.getItem('userIdentity');
    const value = {
        userIdentity
    }
    return (
       <AuthContext.Provider value={value}>
        {children}
       </AuthContext.Provider>
    );
};

export default Provider;