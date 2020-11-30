// import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import Head from 'next/head';
import Link from 'next/Link';
import LogInButton from '../components/LogInButton';
import LogOutButton from '../components/LogOutButton';
import SubjectCard from '../components/SubjectCard';

import { apiLocation } from '../config.json';
import { Subject } from '../defs/global';

export default function Index({ subjects }: { subjects: Subject[] }) {
    const { isAuthenticated, user } = useAuth0();

    return (
        <div>
            <Head>
                <title>Slate: Learn by doing.</title>
            </Head>
            <div style={{ position: 'fixed', top: '0px', right: '0px' }}>
                <LogInButton />
                <LogOutButton />
                <p>
                    {isAuthenticated
                        ? `Hello, ${user.name}.`
                        : 'You are logged out.'}
                </p>
            </div>
            <main
                style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translate(0px, -50%)',
                    marginLeft: '4rem',
                    display: 'grid',
                    rowGap: '2rem'
                }}
            >
                <img src="logotype-dark.svg" style={{ height: '2rem' }} />
                <div>
                    <p
                        style={{
                            fontSize: '32px',
                            fontWeight: 800
                        }}
                    >
                        learn by doing.
                    </p>
                    <p style={{ fontSize: '18px' }}>
                        mathematics, science, and more with interactive demos
                        and virtual labs.
                    </p>
                </div>
                <div>
                    <div
                        style={{
                            display: 'grid',
                            gridAutoFlow: 'column',
                            gridTemplateRows: 'auto auto',
                            columnGap: '0.5rem'
                        }}
                    >
                        {subjects.map((subject, i) => (
                            <Link
                                href={`/subject/${subject.name.replace(
                                    /\u00AD/g,
                                    ''
                                )}`}
                                key={subject.name}
                            >
                                <div style={{ display: 'contents' }}>
                                    <SubjectCard
                                        name={subject.name}
                                        description={subject.description}
                                        color={subject.color}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export async function getStaticProps() {
    return {
        props: {
            subjects: await (
                await fetch(
                    `${apiLocation}/content/all-subjects?hyphenate={"name":1,"description":1}`
                )
            ).json()
        }
    };
}
