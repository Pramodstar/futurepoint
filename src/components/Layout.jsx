import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="header">
        <Link to="/" className="logo">
          <span className="logo-icon">◆</span>
          FuturePoint
        </Link>
        <nav className="nav">
          <NavLink to="/careers">Careers</NavLink>
          <NavLink to="/resources">Guides</NavLink>
          {user ? (
            <>
              <NavLink to="/assessment">Assessment</NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <button type="button" className="btn-ghost" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <Link to="/register" className="btn btn-primary btn-sm">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} FuturePoint — Apna sahi career chuno</p>
      </footer>
    </div>
  );
}
