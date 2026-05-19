import innovatubeApi from "../api/innovatubeApi";

export const loginUser = async (email, password) => {
  try {
    const response = await innovatubeApi.post('/auth/login', { email, password });
    
    if (response.data.ok && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data; 
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    console.error("Error in loginUser action:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await innovatubeApi.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    console.error("Error in registerUser action:", error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token'); 
};
