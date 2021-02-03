import { ThemeProvider } from 'styled-components';

export const theme = {
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  colors: {
    dark: '#222426',
    light: '#ffffff',
    green: '#17a974',
    blue: '#335fc6',
    'text-alert': '#bf1866',
    'text-light': '#95a5a6',
    'background-light': '#ecf0f1',
  },
  fontSizes: {
    xs: '0.625rem', // 10px
    sm: '0.75rem', // 12px
    medium: '0.9375rem', // 15px
    large: '1.5rem', // 24px
    xl: '2.75rem', // 44px
  },
  lineHeights: {
    small: '1.125rem',
    medium: '1.8rem',
  },
  shadow: {
    '01': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
  borderRadius: {
    '01': '4px',
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}> {children} </ThemeProvider>
);

export default Theme;
