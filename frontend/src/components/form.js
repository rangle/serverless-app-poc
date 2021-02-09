import styled from 'styled-components';

export const StyledFormContainer = styled('div')(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`
);

export const StyledForm = styled('form')(
  ({ theme }) => `
  font-weight: normal;
  margin: 20px;
  width: 100%;
  max-width: 510px;
  overflow: hidden;
  background: #fff;
  box-shadow: ${theme.shadow['01']};
  border-radius: 5px;
  padding: 30px;
  padding-bottom: 50px;
`
);

export const StyledFormItem = styled('div')(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  color: #536171;
  margin-bottom: 20px;
  width: 100%;
`
);

export const StyledFormLabel = styled('label')(
  ({ theme }) => `
  margin-bottom: 10px;
  color: #2A3039;
  display: block;
  font-weight: 600;
  height: 20px;
`
);

export const StyledFormInput = styled('input')(
  ({ theme }) => `
  margin: 0;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #F7F9FA;
  border: 1px solid #DBE3E7;
  border-radius: 3px;
  color: #536171;
  display: block;
  font-size: ${theme.fontSizes.medium};
`
);

export const StyledErrorMessage = styled('div')(
  ({ theme }) => `
  color: ${theme.colors['text-alert']};
  margin: 30px 0 0;
`
);

export const StyledSuccessMessage = styled('div')(
  ({ theme }) => `
  color: ${theme.colors.green};
  margin: 30px 0 0;
`
);
