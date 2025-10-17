import type { MovieDetail } from '../../../../models/movie';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  isList?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children, isList = false }) => {
  return (
    <div className="p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg transition duration-300 hover:border-white/20 hover:shadow-2xl h-full">
      <h3 className="text-lg font-semibold mb-3 text-white/90 uppercase tracking-wider border-b border-white/10 pb-2">
        {title}
      </h3>
      <div className={`text-white/80 ${isList ? 'space-y-2' : ''}`}>
        {children}
      </div>
    </div>
  );
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

interface MovieInfoProps {
  movie: MovieDetail;
}

export const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {

  const hasGenres = movie.genres && movie.genres.length > 0;
  const hasCompanies = movie.production_companies && movie.production_companies.length > 0;

  return (
    <section 
      className="py-16 bg-gray-900 text-white" 
      aria-labelledby="movie-info-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          id="movie-info-heading" 
          className="text-4xl font-extrabold mb-10 text-center border-b-2 border-primary-500 pb-2" 
        >
          Detalles de la Película
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Tarjeta de Géneros */}
          <div className="lg:col-span-2"> 
            <InfoCard title="Géneros">
              {hasGenres ? (
                <div className="flex flex-wrap gap-3" role="list">
                  {movie.genres.map(genre => (
                    <span 
                      key={genre.id} 
                      className="px-4 py-1.5 bg-dark-700 text-white/90 rounded-full text-sm font-medium tracking-wide border border-dark-600 transition duration-200 hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-400"
                      role="listitem"
                      aria-label={`Género: ${genre.name}`}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p>No disponible</p>
              )}
            </InfoCard>
          </div>

          {/* Tarjeta de Presupuesto */}
          <InfoCard title="Presupuesto">
            <p className="text-2xl font-bold">
              {movie.budget > 0 ? formatCurrency(movie.budget) : 'No disponible'}
            </p>
          </InfoCard>

          {/* Tarjeta de Recaudación */}
          <InfoCard title="Recaudación (Revenue)">
            <p className="text-2xl font-bold">
              {movie.revenue > 0 ? formatCurrency(movie.revenue) : 'No disponible'}
            </p>
          </InfoCard>

          {/* Tarjeta de Compañías Productoras */}
          <div className="md:col-span-2 lg:col-span-4"> 
            <InfoCard title="Compañías Productoras" isList={true}>
              {hasCompanies ? (
                <ul className="space-y-1 list-none p-0"> 
                  {movie.production_companies.map(company => (
                    <li 
                      key={company.id} 
                      className="flex items-center before:content-['•'] before:mr-2 before:text-primary-400" // Indicador visual
                      aria-label={`Compañía: ${company.name}`}
                    >
                      {company.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No disponible</p>
              )}
            </InfoCard>
          </div>
        </div>
      </div>
    </section>
  );
};