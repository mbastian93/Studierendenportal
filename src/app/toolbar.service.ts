import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  @Output() fire: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  setToolbarTitle(title: string) {
    this.fire.emit(title);
  }

  getEmittedValue() {
    return this.fire;
  }
}
