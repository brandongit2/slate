import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { apiLocation } from '../../config.json';

export default function Subject() {
    const router = useRouter();
    const { subject } = router.query;

    return <p>{subject}</p>;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    return {
        props: {
            subject: await (
                await fetch(`${apiLocation}get-name?name=${params.subject}`)
            ).json()
        }
    };
};
