import React, { useState, createContext, useContext } from "react";

import './App.css';
import MainContent from './Components/MainContent';

export const AppContext = React.createContext();


function App() {

  const [currentUser, setCurrentUser] = useState("")

  const user = {
    currentUser: currentUser,
    setCurrentUser
  }

  return (
    <AppContext.Provider value={user}>

      <div className="App">
        <MainContent />
      </div>


    </AppContext.Provider>


  );
}

export default App;
