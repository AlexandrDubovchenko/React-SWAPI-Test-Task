import { AxiosResponse } from 'axios';
import { axios } from '.';
import { Film } from '../types';

export const getAllFilms = (): Promise<AxiosResponse<{ results: Film[] }>> => {
  return axios('/films');
};
