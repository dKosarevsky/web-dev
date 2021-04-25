import axios from 'axios'
import { BACKEND_URL } from '../config';

export const getRuGPT3Answer = async () => {
  const response = await fetch(BACKEND_URL + '/rugpt3');

  const data = await response.json();

  if (data.message) {
    return data.message;
  }

  return Promise.reject('Failed to get message from backend');
};

export const postRuGPT3Questions = async (question: string) => {
  if (!(question.length > 0)) {
    throw new Error('Попробуйте задать чуть-более внушительный вопрос =)');
  }

  const request = new Request(BACKEND_URL + '/rugpt3', {
    method: 'POST',
    body: question,
  });

  const response = await fetch(request);

  if (response.status === 500) {
    throw new Error('Internal server error');
  }

  const data = await response.json();

  if (data.message) {
    return data.message;
  }

  return Promise.reject('Failed to get message from backend');
};
