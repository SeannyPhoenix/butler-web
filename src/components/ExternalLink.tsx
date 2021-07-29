/* eslint-disable react/require-default-props */
import styled from 'styled-components';
// import { URL } from 'url';
import { Color } from '../styles/global';

type ExternalLinkProps = {
  source: {
    name?: string;
    url?: string;
  }
}

const Link = styled.a`
  color: ${Color.primary};
  text-decoration: none;
  cursor: pointer;
`;

function ExternalLink({ source }: ExternalLinkProps) {
  // const urlTest = new URL(url);
  return (
    <Link href={source.url}>{source.name || source.url}</Link>
  );
}

export default ExternalLink;
