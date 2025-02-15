import { useEffect } from "react";

const CLIENT_ID = "1057212994997-4qgk4s9jeviabgti3s6eipen9f108toj.apps.googleusercontent.com";
const REDIRECT_URI = "http://localhost:5173";

const GoogleFitAuth = () => {
    const authenticate = () => {
        console.log(REDIRECT_URI);
        const authURL = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.sleep.read&prompt=consent`;
        window.location.href = authURL;
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_expiry");
        window.location.reload();
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const newAccessToken = params.get("access_token");

        if (newAccessToken) {
            const expiryTime = Date.now() + 3600 * 1000; // 1 hour expiry
            localStorage.setItem("access_token", newAccessToken);
            localStorage.setItem("token_expiry", expiryTime);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    return (
        <div>
            <button onClick={authenticate}>Connect Google Fit</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default GoogleFitAuth;
