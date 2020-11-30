import { Auth0Provider } from '@auth0/auth0-react';
import type { AppProps } from 'next/app';

import '../styles/_app.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Auth0Provider
            domain="slatecx.us.auth0.com"
            clientId="tONHrmRIYIBemzYdqoqZKX4TRIaeML5h"
            redirectUri="http://localhost:3000"
            audience="https://api.slate.cx"
            scope="post:content"
        >
            <Component {...pageProps} />
        </Auth0Provider>
    );
}
