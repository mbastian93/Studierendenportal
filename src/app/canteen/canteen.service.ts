import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Canteen} from '../models/canteen';
import {Meal} from '../models/meal';


const proxy = 'https://cors-anywhere.herokuapp.com/';
// const proxy = 'https://crossorigin.me/';
const url = 'https://www.studierendenwerk-mainz.de/speiseplan/Speiseplan.xml';

@Injectable({
  providedIn: 'root'
})
export class CanteenService {

  canteens: Canteen[] = [];
  private domParser: DOMParser = new DOMParser();

  // check if given date is i future of current day
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

  fetchCanteenPlans() {
    if (this.canteens.length > 0) {
      return;
    }
    this.http.get(url, {responseType: 'text'})
      .toPromise()
      .then(response => {
        this.parseCanteenPlan(response);
      });
  }

  parseCanteenPlan(CanteenPlan: string) {
    const ts = Date.now();
    this.canteens[0] = new Canteen('Hauptlager Zentralmensa');
    this.canteens[1] = new Canteen('Mens@ria');
    this.canteens[2] = new Canteen('Mensa Georg Forster');
    this.canteens[3] = new Canteen('Café Rewi');
    const doc = this.domParser.parseFromString(CanteenPlan, 'text/xml');
    const meals = Array.from(doc.getElementsByTagName('ROW')) as Element[];
    meals.forEach(mealAsXml => {
      const meal = new Meal();
      meal.date = mealAsXml.getAttribute('DATUM');
      // discard meals served on past days
      if (!CanteenService.checkDate(meal.date)) {
        return;
      }
      const locationID = +mealAsXml.getAttribute('VERBRAUCHSORT');
      if ([310, 312, 370, 425].indexOf(locationID) < 0) {
        // discard meals not served on campus
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
  }

  getCanteenPlans(): Canteen[] {
    return this.canteens;
  }

  private addMealToMensa(meal: Meal, mensaID: number) {
    switch (mensaID) {
      case 310:
        this.canteens[0].meals.push(meal);
        if (this.canteens[0].days.indexOf(meal.date) < 0) {
          this.canteens[0].days.push(meal.date);
        }
        break;
      case 312:
        this.canteens[1].meals.push(meal);
        if (this.canteens[1].days.indexOf(meal.date) < 0) {
          this.canteens[1].days.push(meal.date);
        }
        break;
      case 370:
        this.canteens[2].meals.push(meal);
        if (this.canteens[2].days.indexOf(meal.date) < 0) {
          this.canteens[2].days.push(meal.date);
        }
        break;
      case 425:
        this.canteens[3].meals.push(meal);
        if (this.canteens[3].days.indexOf(meal.date) < 0) {
          this.canteens[3].days.push(meal.date);
        }
        break;
    }
  }

}
