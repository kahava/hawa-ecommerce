import { StoreProvider } from '../utils/store';
import { SnackbarProvider } from 'notistack';
function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider>
      <StoreProvider>
        <Component {...pageProps} />;
      </StoreProvider>
    </SnackbarProvider>
  );
}
export default MyApp;
