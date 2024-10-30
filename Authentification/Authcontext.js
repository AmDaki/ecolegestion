import React, {createContext, useState} from "react";

export const Authcontext = createContext();

const AuthProvider = ({children}) =>{
    const[test, setTest]= useState('Test Value')
    return(
        <Authcontext.Provider value={{test}}>
            {children}
        </Authcontext.Provider>
    );
}