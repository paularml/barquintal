import { useState, useEffect } from 'react';

const CARDAPIO = [
  { id: 1, nome: "Cerveja Duplo Malte", preco: 12.00 },
  { id: 2, nome: "Batata Frita c/ Queijo", preco: 35.00 },
  { id: 3, nome: "Caipirinha de Limão", preco: 18.00 },
  { id: 4, nome: "Água sem gás", preco: 5.00 }
];

export default function ComandaDigital({ numeroMesa, aoVoltar }) {
  const [comanda, setComanda] = useState(() => {
    const salva = localStorage.getItem(`mesa_${numeroMesa}`);
    return salva ? JSON.parse(salva) : { cliente: '', itens: {} };
  });

  useEffect(() => {
    localStorage.setItem(`mesa_${numeroMesa}`, JSON.stringify(comanda));
  }, [comanda, numeroMesa]);

  const alterarQuantidade = (produto, mudanca) => {
    setComanda(estadoAntigo => {
      const novaQuantidade = (estadoAntigo.itens[produto.id]?.quantidade || 0) + mudanca;
      const novosItens = { ...estadoAntigo.itens };

      if (novaQuantidade <= 0) {
        delete novosItens[produto.id];
      } else {
        novosItens[produto.id] = {
          nome: produto.nome,
          preco: produto.preco,
          quantidade: novaQuantidade
        };
      }
      return { ...estadoAntigo, itens: novosItens };
    });
  };

  const calcularTotal = () => {
    return Object.values(comanda.itens).reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  };

  return (
    <div style={{ padding: '16px', paddingBottom: '90px' }}>
      
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={aoVoltar} style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#333', color: '#fff' }}>
          ⬅ Voltar
        </button>
        <h2 style={{ margin: 0 }}>Mesa {numeroMesa}</h2>
      </div>

      {/* Input Cliente */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Cliente / Observação:</label>
        <input 
          type="text" 
          value={comanda.cliente}
          onChange={(e) => setComanda({ ...comanda, cliente: e.target.value })}
          placeholder="Nome ou detalhe da mesa"
          style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#222', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }}
        />
      </div>

      {/* Cardápio */}
      <h3>Cardápio</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {CARDAPIO.map(produto => {
          const qtdAtual = comanda.itens[produto.id]?.quantidade || 0;
          return (
            <div key={produto.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#1e1e1e', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{produto.nome}</div>
                <div style={{ color: '#00e676', marginTop: '4px' }}>R$ {produto.preco.toFixed(2)}</div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {qtdAtual > 0 && (
                  <button onClick={() => alterarQuantidade(produto, -1)} style={{ padding: '12px 18px', backgroundColor: '#ff5252', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>-</button>
                )}
                <span style={{ minWidth: '24px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>{qtdAtual}</span>
                <button onClick={() => alterarQuantidade(produto, 1)} style={{ padding: '12px 18px', backgroundColor: '#00e676', border: 'none', borderRadius: '6px', color: '#000', fontSize: '20px', fontWeight: 'bold' }}>+</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rodapé Fixo */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#121212', padding: '16px', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div>
          <span style={{ color: '#aaa', fontSize: '14px' }}>TOTAL:</span>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00e676' }}>R$ {calcularTotal().toFixed(2)}</div>
        </div>
        <button 
          onClick={() => {
            if(window.confirm("Zerar e fechar esta comanda?")) {
              localStorage.removeItem(`mesa_${numeroMesa}`);
              setComanda({ cliente: '', itens: {} });
              aoVoltar(); // Volta pro salão automaticamente
            }
          }}
          style={{ padding: '14px 24px', backgroundColor: '#cf6679', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '16px', fontWeight: 'bold' }}
        >
          Pagar e Fechar
        </button>
      </div>
    </div>
  );
}