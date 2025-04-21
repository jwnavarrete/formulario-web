import axios from '@api/axios'
import qs from "qs";

const setToken = token => {
  window.localStorage.setItem('fv_online_token', token)
  window.localStorage.setItem('fvOnlineIsLoggedIn', true)
}

const getToken = () => {
  return window.localStorage.getItem('fv_online_token')
}

const setUser = user => {
  window.localStorage.setItem('fv_online_user', JSON.stringify(user))
}

const getUser = () => {
  return JSON.parse(window.localStorage.getItem('fv_online_user'))
}

const logOut = () => {
  window.localStorage.removeItem('fv_online_token')
  window.localStorage.removeItem('fv_online_user')
  window.localStorage.removeItem('fvOnlineIsLoggedIn')
}

const isLoggedIn = () => {
  return window.localStorage.getItem('fvOnlineIsLoggedIn')
}

const signIn = async (data) => {
  if (!data) {
    throw new Error("No existen datos para autenticar");
  }

  const { username, password } = data;

  if (!username || !password) {
    throw new Error("Credenciales inválidas");
  }

  const objUser = qs.stringify({ username, password });

  try {
    const response = await axios.post('/auth/login', objUser, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    });

    if (response.status === 200) {
      const { access_token, email, perfil_id } = response.data;

      setUser({ email, perfil_id });
      setToken(access_token);
    }
  } catch (error) {
    throw new Error(`Error en la autenticación: ${error.message}`);
  }
};

const authTokenForm = async (param) => {
  try {
    if (!param) {
      throw new Error("No existen datos para autenticar");
    }

    const { tipo, hash } = param;

    if (!tipo || !hash) {
      throw new Error("Credenciales inválidas");
    }

    const response = await axios.post('/auth/token-form', { tipo, hash });

    if (response.data) {
      setToken(response.data.access_token);
      return response.data;
    } else {
      throw new Error('Error al generar token-form de acceso');
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};


export default { setToken, getToken, logOut, isLoggedIn, setUser, getUser, signIn, authTokenForm }
