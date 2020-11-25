import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';

import './_app.scss';

export default function MyApp({ Component, pageProps, router }: AppProps) {
    return (
        <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
        </AnimatePresence>
    );
}
