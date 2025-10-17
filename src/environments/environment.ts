export const environment = {
  production: false,

  tmdb: {
    apiKey: import.meta.env.VITE_TMDB_API_KEY,
    baseUrl: 'https://api.themoviedb.org/3',
    imageBaseUrl: 'https://image.tmdb.org/t/p',

    imageSizes: {
      posters: {
        small: 'w185',
        medium: 'w342',
        large: 'w500',
        xlarge: 'w780',
        original: 'original'
      },
      backdrop: {
        small: 'w300',
        medium: 'w780',
        large: 'w1280',
        original: 'original'
      },
      profile: {
        small: 'w45',
        medium: 'w18',
        large: 'h632',
        original: 'original'
      },
    },

    defaultLanguage: 'es-MX',
    defaultRegion: 'MX',
    includeAdult: true,

    timeout: 10000,
    maxRetries: 3
  },

  cache: {
    enable: true,
    duration: 300000,
    maxSize: 100
  }
};

