import React from "react";
import { useState } from "react";
import './App.css';
import { ethers } from "ethers";

function App() {

  const [connected, setConnected] = useState(false);
  const [name, setName] = useState("please sign in");

  const connect = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      await signer.signMessage("Welcome to React With Ethereum!");

      const { ethereum } = window;
      if(ethereum) {
        const ensProvider = new ethers.providers.InfuraProvider('mainnet');
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const displayAddress = address?.substr(0, 6) + "...";
        const ens = await ensProvider.lookupAddress(address);
        if (ens !== null) {
          setName("welcome back..."+ens)
        } else {
          setName("welcome back..."+displayAddress)
        }
      } else {
        alert('no wallet detected!')
      }
      setConnected(true)
    } catch (error) {
      alert(error.message)
    }
  }

  const disconnect = async () => {
    setConnected(false)
    setName("please sign in")
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React With Ethereum</h1>
        <h3>{name}</h3>

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
