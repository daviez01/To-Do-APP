import { Component, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import {Todo} from '../../../Todo'


@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @Output() addTodo: EventEmitter<Todo> = new EventEmitter();

  title!: string;
  text!: string;
  date!: string;
  time: string = '00:00';
  completed: boolean = false;
  showAddTodo!: boolean;
  subscription: Subscription;
 
  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => (this.showAddTodo = value));
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.title) {
      alert('Please add a todo');
      return;
    }

    const newTodo = {
      title: this.title,
      text: this.text,
      day: this.date,
      time: this.time,
      completed: this.completed,
    };

    this.addTodo.emit(newTodo);

    this.title = '';
    this.text = '';
    this.date = '';
    this.time = '00:00';

  }
}
