import Head from 'next/head';

export default function Index() {
    return (
        <div>
            <Head>
                <title>Slate</title>
            </Head>
            <main style={{ margin: '100px' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <img
                        src="logotype-dark.png"
                        style={{
                            height: '2rem',
                            marginBottom: '2rem'
                        }}
                    />
                    <p
                        style={{
                            fontSize: '24pt',
                            fontWeight: 700
                        }}
                    >
                        Who wants to read boring textbooks?
                    </p>
                    <p style={{ fontSize: '14pt' }}>
                        Learn mathematics, science, and more with interactive
                        demos and virtual labs.
                    </p>
                </div>
            </main>
        </div>
    );
}
