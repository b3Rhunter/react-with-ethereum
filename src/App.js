import React from "react";
import { useState } from "react";
import './App.css';
import { ethers } from "ethers";

function App() {

  const [connected, setConnected] = useState(false);

  const connect = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      await signer.signMessage("Welcome to React With Ethereum!");
      setConnected(true)
    } catch (error) {
      alert(error.message)
    }
  }

  const disconnect = async () => {
    setConnected(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React With Ethereum</h1>

        {!connected && (
          <button onClick={connect}>connect</button>
        )}

        {connected && (
          <button onClick={disconnect}>disconnect</button>
        )}
        
      </header>
    </div>
  );
}

export default App;
