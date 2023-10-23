import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TODOS } from '../../mock-todo';
import { Todo } from '../../Todo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = 'http://localhost:5000/todos';

  constructor(private http:HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl);
  }

  deleteTodo (todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url);
  }

  updateTodoCompleted (todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo, httpOptions);
  }

  addTodo (todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  updateTodo (todos: Todo[]): Observable<any> {
    const url = `${this.todosUrl}`;
    return this.http.put<Todo>(url, todos, httpOptions);
  }

  // updateTaskOrder(newOrder: Todo[]): Observable<any> {
  //   const url = `${this.todosUrl}/updateOrder`;
  //   return this.http.put(url, newOrder, httpOptions);
  // }
}