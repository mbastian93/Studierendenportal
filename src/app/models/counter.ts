import {Meal} from './meal';

export class Counter {
  name: string;
  types: number[];
  meals: Meal[];
  constructor(name: string) {
    this.name = name;
    this.meals = [];
  }
}
