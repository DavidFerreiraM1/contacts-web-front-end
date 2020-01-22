import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#455173',
      contrastText: '#EFF2F7',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#273444',
    },
    background: {
      default: '#F9F9F9',
    },
  },
  typography: {
    fontFamily: '"Hind", sans-serif',
  },
});

export default theme;

// IMPORT CSS DAS FONTES
// font-family: 'Indie Flower', cursive;
// font-family: 'Poiret One', cursive;
// font-family: 'Hind', sans-serif;
