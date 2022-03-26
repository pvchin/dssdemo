import React, { useContext, useEffect, useState } from "react";
import App from "../utils/firebase"
import axios from "axios";
import reducer from "../reducers/expenses_reducer";


import {} from "../actions";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    App.auth().onAuthStateChanged(setCurrentUser)  
  },[])

  return <AuthContext.Provider value={{currentUser}}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

