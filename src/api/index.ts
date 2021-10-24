import BaseAxios from 'axios'

export const BaseUrl = 'https://swapi.dev/api';

export const axios = BaseAxios.create({
  baseURL: BaseUrl,
  headers: { Accept: '*/*' },
});