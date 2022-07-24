import {
  AppBar,
  CssBaseline,
  Link,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Box, Container } from '@mui/system';
import Cookies from 'js-cookie';
import Head from 'next/head';
import NextLink from 'next/link';
import classes from '../utils/classes';
import { Store } from '../utils/store';
import { useContext } from 'react';

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;

  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },

    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },

      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },

    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  return (
    <>
      <Head>
        <title>{title ? `${title} | Hawa mabatiki` : 'Hawa mabatiki'} </title>

        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <NextLink tLink href="/" passHref>
                <Link>
                  <Typography sx={classes.brand}>HAWA MABATIKI</Typography>
                </Link>
              </NextLink>
              <Box>
                <Switch
                  checked={darkMode}
                  onChange={darkModeChangeHandler}
                ></Switch>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={classes.main}>
          {children}
        </Container>
        <Box component="footer" sx={classes.footer}>
          <Typography>All rights reserverd</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
