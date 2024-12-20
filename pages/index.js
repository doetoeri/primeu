import Head from 'next/head';
import styles from '../styles/styles.css';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Prime Identity Project</title>
                <meta name="description" content="Unique prime numbers for unique individuals" />
            </Head>
            <header>
                <h1>Prime Identity</h1>
                <p>"Every individual is uniquely prime."</p>
            </header>
            <main>
                <section>
                    <h2>Welcome to Prime Identity</h2>
                    <p>Register to get your unique prime number, connect with friends, and show your individuality!</p>
                </section>
            </main>
        </div>
    );
}

