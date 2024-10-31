import logo from './logo.svg';
import './App.css';

import Clientes from './components/Clientes';
import CondicoesPagamento from './components/CondicoesPagamento';
import HistoricoPrecos from './components/HistoricoPrecos';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clientes />
       {/* <CondicoesPagamento /> */}
        {/* <HistoricoPrecos /> */}

      </header>
    </div>
  );
}

export default App;
