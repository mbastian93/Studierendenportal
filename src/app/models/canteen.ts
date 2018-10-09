import {Meal} from './meal';
import {Counter} from './counter';

export class Canteen {
  name: string;
  counters: Counter[];
  days: string[] = [];
  constructor(name: string, counters: Counter[]) {
    this.name = name;
    this.counters = counters;
  }

  getMealsForDayByCounter(day: string): Counter[] {
    const result: Counter[] = [];
    this.counters.forEach(counter => {
      const temp: Counter = new Counter(counter.name);
      counter.meals.forEach(meal => {
        if (meal.date === day) {
          temp.meals.push(meal);
        }
      });
      result.push(temp);
    });
    return result;
  }

  addMeal(meal: Meal, type: number) {
    this.counters.forEach(counter => {
      if (counter.types.indexOf(type) >= 0) {
        counter.meals.push(meal);
      }
    });
    if (this.days.indexOf(meal.date) < 0) {
      this.days.push(meal.date);
    }
  }
}
