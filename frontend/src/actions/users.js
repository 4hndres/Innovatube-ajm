// src/actions/users.js
import innovatubeApi from "../api/innovatubeApi";

// 1. Iniciar Sesión (Login)
export const loginUser = async (email, password) => {
  try {
    const response = await innovatubeApi.post('/auth/login', { email, password });
    
    // Si el backend responde con éxito, guardamos el token localmente
    if (response.data.ok && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data; // Retorna { ok: true, name, email, token, etc. }
  } catch (error) {
    // Si el backend responde con un error controlado (ej: 400), exponemos la respuesta
    if (error.response) {
      return error.response.data;
    }
    console.error("Error in loginUser action:", error);
    throw error;
  }
};

// 2. Registrar un Nuevo Usuario
export const registerUser = async (userData) => {
  // userData debe ser un objeto con: name, lastName, email, password, confirmPassword
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

// 3. Cerrar Sesión (Logout)
export const logoutUser = () => {
  localStorage.removeItem('token'); // Limpia el token de Axios de inmediato
};
