import axios from 'axios';

export const makeRequest = async <T>(url: string, method: string, data?: any) => {
  const response = await axios({
    method,
    url,
    data
  });

  return response.data as T;
}