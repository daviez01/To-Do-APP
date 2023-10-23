import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  private showGrid: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleChangeGrid(): void {
    this.showGrid = !this.showGrid
    this.subject.next(this.showGrid);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}



