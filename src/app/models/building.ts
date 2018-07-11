import { Coordinates } from './coordinates';

export class Building {
  name: string;
  nickname: string;
  buildingNumber: number;
  roomCount: number;
  coordinate: Coordinates;
  defaultAddress: string;
  imageLink: string;
  id: number;

  constructor() {
    this.coordinate = new Coordinates();
  }
}
