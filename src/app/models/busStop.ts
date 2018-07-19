import { Coordinates } from './coordinates';
import {DepartureBoard} from './departureBoard';

export class BusStop {
  id: number;
  name: string;
  coordinate: Coordinates;
  departureBoard: DepartureBoard;
}
