import React, { use, useState, useEffect } from "react";
import Icone from "./assets/icon.webp";

function ToDoList() {
  const listaStorage = localStorage.getItem("Lista");

  const [lista, setLista] = useState(
    listaStorage ? JSON.parse(listaStorage) : []
  );
  const [novoItem, setNovoItem] = useState("");

  const [quantidadeConcluidas, setQuantidadeConcluidas] = useState(0);

  const [quantidadePendentes, setQuantidadePendentes] = useState(0);

  useEffect(() => {
    localStorage.setItem("Lista", JSON.stringify(lista));
  }, [lista]);

  useEffect(() => {
    contarTarefas();
  }, [lista]);

  function contarTarefas() {
    let concluidas = 0;
    let pendentes = 0;

    lista.forEach((item) => {
      if (item.isCompleted) {
        concluidas++;
      } else {
        pendentes++;
      }
    });
    setQuantidadeConcluidas(concluidas);
    setQuantidadePendentes(pendentes);
  }

  function adicionaItem(form) {
    form.preventDefault();
    if (!novoItem) {
      return;
    }
    setLista([...lista, { text: novoItem, isCompleted: false }]);
    setNovoItem("");
    document.getElementById("input-entrada").focus();
  }

  function clicou(index) {
    const listaAux = [...lista];
    listaAux[index].isCompleted = !listaAux[index].isCompleted;
    setLista(listaAux);
  }

  function deleta(index) {
    const listaAux = [...lista];
    listaAux.splice(index, 1);
    setLista(listaAux);
  }

  function deletaTudo() {
    setLista([]);
  }

  return (
    <div className="pl-[10px] pr-[10px] md:pl-[0.1px] md:pr-[0.1px]">
      <h1 className="text-[25px] font-[900] text-[#7d83b9] text-center pt-[30px]">
        Lista de Tarefas
      </h1>
      <form
        onSubmit={adicionaItem}
        className="flex w-full md:w-[600px] h-[60px] m-auto mt-[30px] mb-[60px] relative "
      >
        <input
          id="input-entrada"
          className="flex w-full h-[60px] bg-[#2d3046] border-none pl-[30px] text-[16px] rounded-[16px] text-white "
          type="text"
          value={novoItem}
          autoComplete="off"
          onChange={(e) => {
            setNovoItem(e.target.value);
          }}
          placeholder="Adicione uma Tarefa"
        />
        <button
          className="absolute top-0 right-0 bg-[#363b65] hover:bg-[#363f88] border-none text-white cursor-pointer pt-[10px] pb-[10px] pl-[25px] pr-[25px] h-[60px] rounded-r-[10px]"
          type="submit"
        >
          Add
        </button>
      </form>
      <div
        id="listaTarefas"
        className="flex justify-center flex-col w-full md:w-[600px] m-auto"
      >
        <div>
          {lista.length < 1 ? (
            <img className="max-w-full" src={Icone} />
          ) : (
            lista.map((item, index) => (
              <div
                key={index}
                id="item"
                className={`flex justify-between border border-[#363b65] mb-[10px] cursor-pointer hover:bg-[#151627] ${
                  item.isCompleted ? "bg-[#1e1f2e] opacity-60 border-none" : ""
                }`}
              >
                <span
                  className={`w-full text-white mr-[10px] pt-[10px] pb-[10px] pl-[15px] pr-[15px] ${
                    item.isCompleted ? "line-through text-[#4d506e]" : ""
                  }`}
                  onClick={() => {
                    clicou(index);
                  }}
                >
                  {item.text}
                </span>
                <button
                  className="text-[#4d506e] hover:text-white bg-none hover:bg-[#ff004c] border-none p-[15px] cursor-pointer"
                  onClick={() => {
                    deleta(index);
                  }}
                >
                  Deletar
                </button>
              </div>
            ))
          )}
          {lista.length > 0 && (
            <button
              onClick={() => {
                deletaTudo();
              }}
              className="mt-[30px] w-full text-[#ff004c] hover:text-white font-bold border border-[#ff004c] bg-none hover:bg-[#ff004c] p-[15px] rounded-[5px] cursor-pointer"
            >
              Deletar todas
            </button>
          )}
          {lista.length > 0 && (
            <div className="text-white flex flex-col h-[100px] justify-center text-center gap-[10px] mt-[30px] border-[2px] border-dashed border-[#363b65] rounded-[5px]">
              <p>
                <strong>
                  Você tem {quantidadeConcluidas} tarefas concluídas! ✔
                </strong>
              </p>
              <p className="">
                <strong>
                  Você tem {quantidadePendentes} tarefas pendentes! ✖
                </strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
