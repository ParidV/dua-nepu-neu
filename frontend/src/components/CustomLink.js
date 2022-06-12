import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const CLinkNav = styled(Link)`
  /* color: white; */
  color: #1e90ff;
  text-decoration: none;
  &:hover {
    color: #6495ed;
  }
`;

export const CLink = styled(Link)`
  color: #696969;
  text-decoration: none;
`;
