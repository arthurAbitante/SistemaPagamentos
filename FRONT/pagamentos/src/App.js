import logo from './logo.svg';
import './App.css';

import Clientes from './components/Clientes';
import CondicoesPagamento from './components/CondicoesPagamento';
import Produtos from './components/Produtos';
import HistoricoPrecos from './components/HistoricoPrecos';
import RelatorioPagamentos from './components/RelatorioPagamentos';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clientes />
        <CondicoesPagamento /> 
        <Produtos />
        <HistoricoPrecos />

        <RelatorioPagamentos />
      </header>
    </div>
  );
}

export default App;
