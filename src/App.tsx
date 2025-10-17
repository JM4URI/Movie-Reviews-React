import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header/Header';
import { Home } from './pages/Home/Home';
import { MovieDetail } from './pages/MovieDetail/MovieDetail';
import { Footer } from './components/layout/Footer/Footer';
import { Search } from './pages/Search/Search';
import { MovieList } from './pages/MovieList/MovieList';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-dark-900">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<MovieList type="popular" title="Películas Populares" />} />
          <Route path="/top-rated" element={<MovieList type="top-rated" title="Películas Mejor Valoradas" />} />
          <Route path="/upcoming" element={<MovieList type="upcoming" title="Próximos Estrenos" />} />
          <Route path="/now-playing" element={<MovieList type="now-playing" title="Películas en Cartelera" />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;