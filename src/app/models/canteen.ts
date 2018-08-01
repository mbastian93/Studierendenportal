import {Meal} from './meal';

export class Canteen {
  name: string;
  meals: Meal[] = [];
  days: string[] = [];
  constructor(name: string) {
    this.name = name;
  }

  getMealsForDay(day: string): Meal[] {
    const result: Meal[] = [];
    this.meals.forEach(meal => {
      if (meal.date === day) {
          result.push(meal);
      }
    });
    return result;
  }
}
