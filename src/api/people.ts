import { AxiosResponse } from 'axios';
import { axios } from '.';
import { Person } from '../types';

const getPeople = async (
  page: number
): Promise<AxiosResponse<{ next: string; results: Person[] }>> => {
  return axios(`/people?page=${page}`);
};

export const getAllPeople = async (): Promise<{
  data: { results: Person[] };
}> => {
  let result: Person[] = [];
  let page = 1;
  async function fetchData() {
    const res = await getPeople(page);
    if (res.data.next) {
      page = +res.data.next[res.data.next.length - 1];
      result = [...result, ...res.data.results];
      await fetchData();
    } else {
      result = [...result, ...res.data.results];

      return;
    }
  }
  await fetchData();

  return { data: { results: result } };
};

export const func = () => {};
