import React from "react";
import styled from "@emotion/styled";
// styles
const Spinner = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 9999;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #b22d;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
import './style.scss';


// ==============================|| LOADER ||============================== //
// const Loader = () => <Spinner />;
const Loader = () => <div className="loader"></div>

export default Loader;
