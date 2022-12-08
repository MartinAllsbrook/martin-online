// import logo from './logo.svg';
import './App.css';
import './BasicCopy.css'

import SolitaireBoard from './SolitaireBoard';
import SolitaireEngine from './SolitaireEngine';

const solitaireEngine = new SolitaireEngine();

function App() {
  console.log("app called");
  return (
    <div className="App">
      <SolitaireBoard engine={solitaireEngine}/>
    </div>
  );
}

export default App;
