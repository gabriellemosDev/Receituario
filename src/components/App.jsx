import './FormularioDeReceita.css';
import './ListaDeReceitas.css';
import './BarraDePesquisa.css';
import React, { useState } from 'react';
import FormularioDeReceita from './FormularioDeReceita';
import ListaDeReceitas from './ListaDeReceitas';
import BarraDePesquisa from './BarraDePesquisa';

function App() {
  const [receitas, setReceitas] = useState([]);
  const [consultaDePesquisa, setConsultaDePesquisa] = useState('');

  const lidarComAdicaoDeReceita = (novaReceita) => {
    setReceitas([...receitas, novaReceita]);
  };

  const lidarComExclusaoDeReceita = (indice) => {
    const receitasAtualizadas = [...receitas];
    receitasAtualizadas.splice(indice, 1);
    setReceitas(receitasAtualizadas);
  };

  const receitasFiltradas = receitas.filter((receita) =>
    receita.nome.toLowerCase().includes(consultaDePesquisa.toLowerCase())
  );

  return (
    <div>
      <h1>Receitas do Tio Zé</h1>
      <FormularioDeReceita onSubmit={lidarComAdicaoDeReceita} />
      <br />
      <BarraDePesquisa value={consultaDePesquisa} onChange={setConsultaDePesquisa} />
      <ListaDeReceitas receitas={receitasFiltradas} onDelete={lidarComExclusaoDeReceita} />
    </div>
  );
}

export default App;
