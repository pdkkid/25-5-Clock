import styled from "styled-components";

const SourceLink = styled.a`
  user-select: none;
  color: #CFD7C7;
  font-size: 2em;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    color: #ddffbc;
  }
`;

export const Footer = (): JSX.Element => {
  return (
    <SourceLink
      href="https://github.com/pdkkid/25-5-Clock"
      target="_blank"
      rel="noreferrer noopener"
    >
      Source
    </SourceLink>
  );
};
