import {Component, OnInit} from '@angular/core';
import {Building} from '../../models/building';
import {Coordinates} from '../../models/coordinates';
import {MapService} from '../map.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

// imports for map

// import * as ol from 'openlayers';

import { Map, View, Feature } from 'ol';
import OSM from 'ol/source/OSM';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat } from 'ol/proj';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  buildings: Building[];
  filteredBuildings: Observable<Building[]>;
  ctrl: FormControl = new FormControl();
  private myMap: Map;
  // define style for marker
  private markerStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      color: [183, 28, 28, 1],
      opacity: 0.75,
      src: 'assets/icons/map-marker.png'
    })
  });
  private markerSource = new VectorSource({});

  constructor(
    private mapService: MapService
  ) {
  }

  ngOnInit() {
    this.getBuildings();
    this.initMap();
  }

  getBuildings() {
    this.mapService.getBuildingsList()
      .subscribe(res => {
        this.buildings = res;
        // initialize filtering of buildings after fetching them
        this.filteredBuildings = this.ctrl.valueChanges
          .pipe(
            startWith(''),
            map(name => this._filterBuildings(name))
          );
      });
  }

  initMap() {
    // init map and center ~ at campus
    this.myMap = new Map({
      layers: [
        new TileLayer({
          source: new OSM // Base Layer with tiles
        }),
        new VectorLayer({
          source: this.markerSource // Vector Layer for marker
        })
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([8.2411, 49.9923], 'EPSG:3857'),
        zoom: 16
      })
    });
  }

  centerMap(coordinate: Coordinates, event: any) {
    // return when no location is selected
    if (!event.source.selected) {
      return;
    }
    // center map at building
    this.myMap.setView(new View({
      center: fromLonLat([coordinate.longitude, coordinate.latitude], 'EPSG:3857'),
      zoom: 19
    }));

    // create new marker for building
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat([coordinate.longitude, coordinate.latitude], 'EPSG:3857'))
    });
    iconFeature.setStyle(this.markerStyle);
    // clear layer and add new Marker
    this.markerSource.clear();
    this.markerSource.addFeature(iconFeature);
  }

  private _filterBuildings(name: string): Building[] {
    // only suggest buildings whose name or nickname begins with same substring
    const filterValue = name.toLowerCase();

    return this.buildings.filter((building) => building.name.toLowerCase().startsWith(filterValue)
      || (building.nickname && building.nickname.toLowerCase().startsWith(filterValue)));
  }

}

