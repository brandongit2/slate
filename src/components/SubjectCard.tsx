import {useEffect, useState} from 'react';

import styles from './SubjectCard.module.scss';
import {convertRemToPixels} from '../misc/util';

const width = 20;

export default function SubjectDescription({
    name,
    description,
    color
}: {
    name: string;
    description: string;
    color: string;
}) {
    // Break subject header into multiple lines if necessary.
    const [nameBroken, setNameBroken] = useState([name, '']);
    useEffect(() => {
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

            // Subject name cannot exceed 70% width of parent
            if (el.clientWidth > convertRemToPixels(width - 2) * 0.7) {
                // If the second line would be awkwardly short
                if (name.length - len < 3) len = str.length;

                break;
            }
            len = str.length;
        }

        el.remove();

        name = name.replaceAll(String.fromCharCode(0xad), '');
        setNameBroken([name.slice(0, len), name.slice(len)]);
    }, []);

    return (
        <>
            <div
                className={styles.animation}
                style={{
                    width: `${width}rem`
                }}
            >
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
                className={styles.info}
                style={{
                    width: `${width - 2}rem`
                }}
            >
                <p
                    className={styles['info--description']}
                    style={{
                        color: `#${color}`
                    }}
                >
                    <span
                        className={styles['info--title']}
                        style={{
                            background: `#${color}`
                        }}
                    >
                        {nameBroken[0] + (nameBroken[1] === '' ? '' : '-')}
                    </span>
                    <span
                        className={styles['info--title']}
                        style={{
                            clear: 'left',
                            background: `#${color}`
                        }}
                    >
                        {nameBroken[1]}
                    </span>
                    {description}
                </p>
            </div>
        </>
    );
}
