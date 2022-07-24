import { StoreProvider } from '../utils/store';
import { SnackbarProvider } from 'notistack';
function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <Component {...pageProps} />;
    </StoreProvider>
  );
}
export default MyApp;
