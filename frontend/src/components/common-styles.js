import styled from 'styled-components';

export const StyledAppContainer = styled('div')(
  ({ theme }) => `
  background-color: ${theme.colors['background-light']};
  min-height: 100vh;
  height: 100%;
`
);

export const StyledFlexContainer = styled('div')(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`
);

export const StyledListContainer = styled('div')(
  ({ theme }) => `
  display: flex;
  padding: 40px;
`
);

export const StyledHeader = styled('h1')(
  ({ theme }) => `
  text-align: center;
  color: ${theme.colors.dark};
  margin: 0;
  font-weight: 500;
  line-height: 1.2;
  font-size: ${theme.fontSizes.xl};
  margin-bottom: 10px;
`
);

export const StyledSubHeader = styled('h2')(
  ({ theme }) => `
  margin: 0;
  text-align: center;
  color: ${theme.colors.blue};
  font-weight: 500;
  line-height: 1.4;
  font-size: ${theme.fontSizes.large};
`
);
