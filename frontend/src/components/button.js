import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = styled('button')(
  ({ theme }) => `
  font-weight: 300;
  font-size: ${theme.fontSizes.medium};
  margin: 0;
  border-radius: 4px;
  background-color: ${theme.colors.green};
  color: ${theme.colors.light};
  padding: 14px 0;
  cursor: pointer;
  border: 1px solid ${theme.colors.green};
  display: block;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  text-align: center;
`
);

export const FormButton = styled('input')(
  ({ theme }) => `
  font-size: ${theme.fontSizes.medium};
  border-radius: 4px;
  background-color: ${theme.colors.blue};
  color: ${theme.colors.light};
  cursor: pointer;
  border: 1px solid ${theme.colors.blue};
  display: block;
  text-align: center;
  padding: 10px 0;
  width: 100%;
`
);

export const LinkButton = styled(Link)(
  ({ theme }) => `
  font-size: ${theme.fontSizes.medium};
  text-decoration: none;
  border-radius: 4px;
  background-color: transparent;
  color: ${theme.colors.blue};
  cursor: pointer;
  border: 1px solid ${theme.colors.blue};
  display: block;
  text-align: center;
  padding: 5px 10px;
  margin: 0 10px;
`
);
