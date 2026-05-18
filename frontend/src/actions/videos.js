import innovatubeApi from "../api/innovatubeApi";

export const getVideosByQuery = async (query) => {
    try {
        const response = await innovatubeApi.get('/videos', {
          params: {
            q: query,
            maxResults: 10,
          },
        });
      
        return response.data
        
    } catch (error) {
        console.error("Error in getVideosByQuery action:", error);
        throw error;
    }
};

export const addFavourite = async (userEmail, video) => {
    try {
        const videoId = video.id?.videoId || video.id;
        const {title, thumbnails} = video.snippet;
    
        const response = await innovatubeApi.post('/favourites', {
            userEmail,
            videoId,
            title,
            thumbnail: thumbnails?.medium?.url
        })
        return response.data
    } catch (error) {
        console.error('Error in add favourite action', error);
        throw error;
    }
}

export const getFavourites = async (userEmail) => {
    try {
        const response = await innovatubeApi.get('/favourites', {
          params: {
            email: userEmail
          },
        });
      
        return response.data
        
    } catch (error) {
        console.error("Error in getFavcourites action:", error);
        throw error;
    }
};

export const deleteFavourite = async (favouriteId) => {
    try {
        const response = await innovatubeApi.delete(`/favourites/${favouriteId}`);
        return response.data
        
    } catch (error) {
        console.error("Error in deleteFavcourite action:", error);
        throw error;
    }
};