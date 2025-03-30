import { Injectable } from '@angular/core';
import { TODOS } from './model/todo.data';
import { Todo } from './model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  async getTodos(): Promise<Todo[]> {
    await this.sleep();
    return TODOS;
  }
  async toggleTodo(id: number) {
    await this.sleep();
    TODOS.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });

    return null;
  }

  async addTodo(value: string): Promise<Todo> {
    await this.sleep();
    const todo = { title: value, completed: false, id: TODOS.length + 1 };
    TODOS.push(todo);
    return todo;
  }

  async sleep() {
    return new Promise((resolve) => setTimeout(() => resolve(true), 250));
  }
}
