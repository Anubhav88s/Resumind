import { Routes, Route, Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "./lib/api";

import Home from "./routes/home";
import Auth from "./routes/auth";
import Upload from "./routes/upload";
import Resume from "./routes/resume";

function Layout() {
    const { init } = useAuthStore();
    const location = useLocation();

    useEffect(() => {
        init();
    }, [init]);

    return (
        <div className="min-h-screen bg-dark-bg text-text-primary relative overflow-x-hidden">
            <div className="fixed inset-0 bg-mesh pointer-events-none" style={{ zIndex: 0 }} />
            <div className="relative z-10">
                <Outlet />
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="auth" element={<Auth />} />
                <Route path="upload" element={<Upload />} />
                <Route path="resume/:id" element={<Resume />} />
            </Route>
        </Routes>
    );
}
