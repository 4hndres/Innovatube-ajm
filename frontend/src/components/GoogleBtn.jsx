import { useEffect } from 'react';

const GoogleBtn = ({ onLoginSuccess }) => {

  const handleCredentialResponse = async (response) => {
    // response.credential es un token JWT muy seguro generado por Google
    try {
      const res = await fetch('http://localhost:5000/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential })
      });

      const data = await res.json();
      if (data.ok) {
        console.log("Usuario autenticado:", data.user);
        onLoginSuccess(data.user); // Guardas el usuario en el estado de tu app
      }
    } catch (error) {
      console.error("Error al autenticar en el backend:", error);
    }
  };

    useEffect(() => {
    // El script de Google expone el objeto global 'google' en el navegador
    /* global google */
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: "306348669655-i7110gnuj9edrjr0v674l48fng710n7d.apps.googleusercontent.com",
        callback: handleCredentialResponse // Función que recibe el token
      });

      // Renderiza el botón oficial con estilos nativos
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } 
      );
    }
  }, [onLoginSuccess]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div id="buttonDiv">hey</div>
    </div>
  );
};

export default GoogleBtn;