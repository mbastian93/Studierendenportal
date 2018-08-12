import {Meal} from './meal';

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
      const temp: Counter = {name: counter.name, meals: [], types: []};
      counter.meals.forEach(meal => {
        if (meal.date === day) {
          temp.meals.push(meal);
        }
      });
      result.push(temp);
    });
    return result;
  }

  addMeal(meal: Meal) {
    this.counters.forEach(counter => {
      if (counter.types.indexOf(+meal.type) >= 0) {
        counter.meals.push(meal);
      }
    });
    if (this.days.indexOf(meal.date) < 0) {
      this.days.push(meal.date);
    }
  }
}

export class Counter {
  name: string;
  types: number[];
  meals: Meal[];
}
