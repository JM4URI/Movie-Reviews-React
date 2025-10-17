interface MovieGridSkeletonProps {
  count: number;
}

export const MovieGridSkeleton = ({ count }: MovieGridSkeletonProps) => {

  const gridClasses = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10";

  return (
    <div className={gridClasses}>
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          // Tarjeta esqueleto con pulso, fondo oscuro y esquinas redondeadas
          className="
            bg-dark-800 
            rounded-xl 
            shadow-xl 
            shadow-dark-900/50 
            p-3 
            h-[380px] 
            animate-pulse 
            overflow-hidden 
            transform transition-transform duration-300
          "
        >
          {/* Placeholder para el póster (el 80% de la altura de la tarjeta) */}
          <div className="h-4/5 bg-dark-700 rounded-lg mb-3"></div>
          
          {/* Placeholder para el título */}
          <div className="h-4 w-4/5 bg-dark-700 rounded-full mb-2"></div>
          
          {/* Placeholder para el año */}
          <div className="h-3 w-1/3 bg-dark-700 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};