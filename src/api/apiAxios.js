import axios from 'axios';

// Crie uma instância separada do Axios para a API
const apiAxios = axios.create({
  baseURL: "http://localhost:8080"
});

// Adicione os interceptadores e configurações adicionais se necessário
apiAxios.interceptors.request.use(async (config) => config);

export default apiAxios;