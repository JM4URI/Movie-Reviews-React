import React, { useState } from 'react';
import type { Review } from '../../../../models/review';

const REVIEW_TRUNCATE_LIMIT = 500;

const formatReviewDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const content = review.content || 'Contenido de reseña no disponible.';
  const isLongReview = content.length > REVIEW_TRUNCATE_LIMIT;
  const displayContent = isLongReview && !isExpanded
    ? `${content.substring(0, REVIEW_TRUNCATE_LIMIT)}...`
    : content;
    
  return (
    <article 
      className="bg-dark-700/80 p-6 sm:p-8 rounded-xl border border-dark-600 shadow-2xl hover:shadow-primary-500/10 transition duration-300"
      aria-labelledby={`review-author-${review.id}`}
    >
      <header className="flex items-start mb-5 border-b border-dark-600 pb-4">
        <div className="w-14 h-14 rounded-full bg-primary-500/20 border-2 border-primary-500 flex items-center justify-center font-bold text-xl text-primary-300 mr-4 flex-shrink-0">
          {review.author.charAt(0).toUpperCase()}
        </div>
        
        {/* Información del Autor y Fecha */}
        <div>
          <h3 
            id={`review-author-${review.id}`} 
            className="font-extrabold text-xl text-white tracking-wide"
          >
            {review.author}
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">
            Publicada el: <time dateTime={review.created_at}>{formatReviewDate(review.created_at)}</time>
          </p>
        </div>
      </header>
      
      {/* Contenido de la reseña */}
      <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
        {displayContent}
      </p>

      {/* Botón de expansión si es necesario */}
      {isLongReview && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-primary-400 hover:text-primary-300 font-semibold text-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-primary-400 rounded-md"
          aria-expanded={isExpanded}
          aria-controls={`review-content-${review.id}`}
        >
          {isExpanded ? 'Mostrar menos' : 'Continuar leyendo...'}
        </button>
      )}
    </article>
  );
};

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {

  const validReviews = reviews.filter(review => review.id);

  return (
    <section 
      className="py-16 bg-dark-800 text-white" 
      aria-labelledby="reviews-section-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 
          id="reviews-section-heading" 
          className="text-4xl font-extrabold mb-10 border-b-2 border-primary-500/50 pb-2"
        >
          Opiniones y Reseñas ({validReviews.length})
        </h2>

        {validReviews.length > 0 ? (
          <div className="space-y-8" role="list">
            {validReviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div 
            className="p-10 text-center bg-dark-700/50 border border-dark-600 rounded-xl shadow-inner"
            role="status"
          >
            <p className="text-xl font-medium text-slate-300">
              No hay reseñas disponibles para mostrar en este momento. ¡Sé el primero en opinar!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};