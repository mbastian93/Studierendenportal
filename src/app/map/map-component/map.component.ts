import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Building} from '../../models/building';
import {Coordinates} from '../../models/coordinates';
import {ToolbarService} from '../../toolbar.service';
import {MapService} from '../map.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {MatOptionSelectionChange} from '@angular/material';
import {map, startWith} from 'rxjs/operators';


// imports for map
import {Map, View, Overlay, Feature, MapBrowserPointerEvent} from 'ol';
import OSM from 'ol/source/OSM';
import {Icon, Style} from 'ol/style';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import Coordinate from 'ol/coordinate';

import * as ol from 'openlayers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  private title = 'JGU Portal | Campus-Karte';
  private buildings: Building[];
  filteredBuildings: Observable<Building[]>;
  ctrl: FormControl = new FormControl();
  focusedBuilding: Building;
  showAddress = false;
  private myMap: Map;
  private popupOverlay: Overlay;
  @ViewChild('popup') popup: ElementRef;
  // define style for marker(
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
    private titleService: Title,
    private toolbarService: ToolbarService,
    private mapService: MapService
  ) {
  }

  ngOnInit() {
    this.getBuildings();
    this.setTitle();
  }

  private getBuildings() {
    this.mapService.getBuildingsList()
      .subscribe(res => {
        this.buildings = res;
        // initialize filtering of buildings after fetching them
        this.filteredBuildings = this.ctrl.valueChanges
          .pipe(
            startWith(''),
            map(buildingName => this.filterBuildings(buildingName))
          );
      });
  }

  private filterBuildings(name: string): Building[] {
    // only suggest buildings whose name or nickname begins with same substring
    const filterValue = name.toLowerCase();

    return this.buildings.filter((building) => building.name.toLowerCase().startsWith(filterValue)
      || (building.nickname && building.nickname.toLowerCase().startsWith(filterValue)));
  }

  private setTitle() {
    this.titleService.setTitle(this.title);
    this.toolbarService.setToolbarTitle(this.title);
  }

  ngAfterViewInit() {
    // init map and ~ center at campus
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
    // create overlay for address box and add it to map
    this.popupOverlay = new Overlay({
      element: this.popup.nativeElement,
      positioning: 'bottom-left',
      stopEvent: false,
      position: this.myMap.getView().getCenter()
    });
    this.myMap.addOverlay(this.popupOverlay as ol.Overlay);

    // hide/show address depending on zoom level
    this.myMap.getView().on('change:resolution', () => {
      if (this.myMap.getView().getZoom() < 17) {
        this.showAddress = false;
      } else if (this.myMap.getView().getZoom() >= 17) {
        this.showAddress = true;
      }
    });
  }

  centerMapAtBuilding(building: Building, event: MatOptionSelectionChange ) {
    // return when no location is selected
    if (!event.source.selected) {
      return;
    }
    this.showAddress = true;
    this.focusedBuilding = building;
    const coordinates: Coordinates = this.focusedBuilding.coordinate;
    // update view and center map at building
    this.myMap.getView().setCenter(fromLonLat([coordinates.longitude, coordinates.latitude], 'EPSG:3857'));
    this.myMap.getView().setZoom(19);

    // position address box on the right side of the map's center
    const newCoordinates: Coordinate = this.myMap.getView().getCenter();
    newCoordinates[0] += 15;
    this.popupOverlay.setPosition(newCoordinates as ol.Coordinate);
    // create new marker for building and define style
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat([coordinates.longitude, coordinates.latitude], 'EPSG:3857')),
      name: this.focusedBuilding.defaultAddress
    });
    iconFeature.setStyle(this.markerStyle);
    // clear layer and add new Marker
    this.markerSource.clear();
    this.markerSource.addFeature(iconFeature);
  }


}

