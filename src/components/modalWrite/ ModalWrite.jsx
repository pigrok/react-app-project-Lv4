import React, { useState } from "react";
import Input from "../input/Input";
import { styled } from "styled-components";
import Enter_Logo from "../../image/Enter.png";

function ModalWrite() {
  const [modalWrite, setModalWrite] = useState(false);

  const openModal = () => {
    setModalWrite((prev) => !prev);
  };

  return (
    <ModalWriteContainer>
      <EnterImg src={Enter_Logo} onClick={() => openModal()}></EnterImg>
      {modalWrite ? <Input setModalWrite={setModalWrite} /> : null}
    </ModalWriteContainer>
  );
}

export default ModalWrite;

const ModalWriteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EnterImg = styled.img`
  width: 105px;
  height: 70px;
  padding: 5px;
  cursor: pointer;
`;
