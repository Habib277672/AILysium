import axios from "axios";

// withCredentials: true is REQUIRED here — the backend uses httpOnly
// cookies (access_token / refresh_token) for auth, not Authorization
// headers. Without this, the browser will never send or accept those
// cookies on cross-origin requests to the backend (localhost:4000 vs
// localhost:5173 counts as cross-origin).
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
    withCredentials: true,
});