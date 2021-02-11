import { StyledNav, StyledNavHeader, StyledUserMenu } from '../components/nav';
const Navbar = ({ children }) => (
  <StyledNav>
    <StyledNavHeader to="/">BiteTut</StyledNavHeader>
    <StyledUserMenu>{children}</StyledUserMenu>
  </StyledNav>
);

export default Navbar;
