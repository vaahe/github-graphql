import styles from "../styles/GitHubLogin.module.css";

export const GitHubLogin = () => {
    const CLIENT_ID = '2c0f296c79f35546d931';
    const REDIRECT_URI = 'http://127.0.0.1:5173/';

    const handleGithubLogin = () => {
        const params = new URLSearchParams();
        params.append('client_id', CLIENT_ID);
        params.append('redirect_uri', REDIRECT_URI);
        params.append('scope', 'user');

        window.location.href = `https://github.com/login/oauth/authorize?${params.toString()}`;
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <h2>Login with GitHub</h2>
                <button onClick={handleGithubLogin}>Login</button>
            </div>
        </div>
    );
}