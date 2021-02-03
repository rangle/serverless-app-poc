import Nav from '../components/nav';
import { StyledAppContainer } from '../components/common-styles';
import Navbar from './navbar';

const AppShell = ({ children }) => (
  <StyledAppContainer>
    <Nav>
      <Navbar />
    </Nav>
    {children}
  </StyledAppContainer>
);

export default AppShell;
