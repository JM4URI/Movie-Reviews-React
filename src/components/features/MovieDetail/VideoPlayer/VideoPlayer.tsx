import type { Video } from '../../../../models/video';

const YOUTUBE_BASE_EMBED_URL = 'https://www.youtube.com/embed/';

interface VideoPlayerProps {
  videos: Video[];
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videos }) => {

  const TARGET_VIDEO_TYPE = 'Trailer';
  const TARGET_VIDEO_SITE = 'YouTube';
  const trailer = videos.find(
    (video) => video.type === TARGET_VIDEO_TYPE && video.site === TARGET_VIDEO_SITE
  );

  return (
    <section 
      className="py-16 bg-dark-800 text-white" 
      aria-labelledby="trailer-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          id="trailer-heading" 
          className="text-4xl font-extrabold mb-10 text-center border-b-2 border-white/20 pb-2"
        >
          Trailer Oficial
        </h2>

        {trailer ? (
          <div 
            className="relative w-full overflow-hidden rounded-2xl shadow-2xl transition duration-500 transform hover:scale-[1.005] border-4 border-white/10 hover:border-white/20"
            style={{ paddingBottom: '56.25%' }}
            role="region"
            aria-label={`Reproductor de video del trailer: ${trailer.name}`}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`${YOUTUBE_BASE_EMBED_URL}${trailer.key}`}
              title={`Trailer de la película: ${trailer.name}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div 
            className="p-10 text-center bg-dark-900 border-2 border-dark-700 rounded-xl shadow-inner"
            role="alert"
          >
            <p className="text-xl font-medium text-white/70">
              No hemos encontrado un trailer oficial de YouTube disponible para esta película.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};