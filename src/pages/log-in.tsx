import {useAuth0} from '@auth0/auth0-react';
import {useRouter} from 'next/router';

export default function LogIn() {
    const {loginWithRedirect} = useAuth0();
    const router = useRouter();

    return (
        <button
            onClick={() => {
                loginWithRedirect({
                    redirectUri: `http://localhost:3000${router.query.redirect}`
                });
            }}
        >
            log in
        </button>
    );
}
