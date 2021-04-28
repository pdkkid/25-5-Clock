import styled from "styled-components";

const SourceLink = styled.a`
  user-select: none;
  font-size: 1em;
  font-weight: 400;
  justify-self: left;
  color: #ecf0f1;
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
