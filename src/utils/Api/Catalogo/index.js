import authService from "@services/AuthService";
import axios from "axios";

export const getCatalogo = async (catalogo, callback) => {
  const token = authService.getToken();
  const { data } = await axios.get(
    `http://${process.env.HOST_API}:${process.env.PORT_API}/${catalogo}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  callback(data);
};

//   data.map((item) => {
//     item.usuario_email = item?.user?.email;
//   });
