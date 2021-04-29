import axios from 'axios'
import {BACKEND_URL} from '../config';

const zebrate_api = axios.create({
  baseURL: BACKEND_URL,
})

export const sendZebrateImg = async (image: string) => {
  // if (!(question.length > 0)) {
  //   throw new Error('Попробуйте задать чуть-более внушительный вопрос =)');
  // }
  const response = await zebrate_api.post(`/zebrate`, {
    image: image
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.data) {
    return response.data.message;
  }
}
