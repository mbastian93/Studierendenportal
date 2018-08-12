import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Canteen} from '../models/canteen';
import {Meal} from '../models/meal';
import {Observable} from 'rxjs';

declare var require: any;

const url = 'https://www.studierendenwerk-mainz.de/speiseplan/Speiseplan.xml';


@Injectable({
  providedIn: 'root'
})
export class CanteenService {

  private domParser: DOMParser = new DOMParser();
  private rawCanteens: Canteen[] = require('./canteens.json') as Canteen[];
  canteens: Canteen[] = [];

  // check if given date is in future of current day
  static checkDate(date: string): boolean {
    const dateArray = date.split('.');
    const day = +dateArray[0];
    const month = +dateArray[1] - 1;
    const year = +dateArray[2];
    const checkDate = new Date(year, month, day, 0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (today <= checkDate);
  }

  constructor(
    private http: HttpClient
  ) {
  }

  getCanteenPlans(): Observable<string> {
    return this.http.get(url, {responseType: 'text'});
  }

  parseCanteenPlan(CanteenPlan: string): Canteen[] {
    // return when data already fetched
    if (this.canteens.length > 0) {
      return this.canteens;
    }
    // initialize canteens with name and counters
    this.rawCanteens.forEach(rawCanteen => {
      this.canteens.push(new Canteen(rawCanteen.name, rawCanteen.counters));
    });
    const doc = this.domParser.parseFromString(CanteenPlan, 'text/xml');
    const meals = Array.from(doc.getElementsByTagName('ROW')) as Element[];
    meals.forEach(mealAsXml => {
      const meal = new Meal();
      meal.date = mealAsXml.getAttribute('DATUM');
      // discard meals served on past mealsForDayByCounter
      if (!CanteenService.checkDate(meal.date)) {
        return;
      }
      // discard meals not served on campus
      const locationID = +mealAsXml.getAttribute('VERBRAUCHSORT');
      if ([310, 312, 370, 425].indexOf(locationID) < 0) {
        return;
      }
      // filter out salads and desserts
      meal.type = mealAsXml.getAttribute('TYP');
      if (+meal.type === 37 || +meal.type === 9) {
        return;
      }
      meal.artNr = mealAsXml.getAttribute('ARTNR');
      if (meal.artNr === '' ) {
        return;
      }
      meal.counter = mealAsXml.getAttribute('SPEISE');
      if (meal.counter.toLowerCase().indexOf('salat') >= 0) {
        return;
      }
      // parse meal data
      meal.buildingNr = mealAsXml.getAttribute('GEBNR');
      meal.description = mealAsXml.getAttribute('AUSGABETEXT');
      meal.canteen = mealAsXml.getAttribute('MENSA');
      meal.location = mealAsXml.getAttribute('ORT');
      meal.vegan = mealAsXml.getAttribute('MENUEKENNZTEXT');
      meal.additives = mealAsXml.getAttribute('ZSNUMMERN');
      meal.priceStudents = mealAsXml.getAttribute('STUDIERENDE');
      meal.priceEmployees = mealAsXml.getAttribute('BEDIENSTETE');
      meal.hints = mealAsXml.getAttribute('REZHINWEISE');
      meal.soldOut = mealAsXml.getAttribute('AUSVERKAUFT');
      this.addMealToMensa(meal, locationID);
    });
    return this.canteens;
  }

  private addMealToMensa(meal: Meal, mensaID: number) {
    // add Meal to corresponding canteen
    switch (mensaID) {
      case 310:
        this.canteens[0].addMeal(meal);
        break;
      case 312:
        this.canteens[1].addMeal(meal);
        break;
      case 370:
        this.canteens[2].addMeal(meal);
        break;
      case 425:
        this.canteens[3].addMeal(meal);
        break;
    }
  }

}
