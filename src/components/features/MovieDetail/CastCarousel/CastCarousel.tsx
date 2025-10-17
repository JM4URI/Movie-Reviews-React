import type { Cast } from '../../../../models/cast';
import { tmdbService } from '../../../../services/tmdb';

const DEFAULT_PROFILE_IMAGE_URL = '/placeholder-profile.svg'; 
const IMAGE_SIZE = 'w185';

interface CastMemberCardProps {
  member: Cast;
}

const CastMemberCard: React.FC<CastMemberCardProps> = ({ member }) => {

  const profileImageUrl = member.profile_path
    ? tmdbService.getImageUrl(member.profile_path, IMAGE_SIZE)
    : DEFAULT_PROFILE_IMAGE_URL;
  const imageAltText = member.profile_path
    ? `Foto de perfil de ${member.name}`
    : `Perfil no disponible para ${member.name}`;

  return (
    <div 
      key={member.cast_id} 
      className="flex-shrink-0 w-40 sm:w-44 text-center group transition duration-300 transform hover:scale-[1.03] p-2 rounded-xl"
      role="listitem"
    >
      <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-2xl mb-3">
        <img
          src={profileImageUrl}
          alt={imageAltText}
          className={`w-full h-full object-cover transition duration-500 group-hover:scale-105 ${
            !member.profile_path ? 'bg-gray-700/50 p-6' : ''
          }`}
          aria-hidden={!member.profile_path}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Información del Reparto */}
      <div className="space-y-1">
        <h3 className="font-extrabold text-white text-base truncate" title={member.name}>
          {member.name}
        </h3>
        <p className="text-sm italic text-slate-300/80 truncate" title={member.character}>
          {member.character}
        </p>
      </div>
    </div>
  );
};

interface CastCarouselProps {
  cast: Cast[];
}

export const CastCarousel: React.FC<CastCarouselProps> = ({ cast }) => {
  const filteredCast = cast.filter(member => member.cast_id && member.name);

  if (filteredCast.length === 0) {
    return null;
  }

  return (
    <section 
      className="py-16 text-white" 
      aria-labelledby="cast-section-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          id="cast-section-heading" 
          className="text-4xl font-extrabold mb-8 border-b-2 border-white/20 pb-2"
        >
          Reparto Principal
        </h2>

        <ul 
          className="flex overflow-x-auto gap-6 pb-6 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-dark-700 snap-x snap-mandatory"
          role="list"
          aria-label="Lista de actores del reparto"
        >
          {filteredCast.map(member => (
            <li key={member.cast_id} className="snap-start">
              <CastMemberCard member={member} />
            </li>
          ))}
        </ul>

        <p className="sr-only" aria-live="polite">
          Desliza horizontalmente para ver el reparto completo.
        </p>
      </div>
    </section>
  );
};