import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListaTarefas from "./components/ListaTarefas";
import MensagemVazia from "./components/MensagemVazia";
import Resumo from "./components/Resumo";

function ToDoList() {
  const listaStorage = localStorage.getItem("Lista");

  const [lista, setLista] = useState(
    listaStorage ? JSON.parse(listaStorage) : []
  );
  const [novoItem, setNovoItem] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [fraseIndex, setFraseIndex] = useState(0);
  const [letraIndex, setLetraIndex] = useState(0);
  const [apagando, setApagando] = useState(false);
  const frases = [
    "Sua lista está vazia.",
    "Adicione sua primeira tarefa!",
    "Vamos organizar seu dia!",
  ];

  // Atualiza localStorage sempre que a lista muda
  useEffect(() => {
    localStorage.setItem("Lista", JSON.stringify(lista));
  }, [lista]);

  // Animação da mensagem vazia
  useEffect(() => {
    const atual = frases[fraseIndex];
    let timeout;

    if (!apagando && letraIndex <= atual.length) {
      timeout = setTimeout(() => {
        setMensagem(atual.substring(0, letraIndex));
        setLetraIndex(letraIndex + 1);
      }, 100);
    } else if (apagando && letraIndex >= 0) {
      timeout = setTimeout(() => {
        setMensagem(atual.substring(0, letraIndex));
        setLetraIndex(letraIndex - 1);
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setApagando(!apagando);
        if (apagando) {
          setFraseIndex((fraseIndex + 1) % frases.length);
        }
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [letraIndex, apagando, fraseIndex, frases]);

  // Funções que manipulam a lista
  function adicionaItem(form) {
    form.preventDefault();
    if (!novoItem.trim()) return;
    const novo = {
      id: Date.now(),
      text: novoItem.trim(),
      isCompleted: false,
    };
    setLista([...lista, novo]);
    setNovoItem("");
    document.getElementById("input-entrada").focus();
  }

  function clicou(id) {
    const novaLista = lista.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setLista(novaLista);
  }

  function deleta(id) {
    const novaLista = lista.filter((item) => item.id !== id);
    setLista(novaLista);
  }

  function deletaTudo() {
    setLista([]);
  }

  // Contagem de tarefas pendentes e concluídas
  const quantidadePendentes = lista.filter((item) => !item.isCompleted).length;
  const quantidadeConcluidas = lista.filter((item) => item.isCompleted).length;

  return (
    <div className="pl-[10px] pr-[10px] md:pl-[0.1px] md:pr-[0.1px]">
      <h1 className="text-[28px] font-[900] text-[#7d83b9] text-center pt-[30px]">
        To-Do-List
      </h1>
      <Formulario
        novoItem={novoItem}
        setNovoItem={setNovoItem}
        adicionaItem={adicionaItem}
      />
      <div
        id="listaTarefas"
        className="flex justify-center flex-col w-full md:w-[600px] m-auto"
      >
        {lista.length === 0 ? (
          <MensagemVazia mensagem={mensagem} />
        ) : (
          <>
            <ListaTarefas lista={lista} clicou={clicou} deleta={deleta} />
            <button
              onClick={deletaTudo}
              className="mt-[30px] w-full text-[18px] text-[#ff004c] hover:text-white font-bold border border-[#ff004c] bg-none hover:bg-[#ff004c] p-[15px] rounded-[5px] cursor-pointer"
            >
              Deletar todas
            </button>
            <Resumo
              quantidadePendentes={quantidadePendentes}
              quantidadeConcluidas={quantidadeConcluidas}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ToDoList;
