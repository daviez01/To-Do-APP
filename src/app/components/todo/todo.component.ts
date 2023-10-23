import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../../Todo';
import { GridService } from 'src/app/services/grid.service';
import { Subscription } from 'rxjs';
import { faThLarge, faBars } from '@fortawesome/free-solid-svg-icons'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  faThLarge = faThLarge;
  faBars = faBars;
  showGrid: boolean = false;
  subscription: Subscription;

  todos: Todo[] = [];

  constructor(private todoService: TodoService, private gridService: GridService) { 
    this.subscription = this.gridService.onToggle().subscribe((value) => {
      this.showGrid = value;
    });
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  onChange() { 
    this.gridService.toggleChangeGrid();
  }

  //reasigning Ids based on index
  reassignIDs(): void {
    this.todos.forEach((todo, index) => {
      todo.id = index + 1;
    });
    console.log(this.todos);
  }


  drop(event: CdkDragDrop<Todo[]>) {
    console.log(event);
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    this.reassignIDs();
    this.updateTodo (this.todos);
  }

  deleteTodo (todo: Todo) {
    this.todoService
      .deleteTodo (todo)
      .subscribe(
        () => (this.todos = this.todos.filter((t) => t.id !== todo.id))
      );
  }

  setCompleted (todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodoCompleted(todo).subscribe();
  }

  addTodo (todo: Todo) {
    this.todoService.addTodo (todo).subscribe((todo) => (this.todos.push(todo)));
  }

  updateTodo (todos: Todo[]) {
    this.todoService.updateTodo (todos).subscribe();
  }

  // updateTaskOrderOnServer(): void {
  //   this.todoService.getTodos().subscribe({
  //     next: (todos) => {
  //       this.todos = todos;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching todos:', error);
  //     }
  //   })
  // }

}
