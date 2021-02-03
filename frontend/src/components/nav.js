import styled from 'styled-components';

const StyledNav = styled('nav')(
  ({ theme }) => `
  position: relative;
  height: 50px;
  background-color: ${theme.colors.light};
  box-shadow: ${theme.shadow['01']};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
`
);

const StyledHeader = styled('h1')(
  ({ theme }) => `
  color: ${theme.colors.blue};
  font-style: normal;
  font-weight: 500;
  font-size: ${theme.fontSizes.large};
  line-height: ${theme.lineHeights.medium};
  text-transform: uppercase;
`
);

const StyledUserMenu = styled('div')(
  ({ theme }) => `
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${theme.colors.blue};
  font-size: ${theme.fontSizes.medium};
`
);

const Nav = ({ children }) => (
  <StyledNav>
    <StyledHeader>BiteTut</StyledHeader>
    <StyledUserMenu>{children}</StyledUserMenu>
  </StyledNav>
);

export default Nav;
