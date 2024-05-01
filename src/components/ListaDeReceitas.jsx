import React, { useState } from "react";

const ListaDeReceitas = ({ receitas, onDelete, onEdit }) => {
  const [indiceDeEdicaoDaReceita, setIndiceDeEdicaoDaReceita] = useState(null);
  const [receitaEditada, setReceitaEditada] = useState(null);

  const lidarComEdicao = (indice) => {
    setIndiceDeEdicaoDaReceita(indice);
    setReceitaEditada({ ...receitas[indice] });
    onEdit(indice);
  };

  const lidarComSalvarEdicao = (indice) => {
    const receitasAtualizadas = [...receitas];
    receitasAtualizadas[indice] = receitaEditada;
    setIndiceDeEdicaoDaReceita(null);
    setReceitaEditada(null);
  };

  const lidarComAlteracaoDeInput = (e, campo, index) => {
    const valor = e.target.value;
    setReceitaEditada((receitaAnterior) => {
      const novaReceita = { ...receitaAnterior };
      if (campo === "ingredientes") {
        novaReceita[campo][index] = valor;
      } else {
        novaReceita[campo] = valor;
      }
      return novaReceita;
    });
  };

  return (
    <ul>
      {receitas.map((receita, indice) => (
        <li key={indice}>
          {/* Se a receita estiver sendo editada, renderiza os campos de edição */}
          {indiceDeEdicaoDaReceita === indice ? (
            <>
              <input
                className="edit-input"
                type="text"
                value={receitaEditada.nome}
                onChange={(e) => lidarComAlteracaoDeInput(e, "nome")}
              />
              <ul>
                {receitaEditada.ingredientes.map((ingrediente, i) => (
                  <li key={i}>
                    <input
                      className="edit-input"
                      type="text"
                      value={ingrediente}
                      onChange={(e) =>
                        lidarComAlteracaoDeInput(e, "ingredientes", i)
                      }
                    />
                  </li>
                ))}
              </ul>
              {/* Botões para salvar e cancelar a edição */}
              <button
                className="edit-button"
                onClick={() => lidarComSalvarEdicao(indice)}
              >
                Salvar
              </button>
              <button
                className="cancel-button"
                onClick={() => setIndiceDeEdicaoDaReceita(null)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <strong>{receita.nome}</strong>
              <ul>
                {receita.ingredientes.map((ingrediente, i) => (
                  <li key={i}>{ingrediente}</li>
                ))}
              </ul>
              {/* Botões para excluir e editar a receita */}
              <button
                className="delete-button"
                onClick={() => onDelete(indice)}
              >
                Excluir
              </button>
              <button
                className="edit-button"
                onClick={() => lidarComEdicao(indice)}
              >
                Editar
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListaDeReceitas;
