import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../../Todo'; 
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { GridService } from 'src/app/services/grid.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() onDeleteTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() onComplete: EventEmitter<Todo> = new EventEmitter();
  faTimes = faTimes;
  showGrid: boolean = false;
  subscription: Subscription;

  constructor(private gridService: GridService) { 
    this.subscription = this.gridService.onToggle().subscribe((value) => {
      this.showGrid = value;
    });
  }

  onDelete(todo: Todo) {
    this.onDeleteTodo.emit(todo);
  }

  onDone(todo: Todo) {
    this.onComplete.emit(todo);
  }
}
