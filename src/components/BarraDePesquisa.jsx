import React from 'react';

const BarraDePesquisa = ({ valor, onChange }) => {
  return (
    <input
      className="barra-de-pesquisa"
      type="text"
      placeholder="Pesquisar receita"
      value={valor}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default BarraDePesquisa;
