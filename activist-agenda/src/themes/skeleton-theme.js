import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3D405B',
    },
    secondary: {
      main: '#F4F1DE',
    },
    error: {
      main: '#A7333F',
    },
    warning: {
      main: '#E07A5F',
    },
    info: {
      main: '#F2CC8F',
    },
    success: {
      main: '#81B29A',
    }
  },
});

export default theme;
