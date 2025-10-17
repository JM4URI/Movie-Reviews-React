import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const navLinks = [
    { path: '/', label: 'Inicio', exact: true },
    { path: '/popular', label: 'Populares' },
    { path: '/top-rated', label: 'Top Rated' },
    { path: '/upcoming', label: 'Próximas' },
    { path: '/now-playing', label: 'En Cartelera' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-xl border-b border-primary-500/20 shadow-lg shadow-primary-500/5">
      <nav className="container-custom" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo con efecto glow */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-2 py-1 transition-all"
            aria-label="MovieReviews - Ir a la página de inicio"
          >
            <div className="hidden sm:block">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-400 via-primary-300 to-cyan-300 bg-clip-text text-transparent group-hover:from-primary-300 group-hover:to-cyan-200 transition-all">
                MovieReviews
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.exact}
                className={({ isActive }) =>
                  `relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 group ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg shadow-primary-500/30 animate-in" />
                    )}
                    {!isActive && (
                      <div className="absolute inset-0 bg-dark-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative group">
              <label htmlFor="desktop-search" className="sr-only">
                Buscar películas
              </label>
              <input
                id="desktop-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar películas..."
                className="w-64 lg:w-80 bg-dark-800/50 border border-dark-700/50 text-slate-100 pl-11 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 focus:bg-dark-800 placeholder:text-slate-500 transition-all backdrop-blur-sm"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="w-5 h-5 text-slate-400 group-focus-within:text-primary-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-300 transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </form>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-dark-800 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-dark-800/50 space-y-3 animate-in">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-2 mb-4">
              <label htmlFor="mobile-search" className="sr-only">
                Buscar películas
              </label>
              <div className="relative">
                <input
                  id="mobile-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar películas..."
                  className="w-full bg-dark-800/50 border border-dark-700/50 text-slate-100 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-slate-500 backdrop-blur-sm"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </form>

            {/* Mobile Links */}
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.exact}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `relative px-4 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 overflow-hidden ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{link.label}</span>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg shadow-primary-500/20" />
                      )}
                      {!isActive && (
                        <div className="absolute inset-0 bg-dark-800" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;