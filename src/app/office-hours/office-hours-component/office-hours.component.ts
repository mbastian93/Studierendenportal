import {Component, OnInit} from '@angular/core';
import {ToolbarService} from '../../toolbar.service';
import {Title} from '@angular/platform-browser';
import {OfficeHoursService} from '../office-hours.service';
import {Office, OfficeHour, Weekday} from '../../models/office';
import {Department} from '../../models/department';

@Component({
  selector: 'app-office-hours',
  templateUrl: './office-hours.component.html',
  styleUrls: ['./office-hours.component.scss']
})
export class OfficeHoursComponent implements OnInit {

  private title = 'JGU Portal | Öffnungszeiten';
  departments: Department[];

  constructor(
    private titleService: Title,
    private toolbarService: ToolbarService,
    private officeHoursService: OfficeHoursService
  ) {
  }

  ngOnInit() {
    this.setTitle();
    this.departments = this.officeHoursService.getDepartments();
    this.departments.forEach(department => {
      this.officeHoursService.getOpeningHoursForDepartment(department).subscribe(response => {
        department.offices = this.officeHoursService.parseOpeningHours(response);
      });
    });
  }

  private setTitle() {
    this.titleService.setTitle(this.title);
    this.toolbarService.setToolbarTitle(this.title);
  }

  getDifferingDays(officeHour: OfficeHour): string {
    let  res = '';
    if (officeHour.days.length > 1) {
      res = officeHour.days[0] + ' - ' + officeHour.days[officeHour.days.length - 1];
    } else {
      res += officeHour.days[0];
    }
    return res;
  }

  printOpeningHours(officeHour: OfficeHour): string {
    const temp = officeHour.startTime + ' - '
      + officeHour.endTime + 'Uhr';
    return temp;
  }
}
