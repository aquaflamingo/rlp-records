import 'bulma/css/bulma.min.css';
import React from "react";
import Web3Provider from "./components/Web3/Provider";
import Web3Connect from "./components/Web3/Connect";
import Web3App from "./components/Web3/App";

const App = () => {
  return (
    <div className="App">
      <Web3Provider>
        <Web3Connect>
          <Web3App />
        </Web3Connect>
      </Web3Provider>
    </div>
  );
};

export default App;
