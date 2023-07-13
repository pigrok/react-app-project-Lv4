import React from "react";
import { styled } from "styled-components";
import ModalWrite from "../modalWrite/ ModalWrite";
import { useLocation } from "react-router-dom";

function Banner() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <BannerContainer>
      <BannerCapital>AL</BannerCapital>
      <BannerSmall>gorithm</BannerSmall>
      <BannerCapital>T</BannerCapital>
      <BannerSmall>rends</BannerSmall>
      {isHomePage && <ModalWrite />}
    </BannerContainer>
  );
}

export default Banner;

const BannerContainer = styled.div`
  margin: 70px 0 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BannerCapital = styled.span`
  font-size: 90px;
  text-shadow: 3px 3px 3px gray;
`;

const BannerSmall = styled.span`
  font-size: 60px;
  text-shadow: 3px 3px 3px gray;
`;
