
export const VideoGrid = ({ videos, onToggleFavourite, favouritesIds = [] }) => {
  
  if (videos.length === 0) {
    return <p className='empty-grid'>No hay videos para mostrar</p>;
  }

  return (
    <div className='grid'>
      {videos.map((video) => {
        const videoId = video.id?.videoId || video.id;
        const title = video.snippet ? video.snippet.title : video.title;
        const thumbnail = video.snippet ? video.snippet.thumbnails?.medium?.url : video.thumbnail;
        
        const isFav = favouritesIds.includes(videoId);

        return (
          <div key={videoId} className='video-card'>
            <img src={thumbnail} alt={title} className='video-card-img' />
            <div className='video-card-data'>
              <h4 className='video-card-title'>{title}</h4>
              
              <button 
                onClick={() => onToggleFavourite(video, isFav)}
                className='video-card-btn'
                style={{
                  backgroundColor: isFav ? '#dc3545' : '#ffc107',
                  color: isFav ? 'white' : 'black'
                }}
              >
                {isFav ? '❌ Quitar de favoritos' : '⭐ Guardar en favoritos'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
