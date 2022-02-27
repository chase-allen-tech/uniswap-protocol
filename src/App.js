import './App.css';
import { useState } from 'react';
import Swap from './components/Swap';
import WalletConnect from './components/WalletConnect';

function App() {

  const [isConnected, setConnected] = useState(false);

  return (
    <div className="App w-100 d-flex flex-column justify-content-center align-items-center py-5">
      <WalletConnect setConnected={setConnected} />

      <div className='mt-3'>
        <Swap />
      </div>
    </div>
  );
}

export default App;
