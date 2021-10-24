import { AxiosResponse } from 'axios';
import { axios } from '.';
import { Species } from '../types';

export const getAllSpecies = (): Promise<
  AxiosResponse<{ results: Species[] }>
> => {
  return axios('/species');
};
