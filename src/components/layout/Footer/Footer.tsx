import { Link } from 'react-router-dom';

export const Footer = () => {

  const technologiesText = ['React', 'TypeScript', 'Tailwind CSS'];
  const tmdbIcon = (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.82 8.16l-3.68-3.68c-.78-.78-2.05-.78-2.83 0l-9.41 9.42c-.78.78-.78 2.05 0 2.83l3.68 3.68c.78.78 2.05.78 2.83 0l9.41-9.42c.78-.78.78-2.05 0-2.83zM12 17.5L6.5 12 12 6.5 17.5 12 12 17.5z" />
    </svg>
  );
  const linkClasses = "inline-block transition-all duration-300 hover:text-primary-400 hover:translate-x-1";

  return (
    <footer className="mt-auto bg-dark-900 border-t border-primary-500/30 pt-10" role="contentinfo">
      <div className="h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary-400 to-cyan-300 bg-clip-text text-transparent">
                MovieReviews
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm leading-relaxed text-base">
              Descubre, explora y encuentra información detallada sobre tus películas favoritas.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-dark-700 pb-2">Explora</h2>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link to="/" className={linkClasses}>Inicio</Link></li>
              <li><Link to="/popular" className={linkClasses}>Populares</Link></li>
              <li><Link to="/top-rated" className={linkClasses}>Mejor Valoradas</Link></li>
              <li><Link to="/upcoming" className={linkClasses}>Próximas</Link></li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-dark-700 pb-2">Tecnología Base</h2>
            <div className="text-slate-400 space-y-2 text-sm">
              <p className="font-medium text-slate-300">Desarrollado con:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                {technologiesText.map(tech => (
                  <li key={tech} className="text-slate-400">{tech}</li>
                ))}
                <li className="text-slate-400">Datos de la API de TMDB</li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="border-t border-dark-800/50 py-6">

          {/* Creador y Atribución TMDB */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm order-1 md:order-2">

            <div className="flex items-center gap-3">
              <span className="text-slate-300">Desarrollado por</span>
              <span className="font-semibold text-cyan-300">
                Jesús Mauricio Rocha Angulo
              </span>
            </div>

            {/* Separador */}
            <span className='hidden sm:block text-slate-600'>|</span>

            {/* TMDB Attribution */}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors group"
            >
              <span className="font-semibold group-hover:underline">Powered by TMDB</span>
              <div className="w-5 h-5 text-green-500">{tmdbIcon}</div>
            </a>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-4 pt-4 border-t border-dark-800/30">
          <p className="text-xs text-slate-400 text-center leading-relaxed">
            **Aviso Legal:** Este sitio utiliza la API de TMDB pero no está respaldado ni certificado por TMDB. Las imágenes y contenido pertenecen a sus respectivos propietarios.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
