import { StyledAppContainer } from '../components/common';
import Navbar from './navbar';
import UserMenu from './user-menu';
const AppShell = ({ children }) => (
  <StyledAppContainer>
    <Navbar>
      <UserMenu />
    </Navbar>
    {children}
  </StyledAppContainer>
);

export default AppShell;
