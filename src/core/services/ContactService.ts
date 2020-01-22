/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */

import HttpClient from '../../resources/httpClient/HttpClient';
import Response from '../../resources/utils/Response';
import { IContact } from '../interfaces/ContactInterface';

class ContactService {
  async getList(): Promise<Response<IContact[]>> {
    try {
      const response = await HttpClient.get('/');
      return new Response<IContact[]>(response.data.success, response.data.data, response.data.msg);
    } catch (err) {
      return new Response<IContact[]>(false, null, []);
    }
  }

  async getContact(id: string): Promise<Response<any>> {
    try {
      const response = await HttpClient.get(`/${id}`);
      return new Response<any>(response.data.success, response.data.data, response.data.msg);
    } catch (err) {
      return new Response<any>(false, null, []);
    }
  }

  async updateContact(id: string, data: IContact): Promise<Response<any>> {
    try {
      const response = await HttpClient.put(`/${id}`, data);
      return new Response<any>(response.data.success, response.data.data, response.data.msg);
    } catch (err) {
      return new Response<any>(false, null, []);
    }
  }

  async createContact(data: IContact): Promise<Response<any>> {
    try {
      const response = await HttpClient.post('/', data);
      return new Response<any>(response.data.success, response.data.data, response.data.msg);
    } catch (err) {
      return new Response<any>(false, null, []);
    }
  }

  async removeContact(id: string): Promise<Response<any>> {
    try {
      const response = await HttpClient.delete(`/${id}`);
      return new Response<any>(response.data.success, response.data.data, response.data.msg);
    } catch (err) {
      return new Response<any>(false, null, []);
    }
  }
}

export default new ContactService();
