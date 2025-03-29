import { Injectable } from '@angular/core';
import { TODOS } from './model/todo.data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  async getTodos() {
    await this.sleep();
    return structuredClone(TODOS);
  }

  async sleep() {
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
  }
}
