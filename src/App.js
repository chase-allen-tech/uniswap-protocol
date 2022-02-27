import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Connecter from './components/Connecter';
import Swap from './components/Swap';

function App() {

  const [isConnected, setConnected] = useState(false);

  return (
    <div className="App">
      <h1>App</h1>
      {
        isConnected ? <Swap /> : <Connecter />
      }
    </div>
  );
}

export default App;
