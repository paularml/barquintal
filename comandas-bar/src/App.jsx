import { useState } from 'react';
import TelaMesas from './TelaMesas';
import ComandaDigital from './ComandaDigital';
import './App.css'; // Vamos usar o CSS global simples

function App() {
  const [mesaAtiva, setMesaAtiva] = useState(null);

  // Se tiver uma mesa selecionada, mostra a comanda dela. Se não, mostra o mapa de mesas.
  return (
    <div className="app-container">
      {mesaAtiva === null ? (
        <TelaMesas aoSelecionarMesa={setMesaAtiva} />
      ) : (
        <ComandaDigital 
          numeroMesa={mesaAtiva} 
          aoVoltar={() => setMesaAtiva(null)} 
        />
      )}
    </div>
  );
}

export default App;