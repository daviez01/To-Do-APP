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
    // Get the tasks from local storage.
    const tasksJson = this.localStorageService.getTasks();
  
    // Convert the array of tasks to a string.
    const tasksJsonString = JSON.stringify(tasksJson);
  
    // Deserialize the tasks from JSON.
    const tasks = JSON.parse(tasksJsonString) as TodoLS[];
  
    // Assign the tasks to the todos array.
    this.todos = tasks;
  }

  loadTasksFromLocalStorage() {
    const storedTasksString = localStorage.getItem('todo');
    if (storedTasksString !== null) {
      const storedTasks = JSON.parse(storedTasksString);
      this.todos = storedTasks;
    } else {
      this.todos = []; // or provide a default value if needed
    }
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


  drop(event: CdkDragDrop<TodoLS[]>) {
    console.log(event);
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    this.reassignIDs();
    this.updateTodo (this.todos);
  }

  deleteTodo (todo: TodoLS) {
    // this.todoService
    //   .deleteTodo (todo)
    //   .subscribe(
    //     () => (this.todos = this.todos.filter((t) => t.id !== todo.id))
    //   );
  }

  setCompleted (todo: TodoLS) {
    todo.completed = !todo.completed;
    // this.todoService.updateTodoCompleted(todo).subscribe();
  }

  storeTasks(): void {
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
    this.storeTasks();
  }



  updateTodo (todos: TodoLS[]) {
    // this.todoService.updateTodo (todos).subscribe();

    // Convert the array of TodoLS objects to an array of JSON strings.
    const tasksJson: string[] = todos.map((todo) => JSON.stringify(todo))

    this.localStorageService.storeTasks(tasksJson)
  }


}
