import styled from "styled-components";

export const LengthSelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export const LengthSelection = styled.div`
  padding: 20px;
  margin: 50px 20px;
  font-size: 1.25em;
  text-align: center;
  border: 4px solid #40798c;
  border-radius: 5px;
  div {
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    justify-content: center;
    p {
      padding: 0 8px;
    }
  }
`;

export const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  div {
    min-width: 200px;
    width: 35%;
    padding: 15px 0 15px 0;
    font-size: 1.75em;
    border: 6px solid #40798c;
    border-radius: 10px;
    p {
      font-size: 1.75em;
    }
    button {
      margin: 0 8px 0 8px;
    }
  }
`;

export const Button = styled.button`
  border:1.5px solid #40798C;
  border-radius: 6px;
  text-decoration:none;
  color:#CFD7C7;
  background-color:#40798C;
  text-align:center;
  padding: 4px 8px;
  font-weight: 500;
  font-size: .75em;
  :hover:enabled{
    border-color:#4391ab;
    color: #F6F1D1;
  }
  :active{
    background-color:#70A9A1;
  }
  :disabled{
    opacity: 50%;
    cursor: not-allowed;
    pointer-events: all !important;
  }
`;