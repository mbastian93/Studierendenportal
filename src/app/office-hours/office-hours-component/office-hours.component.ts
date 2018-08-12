import {Component, OnInit} from '@angular/core';
import {ToolbarService} from '../../toolbar.service';
import {Title} from '@angular/platform-browser';
import {OfficeHoursService} from '../office-hours.service';
import {Office, Weekday} from '../../models/office';

@Component({
  selector: 'app-office-hours',
  templateUrl: './office-hours.component.html',
  styleUrls: ['./office-hours.component.scss']
})
export class OfficeHoursComponent implements OnInit {

  private title = 'JGU Portal | Öffnungszeiten';
  offices: Office[] = [];
  weekday = Weekday;

  constructor(
    private titleService: Title,
    private toolbarService: ToolbarService,
    private officeHoursService: OfficeHoursService
  ) {
  }

  ngOnInit() {
    this.setTitle();
    this.officeHoursService.getOpeningHours().subscribe(response => {
      this.offices = this.officeHoursService.parseOpeningHours(response);
    });
  }

  private setTitle() {
    this.titleService.setTitle(this.title);
    this.toolbarService.setToolbarTitle(this.title);
  }

  getKeys(): number[] {
    return Array(7).fill('').map((x, i) => (i + 1) % 7);
  }

  printOpeningHours(office: Office, key: number): string {
    if (!office.openingHoursForDays.get(key) || !office.openingHoursForDays.get(key)[0]) {
      return 'geschlossen';
    }
    let temp = office.openingHoursForDays.get(key)[0].startTime + ' - '
      + office.openingHoursForDays.get(key)[0].endTime + 'Uhr';
    if (office.openingHoursForDays.get(key).length > 1) {
      temp += ', ' + office.openingHoursForDays.get(key)[1].startTime + ' - '
        + office.openingHoursForDays.get(key)[1].endTime + 'Uhr';
    }
    return temp;
  }
}
