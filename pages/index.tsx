// import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import Head from 'next/head';
import Link from 'next/Link';
import LogInButton from '../components/LogInButton';
import LogOutButton from '../components/LogOutButton';
import SubjectCard from '../components/SubjectCard';

import styles from './index.module.scss';
import { apiLocation } from '../config.json';
import { Subject } from '../defs/global';

export default function Index({ subjects }: { subjects: Subject[] }) {
    const { isAuthenticated, user } = useAuth0();

    return (
        <div>
            <Head>
                <title>Slate: Learn by doing.</title>
            </Head>
            <div className={styles['log-in-out']}>
                <LogInButton />
                <LogOutButton />
                <p>
                    {isAuthenticated
                        ? `Hello, ${user.name}.`
                        : 'You are logged out.'}
                </p>
            </div>
            <div className={styles.main}>
                <img src="logotype-dark.svg" className={styles['main__logo']} />
                <div className={styles.hero}>
                    <p className={styles['hero--text']}>learn by doing.</p>
                    <p className={styles['hero--subtext']}>
                        mathematics, science, and more with interactive demos
                        and virtual labs.
                    </p>
                </div>
                <div>
                    <div className={styles.subjects}>
                        {subjects.map((subject, i) => (
                            <Link
                                href={`/subject/${subject.name.replace(
                                    /\u00AD/g,
                                    ''
                                )}`}
                                key={subject.name}
                            >
                                <div className={styles.subject}>
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
            </div>
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
