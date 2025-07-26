import React from "react";

export default function Formulario({ novoItem, setNovoItem, adicionaItem }) {
  return (
    <form
      onSubmit={adicionaItem}
      className="flex w-full md:w-[600px] h-[60px] m-auto mt-[30px] mb-[60px] relative"
    >
      <input
        id="input-entrada"
        className="flex w-full h-[60px] bg-[#2d3046] border-none pl-[30px] text-[18px] rounded-[16px] text-white"
        type="text"
        value={novoItem}
        autoComplete="off"
        maxLength={120}
        onChange={(e) => setNovoItem(e.target.value)}
        placeholder="Adicione uma Tarefa"
      />
      <button
        className="absolute top-0 right-0 bg-[#363b65] hover:bg-[#363f88] border-none text-[20px] text-white cursor-pointer pt-[10px] pb-[10px] pl-[25px] pr-[25px] h-[60px] rounded-r-[10px]"
        type="submit"
      >
        +
      </button>
    </form>
  );
}
