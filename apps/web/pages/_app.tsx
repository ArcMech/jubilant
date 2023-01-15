import { ChakraProvider } from "ui";
import type { AppProps } from "next/app";

const AppMiddleware = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default AppMiddleware;
