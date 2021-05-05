import styled from "styled-components";

const SourceLink = styled.div`
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  a {
    position:absolute;
    right:0;
    bottom:0;
    margin: .5em;
    padding: .1em .5em;
    background-color: #40798C;
    border: 2px solid #40798C;
    border-radius: 4px;
    user-select: none;
    color: #CFD7C7;
    font-size: 1.25em;
    font-weight: 300;
    text-decoration: none;
    :hover {
      border-color:#4391ab;
      color: #F6F1D1;
    }
    :active{
    background-color:#70A9A1;
    }
  }
`;

export const Footer = (): JSX.Element => {
  return (
    <SourceLink>
      <a href="https://github.com/pdkkid/25-5-Clock" target="_blank" rel="noreferrer noopener">Source</a>
    </SourceLink>
  );
};
