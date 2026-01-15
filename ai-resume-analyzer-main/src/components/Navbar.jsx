import { Link, useNavigate } from "react-router";
import { useAuthStore } from "~/lib/api";

/**
 * Navbar component.
 * Displays the application logo and navigation links.
 *
 * @returns {JSX.Element} The rendered Navbar.
 */
const Navbar = () => {
    const { auth } = useAuthStore();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await auth.signOut();
        navigate('/auth');
    };

    return (
        <nav className="navbar group">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </span>
                <span>RESUMIND</span>
            </Link>

            {auth.isAuthenticated ? (
                <div className="flex items-center gap-4">
                    <span className="hidden md:block text-sm text-text-secondary">Hello, {auth.user?.name || 'User'}</span>
                    <button onClick={handleSignOut} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all text-white">
                        Sign Out
                    </button>
                </div>
            ) : (
                <Link to="/auth" className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-hover shadow-lg shadow-indigo-500/30 transition-all">
                    Get Started
                </Link>
            )}
        </nav>
    )
}
export default Navbar
