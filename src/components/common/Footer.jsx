import React from "react";
import { styled } from "styled-components";

function Footer() {
  return (
    <>
      <FooterLine></FooterLine>
      <Creator>Creator pigrok zzanggu manggu</Creator>
    </>
  );
}

export default Footer;

const FooterLine = styled.div`
  margin-top: 80px;
  border-top: 1px solid #bdbdbd;
`;

const Creator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 80px 0 80px 0;
`;
