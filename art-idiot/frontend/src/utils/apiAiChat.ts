import axios from 'axios'
import {BACKEND_URL} from '../config';

const chat_api = axios.create({
  baseURL: BACKEND_URL,
})

export const postRuGPT3Questions = async (question: string) => {
  if (!(question.length > 0)) {
    throw new Error('Попробуйте задать чуть-более внушительный вопрос =)');
  }
  const response = await chat_api.post(`/rugpt3`, {
    question: question
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.data) {
    return response.data.message;
  }
}
