import { useAuthStore } from "~/lib/api";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => ([
    { title: 'Resumind | Auth' },
    { name: 'description', content: 'Log into your account' },
])

/**
 * Auth component.
 * Handles user authentication (login/logout) using the Puter.js library.
 *
 * @returns {JSX.Element} The rendered Auth page.
 */
const Auth = () => {
    const { isLoading, auth, error, clearError } = useAuthStore();
    const location = useLocation();
    const next = location.search.split('next=')[1] || '/';
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    useEffect(() => {
        if (auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next, navigate]);

    useEffect(() => {
        clearError();
    }, [isLogin, clearError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            await auth.signIn(formData.email, formData.password);
        } else {
            await auth.register(formData.name, formData.email, formData.password);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center relative">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-0 bg-dark-card rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500 border border-gray-800">
                {/* Left Side - Visual */}
                <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 p-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5 mix-blend-overlay"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>

                    <div className="relative z-10 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow mb-6 mx-auto">
                            <span className="text-3xl font-bold">R</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
                        <p className="text-indigo-200 mb-8 leading-relaxed">Unlock the full potential of your career with AI-driven insights.</p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="p-10 md:p-12 flex flex-col justify-center bg-dark-card">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">{isLogin ? 'Sign In' : 'Create Account'}</h1>
                        <p className="text-gray-400">{isLogin ? 'Access your dashboard' : 'Get started with Resumind'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {!isLogin && (
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-500"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        )}
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-500"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-500"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />

                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-3.5 mt-2 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-indigo-400 hover:text-indigo-300 font-medium ml-1 outline-none"
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Auth
