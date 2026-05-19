import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar';

import { VideoGrid } from './components/VideoGrid';
import { getVideosByQuery, addFavourite, deleteFavourite, getFavourites } from './actions/videos';
import { AuthForm } from './components/AuthForm';
import { logoutUser } from './actions/users';
import "./App.css"

function App() {
  const [videos, setVideos] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [user, setUser] = useState(null);
  const [showOnlyFavs, setShowOnlyFavs] = useState(false)


   useEffect(() => {
      if (user?.email) {
        cargarFavourites();
      }
    }, [usuario]);

    const cargarFavourites = async () => {
    try {
      const data = await getFavourites(user.email);
      if (data.ok) setFavourites(data.favourites);
    } catch (error) {
      console.error("Error cargando favoritos:", error);
    }
  };

  const handleToggleFavourite = async (video, isFav) => {
    const videoId = video.id?.videoId || video.id || video.videoId;

    try {
      if (isFav) {
        const favDbItem = favourites.find(f => f.videoId === videoId);
        if (favDbItem) {
          await deleteFavourite(favDbItem._id);
          setFavourites(favourites.filter(f => f.videoId !== videoId));
        }
      } else {
        await addFavourite(user.email, video);
        cargarFavoritos();
      }
    } catch (error) {
      console.error("Error al procesar el favorito:", error);
    }
  };


  const handleSearch = async (query) => {  
    if (query.trim().length === 0) return;
    setShowOnlyFavs(false);    try {
      const data = await getVideosByQuery(query);
      if (data.ok) setVideos(data.videos);
    } catch (error) {
      console.error(error);
    }
  };

  const favouritesIds = favourites.map(f => f.videoId);

  return (
    <>  
        {user ? (
        <>
          <div className='navbar'>
            <h2>Hola, {user.name}</h2>
            <div>
              {/* Botones de navegación tipo Pestañas */}
              <button onClick={() => setShowOnlyFavs(false)} className='navbar-btn-search'>Buscar</button>
              <button onClick={() => setShowOnlyFavs(true)} className='navbar-btn-fav'>Favoritos </button>
              <button onClick={() => { logoutUser(); setUsuario(null); }} className='navbar-btn-logout'>Salir</button>
            </div>
          </div>

          {!showOnlyFavs ? (
            <>
              <SearchBar placeholder="Busca videos" onQuery={handleSearch} />    
              <h3 style={{ paddingLeft: '20px' }}>Resultados de Búsqueda</h3>
              <VideoGrid videos={videos} onToggleFavourite={handleToggleFavourite} favouritesIds={favouritesIds} />
            </>
          ) : (
            <>
              <h3 style={{ paddingLeft: '20px', marginTop: '20px' }}>Mi Lista de Favoritos</h3>
              <VideoGrid videos={favourites} onToggleFavourite={handleToggleFavourite} favouritesIds={favouritesIds} />
            </>
          )}
        </>
      ) : (
        <AuthForm onLoginSuccess={setUser} />
      )}
    </>
  )
}

export default App
