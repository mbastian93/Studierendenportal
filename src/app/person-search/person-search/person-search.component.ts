import {Component, Input, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ToolbarService} from '../../toolbar.service';
import {PersonSearchService} from '../person-search.service';
import {Person} from '../../models/person';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.scss']
})
export class PersonSearchComponent implements OnInit {

  private title = 'JGU Portal | Personensuche';
  foundPersons: Person[];
  displayedColumns: string[] = ['Name', 'Einrichtung', 'Raum', 'Telefon', 'Fax', 'E-Mail'];
  searchName: string;
  private lastSearch = '';
  mobile: boolean;

  @Input() id: string;

  constructor(
    private titleService: Title,
    private toolbarService: ToolbarService,
    private personSearchService: PersonSearchService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.setTitle();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getPerson(id);
    } else {
      this.foundPersons = this.personSearchService.foundPersons;
    }
    // display output as table on large enough screen
    this.mobile = window.screen.width <= 768;
  }

  private setTitle() {
    // change title of toolbar and window
    this.titleService.setTitle(this.title);
    this.toolbarService.setToolbarTitle(this.title);
  }

  searchPerson(event: Event) {
    // prevent from submitting form
    event.preventDefault();
    // dont search for empty or undefined name or when the input has not changed
    if (this.searchName === undefined || this.searchName === '' || this.lastSearch === this.searchName) {
      return;
    }
    // store last searched name
    this.lastSearch = this.searchName;
    // reset found persons
    this.foundPersons.length = this.personSearchService.foundPersons.length = 0;
    // replace umlauts and other special characters before searching
    this.personSearchService.findPersons(escape(this.searchName));
  }

  getPerson(id: string) {
    this.personSearchService.getPerson(id);
    this.foundPersons = this.personSearchService.foundPersons;
  }

}
