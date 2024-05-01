import React, { useState, useEffect } from 'react';
import './FormularioDeReceita.css';

const FormularioDeReceita = ({ receita, onSubmit }) => {
  const [nome, setNome] = useState('');
  const [ingredientes, setIngredientes] = useState(['']);
  const [indiceDeEdicaoDoIngrediente, setIndiceDeEdicaoDoIngrediente] = useState(null);
  const [valorDeEdicaoDoIngrediente, setValorDeEdicaoDoIngrediente] = useState('');

  useEffect(() => {
    if (receita) {
      setNome(receita.nome);
      setIngredientes(receita.ingredientes);
    }
  }, [receita]);

  const lidarComAdicaoDeIngrediente = () => {
    setIngredientes([...ingredientes, '']);
  };

  const lidarComRemocaoDeIngrediente = (indice) => {
    const ingredientesAtualizados = ingredientes.filter((_, i) => i !== indice);
    setIngredientes(ingredientesAtualizados);
  };

  const lidarComEdicaoDeIngrediente = (indice) => {
    setIndiceDeEdicaoDoIngrediente(indice);
    setValorDeEdicaoDoIngrediente(ingredientes[indice]);
  };

  const lidarComSalvarEdicaoDeIngrediente = () => {
    const novosIngredientes = [...ingredientes];
    novosIngredientes[indiceDeEdicaoDoIngrediente] = valorDeEdicaoDoIngrediente;
    setIngredientes(novosIngredientes);
    setIndiceDeEdicaoDoIngrediente(null);
    setValorDeEdicaoDoIngrediente('');
  };

  const lidarComEnvio = (e) => {
    e.preventDefault();
    onSubmit({ nome, ingredientes });
    setNome('');
    setIngredientes(['']);
  };

  return (
    <form className="formulario-receita" onSubmit={lidarComEnvio}>
      <label>
        Nome da Receita:
        <input className="input-nome-receita" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      <br />
      <label>
        Ingredientes:
        {ingredientes.map((ingrediente, indice) => (
          <div className="c ainer-ingrediente" key={indice}>
            <input
              className="input-ingrediente"
              type="text"
              value={indice === indiceDeEdicaoDoIngrediente ? valorDeEdicaoDoIngrediente : ingrediente}
              onChange={(e) => {
                if (indice === indiceDeEdicaoDoIngrediente) {
                  setValorDeEdicaoDoIngrediente(e.target.value);
                } else {
                  const novosIngredientes = [...ingredientes];
                  novosIngredientes[indice] = e.target.value;
                  setIngredientes(novosIngredientes);
                }
              }}
            />
            <button className="botao-remover" type="button" onClick={() => lidarComRemocaoDeIngrediente(indice)}>
              Remover
            </button>
            <button className="botao-editar" type="button" onClick={() => lidarComEdicaoDeIngrediente(indice)}>
              Editar
            </button>
            {indice === indiceDeEdicaoDoIngrediente && (
              <>
                <button className="botao-salvar" type="button" onClick={lidarComSalvarEdicaoDeIngrediente}>
                  Salvar
                </button>
                <button className="botao-cancelar" type="button" onClick={() => setIndiceDeEdicaoDoIngrediente(null)}>
                  Cancelar
                </button>
              </>
            )}
          </div>
        ))}
        <button className="botao-adicionar" type="button" onClick={lidarComAdicaoDeIngrediente}>
          Adicionar Ingrediente
        </button>
      </label>
      <br />
      <button className="botao-salvar-receita" type="submit">Salvar Receita</button>
    </form>
  );
};

export default FormularioDeReceita;
