import axios from 'axios'
import {BACKEND_URL} from '../config';

const zebrate_api = axios.create({
  baseURL: BACKEND_URL,
})

export const sendZebrateLink = async (link: string) => {
  if (!(link.length > 0)) {
    throw new Error('Попробуйте ввести ссылку на изображение');
  }
  const response = await zebrate_api.post(`/zebrate_link`, {
    link: link
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.data) {
    return response.data.zebra_img;
  }
}
