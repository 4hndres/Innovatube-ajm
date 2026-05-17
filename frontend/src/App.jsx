import { useState } from 'react'
import  GoogleBtn from './components/GoogleBtn'

function App() {

  const [usuario, setUsuario] = useState(null);

  const handleLoginSuccess = (userRaw) => {
    setUsuario(userRaw);
  };

  return (
    <>
    {
      !usuario ? (
        <>
        <h1>hey Stranger</h1>
        <GoogleBtn onLoginSuccess={handleLoginSuccess}/>
        </>
      ) : (
        <h1>hey {usuario.name}</h1>
      )
    }
    </>
  )
}

export default App
