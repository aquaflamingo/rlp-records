import * as React from "react";
import * as ReactDOM from "react-dom";
import Web3Connect from "./Web3Connect";
import Web3App from "./Web3App";
import Web3Provider from "./Web3Provider";

const App = () : JSX.Element => {
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
