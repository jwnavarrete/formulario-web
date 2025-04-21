import api from '@config'
// Service
import authService from '@services/AuthService'
// api
import axios from 'axios'
// sweetalert
import swal from 'sweetalert'

const register = async (msg, modulo) => {
    const token = authService.getToken()
    
    const log = {
        actividad: msg,
        modulo: modulo
    }
    
    try {
      const { data } = await axios.post(
        `http://${api.host}:${api.port}/logs_all`,
        log,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    } catch (error) {
      swal({
        title: 'Formulario Online',
        text: `Error ${error}`,
        icon: 'error',
        button: 'Aceptar',
        timer: '2000'
      })
    }
}

export default { register }
