import React from "react";

export default function MensagemVazia({ mensagem }) {
  return (
    <div className="flex flex-col items-center mt-10 animate-fade">
      <p className="text-white text-[30px] h-[24px] min-h-[24px]">
        {mensagem}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
}
