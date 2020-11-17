import type { AppProps } from 'next/app';

import './_app.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
