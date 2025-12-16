import React from "react";

export default function Resumo({ quantidadePendentes }) {
  return (
    <div className="text-[18px] text-white flex flex-col h-[100px] justify-center text-center gap-[10px] mt-[30px] mb-[30px] border-[2px] border-dashed border-[#363b65] rounded-[5px]">
      <p>
        <strong>✖ Tarefas pendentes: {quantidadePendentes}</strong>
      </p>
    </div>
  );
}
