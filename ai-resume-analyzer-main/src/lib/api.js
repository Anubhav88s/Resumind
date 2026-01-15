import { create } from "zustand";



export const useAuthStore = create((set, get) => {

    const setError = (msg) => {
        set({
            error: msg,
            isLoading: false,
        });
    };

    // --- AUTH ---
    const checkAuthStatus = async () => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
            const user = JSON.parse(userStr);
            set({
                auth: { ...get().auth, user, isAuthenticated: true },
                isLoading: false,
            });
            return true;
        }
        set({
            auth: { ...get().auth, user: null, isAuthenticated: false },
            isLoading: false,
        });
        return false;
    };

    const register = async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Registration failed');
            }

            const data = await res.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            set({
                auth: { ...get().auth, user: data.user, isAuthenticated: true },
                isLoading: false
            });
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    const signIn = async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Login failed');
            }

            const data = await res.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            set({
                auth: { ...get().auth, user: data.user, isAuthenticated: true },
                isLoading: false
            });
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    const signOut = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({
            auth: { ...get().auth, user: null, isAuthenticated: false },
            isLoading: false
        });
    };

    const refreshUser = async () => { checkAuthStatus(); };

    // --- FS ---
    const upload = async (files) => {
        const formData = new FormData();
        files.forEach(f => formData.append('files', f));

        const res = await fetch('/api/fs/upload', {
            method: 'POST',
            body: formData
        });
        if (!res.ok) throw new Error('Upload failed');
        return await res.json();
    };

    const readFile = async (path) => {
        const res = await fetch(`/api/fs/read/${path}`);
        if (!res.ok) return undefined;
        return await res.blob();
    };

    // --- AI ---
    const chat = async (messages, imageURL, testMode, options) => {
        const res = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages })
        });
        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            console.error("AI Chat Error Details:", errData);
            throw new Error(errData.details || errData.error || "AI Chat failed");
        }
        return await res.json();
    };

    const feedback = async (path, message) => {
        return chat([
            {
                role: "user",
                content: [
                    { type: "file", puter_path: path },
                    { type: "text", text: message },
                ],
            },
        ]);
    };

    // --- KV ---
    const getKV = async (key) => {
        const res = await fetch(`/api/kv/${key}`);
        if (res.status === 404 || !res.ok) return null;
        return await res.json();
    };

    const setKV = async (key, value) => {
        await fetch('/api/kv', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, value })
        });
        return true;
    };

    const listKV = async (pattern, returnValues) => {
        const res = await fetch(`/api/kv/list?pattern=${pattern}&returnValues=${returnValues}`);
        return await res.json();
    };

    const flushKV = async () => {
        return true;
    };

    // --- INIT ---
    const init = () => {
        checkAuthStatus();
    };

    return {
        isLoading: true,
        error: null,
        auth: {
            user: null,
            isAuthenticated: false,
            signIn,
            register,
            signOut,
            refreshUser,
            checkAuthStatus,
            getUser: () => get().auth.user,
        },
        fs: {
            write: async () => undefined,
            read: readFile,
            readDir: async () => [],
            upload,
            delete: async (path) => {
                await fetch(`/api/fs/delete/${path}`, { method: 'DELETE' });
            },
        },
        ai: {
            chat,
            feedback,
            img2txt: async () => "",
        },
        kv: {
            get: getKV,
            set: setKV,
            delete: async () => true,
            list: listKV,
            flush: flushKV,
        },
        init,
        clearError: () => set({ error: null }),
    };
});
