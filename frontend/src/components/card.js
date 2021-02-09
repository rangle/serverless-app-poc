import styled from 'styled-components';

export const StyledCard = styled('div')(
  ({ theme }) => `
  color: ${theme.colors.dark};
  margin: 20px;
  width: 300px;
  overflow: hidden;
  background: #fff;
  box-shadow: ${theme.shadow['01']};
  border-radius: 5px;
  padding: 30px;
  position: relative;
  padding-bottom: 60px;
`
);

export const StyledCardHeader = styled('h2')(
  ({ theme }) => `
  margin: 0;
  padding: 0;
  font-weight: bold;
  line-height: 1.25;
  margin-bottom: 0.775rem;
  letter-spacing: -0.04rem;
  font-size: ${theme.fontSizes.large};
`
);
