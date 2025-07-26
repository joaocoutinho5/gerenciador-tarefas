import React from "react";

export default function ListaTarefas({ lista, clicou, deleta }) {
  // Ordena tarefas para mostrar pendentes primeiro
  const tarefasOrdenadas = [...lista].sort(
    (a, b) => a.isCompleted - b.isCompleted
  );

  return (
    <>
      {tarefasOrdenadas.map((item) => (
        <div
          key={item.id}
          id="item"
          className={`flex justify-between mb-[10px] border border-[#363b65] hover:bg-[#151627] cursor-pointer ${
            item.isCompleted ? "bg-[#1e1f2e] opacity-60 border-none" : ""
          }`}
        >
          <span
            className={`w-full text-[18px] text-white mr-[10px] pt-[10px] pb-[10px] pl-[15px] pr-[15px] ${
              item.isCompleted ? "line-through text-[#4d506e]" : ""
            }`}
            onClick={() => clicou(item.id)}
          >
            {item.text}
          </span>
          <button
            className="text-[18px] text-[#4d506e] hover:text-white bg-none hover:bg-[#ff004c] p-[15px] cursor-pointer"
            onClick={() => deleta(item.id)}
          >
            Deletar
          </button>
        </div>
      ))}
    </>
  );
}
