import { motion } from 'framer-motion';
import Head from 'next/head';
import { useEffect, useReducer, useState } from 'react';

import { apiLocation } from '../config.json';

interface Subject {
    name: string;
    description: string;
    color: string;
}

export default function Index({ subjects }: { subjects: Subject[] }) {
    // Set an individual hover state for each subject card.
    const [hovered, toggleHovered] = useReducer(
        (state: boolean[], i: number) => state.splice(i, 1, !state[i]),
        subjects.map(() => false)
    );

    // Break subject header into multiple lines if necessary.
    const [subjectsBroken, setSubjectsBroken] = useState(
        subjects.map((s) => [s.name, ''])
    );
    useEffect(() => {
        setSubjectsBroken(
            subjects.map(({ name }, i) => {
                let el = document.createElement('p');
                el.style.fontSize = '200%';
                el.style.fontWeight = '800';
                el.style.position = 'fixed';
                document.body.appendChild(el);

                let broken = name.split(String.fromCharCode(0xad));
                let str = '';
                let len = 0;
                for (let frag of broken) {
                    str += frag;
                    el.innerHTML = str;
                    if (el.clientWidth > 180) {
                        // If the second line would be awkwardly short
                        if (name.length - len < 3) len = str.length;

                        str = str.slice(0, str.length - frag.length);
                        break;
                    }
                    len = str.length;
                }

                el.remove();

                name = name.replace(String.fromCharCode(0xad), '');
                return [name.slice(0, len), name.slice(len)];
            })
        );
    }, []);

    return (
        <div>
            <Head>
                <title>Slate: Learn by doing.</title>
            </Head>
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
                <img src="logotype-dark.png" style={{ height: '2rem' }} />
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
                            <div
                                key={subject.name}
                                style={{ display: 'contents' }}
                                onMouseEnter={() => {
                                    toggleHovered(i);
                                }}
                                onMouseLeave={() => {
                                    toggleHovered(i);
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '20rem',
                                        height: '25rem',
                                        background: 'var(--color-2)',
                                        filter: hovered[i]
                                            ? 'saturate(100%)'
                                            : 'saturate(0%)',
                                        transition: 'filter 0.2s'
                                    }}
                                >
                                    {/* TODO: Put an animation here which runs only when `hovered[i]` is true */}
                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)'
                                        }}
                                    >
                                        [PLACEHOLDER]
                                    </span>
                                </div>
                                <div
                                    style={{
                                        width: '18rem',
                                        background: 'var(--color-1)',
                                        padding: '1rem'
                                    }}
                                >
                                    <p
                                        style={{
                                            textAlign: 'justify',
                                            fontWeight: 600,
                                            color: `#${subject.color}`
                                        }}
                                    >
                                        <span
                                            style={{
                                                float: 'left',
                                                marginRight: '0.3rem',
                                                fontWeight: 800,
                                                fontSize: '200%',
                                                color: 'var(--color-1)',
                                                background: `#${subject.color}`
                                            }}
                                        >
                                            {subjectsBroken[i][0]}
                                            {subjectsBroken[i][1] === ''
                                                ? ''
                                                : '-'}
                                        </span>
                                        <span
                                            style={{
                                                float: 'left',
                                                clear: 'left',
                                                marginRight: '0.3rem',
                                                fontWeight: 800,
                                                fontSize: '200%',
                                                color: 'var(--color-1)',
                                                background: `#${subject.color}`
                                            }}
                                        >
                                            {subjectsBroken[i][1]}
                                        </span>
                                        {subject.description}
                                    </p>
                                </div>
                            </div>
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
            subjects: await (await fetch(apiLocation + '/list-subjects')).json()
        }
    };
}
