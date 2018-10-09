import {Component, OnInit} from '@angular/core';
import {ToolbarService} from '../../toolbar.service';
import {Title} from '@angular/platform-browser';
import {OfficeHoursService} from '../office-hours.service';
import {Department} from '../../models/department';
import {OfficeHour} from '../../models/officeHour';

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

}
