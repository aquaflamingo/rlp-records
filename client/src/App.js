import React from 'react';
import './App.css';
import Web3Provider from './Web3Provider';
import Connect from './Connect';
import Web3 from './Web3'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Web3Provider>
          <Connect>
            <Web3/>
          </Connect>
        </Web3Provider>
      </header>
    </div>
  );
}

export default App;
