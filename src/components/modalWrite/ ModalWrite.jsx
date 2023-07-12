import React, { useState } from "react";
import Input from "../input/Input";

function ModalWrite() {
  const [modalWrite, setModalWrite] = useState(false);

  const openModal = () => {
    setModalWrite((prev) => !prev);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button onClick={() => openModal()}>글쓰기</button>
      </div>
      {modalWrite ? <Input setModalWrite={setModalWrite} /> : null}
    </div>
  );
}

export default ModalWrite;
