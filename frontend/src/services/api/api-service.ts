import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { setupInterceptorsTo } from './interceptors';

export default class ApiService {
  private readonly instance: AxiosInstance;

  constructor(protected readonly pathPrefix: string) {
    this.instance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
    setupInterceptorsTo(this.instance);
  }

  private makeFormData = (data: object = {}) => {
    const formData = new FormData();
    const appendFormData = (dataToAppend: object, path = '') => {
      Object.entries(dataToAppend || {}).forEach(([name, value]) => {
        const newPath = path ? `${path}[${name}]` : name;
        if (name === 'file' || name === 'image' || name === 'avatar') {
          formData.append(newPath, value);
        } else if (typeof value === 'object') {
          appendFormData(value, newPath);
        } else if (typeof value === 'boolean') {
          formData.append(newPath, value ? '1' : '0');
        } else {
          formData.append(newPath, value);
        }
      });
    };
    appendFormData(data);

    return formData;
  };

  get = async (url: string, query = {}) => {
    return await this.instance.get(`/${this.pathPrefix}/${url}`, query);
  };

  post = async (url: string, data = {}, isJson = true): Promise<AxiosResponse> => {
    return await this.instance.post(`/${this.pathPrefix}/${url}`, isJson ? data : this.makeFormData(data));
  };

  put = async (url: string, data = {}, isJson = true): Promise<AxiosResponse> => {
    return await this.instance.put(`/${this.pathPrefix}/${url}`, isJson ? data : this.makeFormData(data));
  };

  patch = async (url: string, data = {}): Promise<AxiosResponse> => {
    return await this.instance.patch(`/${this.pathPrefix}/${url}`, data);
  };

  delete = async (url: string, query = {}): Promise<AxiosResponse> => {
    return await this.instance.delete(`/${this.pathPrefix}/${url}`, query);
  };
}
