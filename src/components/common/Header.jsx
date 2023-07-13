import React from "react";
import ALT_Logo from "../../image/ALT.png";
import { styled } from "styled-components";

function Header() {
  const reloadHome = () => {
    window.location.replace("/");
  };

  return (
    <>
      <LogoImg src={ALT_Logo} onClick={reloadHome}></LogoImg>
      <HeaderLine></HeaderLine>
    </>
  );
}

export default Header;

const LogoImg = styled.img`
  width: 105px;
  height: 70px;
  padding: 5px;
  cursor: pointer;
`;

const HeaderLine = styled.div`
  border-bottom: 1px solid #bdbdbd;
`;
