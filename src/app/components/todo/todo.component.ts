import { Component } from '@angular/core';
// import { TodoService } from '../../services/todo.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TodoLS } from '../../../TodoLS';
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

  todos: TodoLS[] = [];

  constructor(private localStorageService: LocalStorageService, private gridService: GridService) { 
    this.subscription = this.gridService.onToggle().subscribe((value) => {
      this.showGrid = value;
    });
  }


  ngOnInit(): void {
    this.todos = this.getTasks();
  }


  onChange() { 
    this.gridService.toggleChangeGrid();
  }

  //reasigning Ids based on index
  // reassignIDs(): void {
  //   this.todos.forEach((todo, index) => {
  //     todo.id = index + 1;
  //   });
  //   console.log(this.todos);
  // }


  drop(event: CdkDragDrop<TodoLS[]>) {
    console.log(event);
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    // this.reassignIDs();
    this.storeTasks(this.todos);
  }

  deleteTodo (todo: TodoLS) {
    // Remove the todo from the todos array.
    const todoIndex = this.todos.indexOf(todo);
    if (todoIndex !== -1) {
      this.todos.splice(todoIndex, 1);
    }

    // remove the tasks in local storage.
    const todoJson = JSON.stringify(todo);
    this.localStorageService.deleteTask(todoJson);      
  }

  setCompleted (todo: TodoLS) {
    todo.completed = !todo.completed;

    this.storeTasks(this.todos);
  }

  storeTasks(todos: TodoLS[]): void {
    // Convert the todos array to an array of JSON strings.
    const tasksJson: string[] = this.todos.map((todo) => JSON.stringify(todo));
  
    // Store the JSON strings in local storage.
    this.localStorageService.storeTasks(tasksJson);
  }
  
  getTasks(): TodoLS[] {
    // Get the JSON strings from local storage.
    const tasksJson: string[] = this.localStorageService.getTasks();
  
    // Convert the JSON strings back to TodoLS objects.
    const tasks: TodoLS[] = tasksJson.map((taskJson) => JSON.parse(taskJson) as TodoLS);
  
    return tasks;
  }


  addTodo(newTodo: Todo) {
    // Convert the new Todo object to a TodoLS object.
    const todoLS: TodoLS = newTodo as TodoLS;

    // Add the TodoLS object to the todos array.
    this.todos.push(todoLS);

  // Store the tasks in local storage.
    this.storeTasks(this.todos);
  }

}
