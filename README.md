# Movie Reviews React

Este es un proyecto de aplicación web para explorar películas, construido con React, TypeScript y Vite. La aplicación permite a los usuarios descubrir películas populares, en cartelera, próximos estrenos y buscar películas específicas. Utiliza la API de [The Movie Database (TMDb)](https://www.themoviedb.org/) para obtener los datos.

## ✨ Características

-   **Explorar Películas:** Listas de películas populares, mejor valoradas, en cartelera y próximos estrenos.
-   **Búsqueda:** Funcionalidad de búsqueda para encontrar películas por su título.
-   **Detalles de Película:** Página de detalle con información completa de la película, incluyendo póster, sinopsis, calificación, reparto y videos (trailers).
-   **Diseño Responsivo:** Interfaz de usuario moderna y adaptable a diferentes tamaños de pantalla, construida con Tailwind CSS.
-   **Cache:** Implementación de un sistema de caché para reducir las solicitudes a la API y mejorar el rendimiento.
-   **Scroll-to-Top:** Soluciona el problema de scroll en la navegación de páginas.

## 🚀 Tecnologías Utilizadas

-   **React 19**
-   **TypeScript**
-   **Vite**
-   **React Router DOM**
-   **Tailwind CSS**
-   **ESLint**

## ⚙️ Primeros Pasos

Sigue estas instrucciones para tener una copia del proyecto funcionando en tu máquina local para desarrollo y pruebas.

### Prerrequisitos

-   [Node.js](https://nodejs.org/) (versión 18 o superior)
-   [npm](https://www.npmjs.com/) (o tu gestor de paquetes preferido)

### Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/movie-reviews-react.git
    cd movie-reviews-react
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    ```

### Variables de Entorno

Para que la aplicación funcione, necesitas una API key de TMDb.

1.  Crea una cuenta en [TMDb](https://www.themoviedb.org/signup) y solicita una API key.
2.  Crea un archivo `.env` en la raíz del proyecto.
3.  Añade tu API key al archivo `.env` de la siguiente manera:

    ```
    VITE_TMDB_API_KEY=tu_api_key_aqui
    ```

### Ejecutar la Aplicación

Una vez que hayas instalado las dependencias y configurado las variables de entorno, puedes iniciar el servidor de desarrollo:

```bash
npm run dev
```

Esto iniciará la aplicación en modo de desarrollo. Abre [http://localhost:5173](http://localhost:5173) (o el puerto que indique la consola) para verla en tu navegador.

## 📂 Estructura de Carpetas

El proyecto sigue una estructura organizada para facilitar el mantenimiento y la escalabilidad:

```
c:/Portafolios/movie-reviews-react/
├── src/
│   ├── assets/         # Imágenes y otros recursos estáticos
│   ├── components/     # Componentes de React reutilizables
│   │   ├── common/     # Componentes genéricos (Loading, etc.)
│   │   ├── features/   # Componentes específicos de una funcionalidad
│   │   └── layout/     # Componentes de la estructura (Header, Footer)
│   ├── constants/      # Constantes de la aplicación
│   ├── environments/   # Configuración de entornos (dev, prod)
│   ├── hooks/          # Hooks de React personalizados
│   ├── models/         # Definiciones de tipos y modelos de datos
│   ├── pages/          # Componentes que representan páginas completas
│   ├── services/       # Servicios para interactuar con APIs externas
│   └── utils/          # Funciones de utilidad
├── .env                # Archivo de variables de entorno (no versionado)
├── index.html          # Punto de entrada HTML
├── package.json        # Dependencias y scripts del proyecto
└── README.md           # Este archivo
```

## Imagenes
<img width="1359" height="686" alt="image" src="https://github.com/user-attachments/assets/2b91c41f-41d0-4607-9ed1-b0fda1aed21e" />
<img width="1359" height="679" alt="image" src="https://github.com/user-attachments/assets/a8cd0dff-e70e-47fb-ac7b-f0b3eb8dc102" />
<img width="1359" height="688" alt="image" src="https://github.com/user-attachments/assets/b46c5915-af2c-490c-a75b-932902f37f2a" />
<img width="1359" height="685" alt="image" src="https://github.com/user-attachments/assets/f994cea4-a5cb-4321-8643-162ebe7fefb7" />
<img width="1359" height="685" alt="image" src="https://github.com/user-attachments/assets/ed14b871-e8d7-403b-ac4e-982c26846fdc" />
<img width="1359" height="686" alt="image" src="https://github.com/user-attachments/assets/6413bfa2-b222-44dc-81e2-5cdb1285532c" />





