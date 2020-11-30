import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

export default function Test() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [text, setText] = useState('');

    useEffect(() => {
        const getData = async () => {
            const accessToken = await getAccessTokenSilently({
                audience: 'https://api.slate.cx',
                scope: 'post:content'
            });

            setText(
                await (
                    await fetch('http://localhost:3001/content/test', {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    })
                ).text()
            );
        };
        getData();
    }, []);

    return isAuthenticated ? (
        <div style={{ color: 'red' }}>{text}</div>
    ) : (
        <p>not logged in!</p>
    );
}
