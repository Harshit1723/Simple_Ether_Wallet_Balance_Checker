import React,{useState} from "react";
import { ethers } from "ethers";
import './App.css';

function App() {

  const[address,setAddress] = useState();
  const[balance,setBalance] = useState('');
  const[walletConnected,setWalletConnected] = useState(false);


  

  const connectWalletHandler = async() => {
    if(window.ethereum){
      try{
        const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
        setAddress(accounts[0]);
        setWalletConnected(true);
      }catch(error){
        console.log(error);
      }
    }else{

    }
  }

  const checkBalanceHandler = async() => {
    if(address){
      try{
        const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/6K6I4yIo_qJSdtyVG17fJo8GfWVVXZlz');
        const balancewei = await provider.getBalance(address);
        const balanceEth = ethers.utils.formatEther(balancewei);
        setBalance(balanceEth);
      }catch(error){
        console.log('Error:',error);
      }
    }else{
      return;
    }
  }

  const formatWalletAddress = (address) => {
    if(address.length >=10){
      const sa=`${address.slice(0,5)}...${address.slice(-4)}`;
      return sa;
    }
    return address;
  }

  return(
    <div className="App">
      <div className="card">
      <h1>Ether Wallet Balance Checker</h1>
      
      <div className="container">
      {walletConnected?(
        <div >
          <h3 className="wallet-info">Wallet Connected : {formatWalletAddress(address) }</h3>
          
          <h3> {balance ? (<div className="balance"><p>Balance : {balance} ETH</p></div>):(<button className="connect-button" onClick={checkBalanceHandler}>Check Balance</button>)}</h3>
          
        </div>
      ):(<button className="connect-button"  onClick={connectWalletHandler}>Connect Wallet</button>)}

</div>
      </div>
    </div>
  );
}

export default App;