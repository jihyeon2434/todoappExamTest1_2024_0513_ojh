import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    typocraphy: {
      fontFamily: ['GmarketSansMedium'],
    },
    type: 'dark',
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default theme;
