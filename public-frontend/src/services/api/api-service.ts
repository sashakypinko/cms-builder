import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';

export default class ApiService {
  private readonly instance: AxiosInstance;

  constructor(protected readonly pathPrefix: string) {
    this.instance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  }

  get = async (url: string, query = {}) => {
    return await this.instance.get(`/${this.pathPrefix}/${url}`, query);
  };

  post = async (url: string, data = {}): Promise<AxiosResponse> => {
    return await this.instance.post(`/${this.pathPrefix}/${url}`, data);
  };

  put = async (url: string, data = {}): Promise<AxiosResponse> => {
    return await this.instance.put(`/${this.pathPrefix}/${url}`, data);
  };

  delete = async (url: string, query = {}): Promise<AxiosResponse> => {
    return await this.instance.delete(`/${this.pathPrefix}/${url}`, query);
  };
}
