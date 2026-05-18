import { useState } from 'react';
import { loginUser, registerUser } from '../actions/users';

export const AuthForm = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // AuthForm Fields states
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    userName:'',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, lastName, userName, email, password, confirmPassword } = formData;

  const handleInputChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      return setErrorMsg('Email and password are required');
    }

    if (!isLogin && password !== confirmPassword) {
      return setErrorMsg('Passwords do not match');
    }

    setLoading(false);
    try {
      if (isLogin) {
        // --- LOGIN ---
        const data = await loginUser(email, password);
        if (data.ok) {
          onLoginSuccess({ name: data.name, email: data.email, uuid: data.uuid });
        } else {
          setErrorMsg(data.msg || 'Wrong credentials, try again');
        }
      } else {
        // --- CREATING USER ---
        const data = await registerUser({ name, lastName, userName, email, password, confirmPassword });
        if (data.ok) {
          alert('User created');
          setIsLogin(true);
          setFormData({ name: '', lastName: '',  userName: '', email: '', password: '', confirmPassword: '' });
        } else {
          setErrorMsg(data.msg || 'Error creating user');
        }
      }
    } catch (error) {
      setErrorMsg('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='form-container'>
      <h2 className='form-title'>{isLogin ? 'Iniciar Sesión' : 'Registro de Usuario'}</h2>
      
      {errorMsg && <p className='err-msg'>{errorMsg}</p>}

      <form onSubmit={handleSubmit} className='login-reg-form'>
        
        {/* Campos exclusivos de Registro */}
        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={name}
              onChange={handleInputChange}
              required
              className='login-reg-form-fields'
            />
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              value={lastName}
              onChange={handleInputChange}
              required
              className='login-reg-form-fields'
            />
            <input
              type="text"
              name="userName"
              placeholder="Nombre de usuario"
              value={userName}
              onChange={handleInputChange}
              required
              className='login-reg-form-fields'
            />
          </>
        )}

        {/* Campos compartidos */}
        <input
          type="text"
          name="email"
          placeholder="Correo electrónico o nombre de usuario"
          value={email}
          onChange={handleInputChange}
          required
          className='login-reg-form-fields'
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleInputChange}
          required
          className='login-reg-form-fields'
        />

        {/* Campo exclusivo de Confirmación de Contraseña */}
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={handleInputChange}
            required
            className='login-reg-form-fields'
          />
        )}

        <button 
          type="submit" 
          disabled={loading}
          className='login-reg-form-submit'
        >
          {loading ? 'Procesando...' : isLogin ? 'Ingresar' : 'Registrarse'}
        </button>
      </form>

      <p className='form-foot-note'>
        {isLogin ? '¿No tienes cuenta todavía?' : '¿Ya tienes una cuenta?'} 
        <span 
          onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }} 
          className='form-foot-note-link'
        >
          {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
        </span>
      </p>
    </div>
  );
};
