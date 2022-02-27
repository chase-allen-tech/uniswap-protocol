import './App.css';
import { useState } from 'react';
import Connecter from './components/Connecter';
import Swap from './components/Swap';

function App() {

  const [isConnected, setConnected] = useState(false);

  return (
    <div className="App w-100 d-flex flex-column justify-content-center align-items-center py-5">
      <Connecter setConnected={setConnected} />

      <div className='mt-3'>
        <Swap />
      </div>
    </div>
  );
}

export default App;
