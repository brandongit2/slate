import { GetStaticPaths, GetStaticProps } from 'next';

import { apiLocation } from '../../config.json';
import { Subject, SubjectWithChildren } from '../../defs/global';

function Folder({ name }: { name: string }) {
    return <p>{name}</p>;
}

function Article({ title }: { title: string }) {
    return <p>{title}</p>;
}

export default function SubjectPage({
    subject
}: {
    subject: SubjectWithChildren;
}) {
    console.log(subject.children);
    return (
        <div
            style={{
                width: 'calc(100vw - 8rem)',
                height: 'calc(100vh - 8rem)',
                background: 'var(--color-1)',
                color: 'var(--color-4)',
                padding: '4rem'
            }}
        >
            <p
                style={{
                    fontWeight: 800,
                    fontSize: '30px',
                    color: `#${subject.color}`
                }}
            >
                {subject.name}
            </p>
            <div>
                {subject.children.map((child) => {
                    switch (child.type) {
                        case 'folder': {
                            return <Folder name={child.name} key={child._id} />;
                        }
                        case 'article': {
                            return (
                                <Article title={child.title} key={child._id} />
                            );
                        }
                    }
                })}
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    return {
        props: {
            subject: (
                await (
                    await fetch(
                        `${apiLocation}/content/subject/${params.subject}&hyphenate={"description":1}`
                    )
                ).json()
            )[0]
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: (await (await fetch(`${apiLocation}/list-subjects`)).json()).map(
        (subject: Subject) => ({
            params: { subject: subject.name }
        })
    ),
    fallback: false
});
