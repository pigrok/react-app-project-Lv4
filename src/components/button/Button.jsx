import React from "react";
import { styled } from "styled-components";

const Button = ({ children, onClickEvent }) => {
  return <ButtonStyle onClick={onClickEvent}>{children}</ButtonStyle>;
};

export default Button;

const ButtonStyle = styled.button`
  color: #8a8a8a;
  background-color: transparent;

  border: 1px solid #8a8a8a;
  border-radius: 5px;

  margin: 5px;

  width: 55px;
  height: 25px;
`;
