import { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, onValue } from 'firebase/database';

export default function TelaMesas({ aoSelecionarMesa }) {
  const totalMesas = 10;
  const [statusMesas, setStatusMesas] = useState({});

  // Escuta o banco de dados na nuvem. Se mudar em um celular, muda aqui na hora!
  useEffect(() => {
    const mesasRef = ref(db, 'mesas');
    const unsubscribe = onValue(mesasRef, (snapshot) => {
      const dados = snapshot.val();
      setStatusMesas(dados || {});
    });

    return () => unsubscribe(); // Limpa a conexão ao fechar a tela
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Salão Principal</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
        {Array.from({ length: totalMesas }, (_, index) => {
          const numeroMesa = index + 1;
          const dadosMesa = statusMesas[numeroMesa];
          const estaOcupada = !!dadosMesa;
          const nomeCliente = dadosMesa?.cliente || "Sem nome";

          return (
            <button
              key={numeroMesa}
              onClick={() => aoSelecionarMesa(numeroMesa)}
              style={{
                padding: '20px 10px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: estaOcupada ? '#cf6679' : '#388e3c',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
              }}
            >
              <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{numeroMesa}</span>
              <span style={{ fontSize: '14px', textAlign: 'center', minHeight: '20px' }}>
                {estaOcupada ? nomeCliente : 'Livre'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}