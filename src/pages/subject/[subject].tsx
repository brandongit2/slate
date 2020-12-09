import {GetStaticPaths, GetStaticProps} from 'next';

import styles from './[subject].module.scss';
import {apiLocation} from '../../config.json';
import {Subject, Folder, Article} from '../../defs/content';

function FolderView({name}: {name: string}) {
    return <p>{name}</p>;
}

function ArticleView({title}: {title: string}) {
    return <p>{title}</p>;
}

export default function SubjectPage({
    subject,
    children
}: {
    subject: Subject;
    children: Array<Folder | Article>;
}) {
    return (
        <div className={styles.root}>
            <p
                className={styles['header--title']}
                style={{
                    color: `#${subject.color}`
                }}
            >
                {subject.name}
            </p>
            <div>
                {children.map((child) => {
                    switch (child.type) {
                        case 'folder': {
                            return (
                                <FolderView name={child.name} key={child._id} />
                            );
                        }
                        case 'article': {
                            return (
                                <ArticleView
                                    title={child.name}
                                    key={child._id}
                                />
                            );
                        }
                    }
                })}
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    let subject = await (
        await fetch(
            `${apiLocation}/content/root/${params.subject}?hyphenate={"description":1}`
        )
    ).json();

    return {
        props: {
            subject,
            children: await (
                await fetch(`${apiLocation}/content/children/${subject.uuid}`)
            ).json()
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    let root = await (await fetch(`${apiLocation}/content/root`)).json();
    let subjects = await (
        await fetch(
            `${apiLocation}/content/children/${root.uuid}?hyphenate={"description":1}`
        )
    ).json();

    return {
        paths: subjects.map((subject: Subject) => ({
            params: {subject: subject.name}
        })),
        fallback: false
    };
};
