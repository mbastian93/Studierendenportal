import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ToolbarService} from '../../toolbar.service';
import {LibraryIdService} from '../library-id.service';

@Component({
  selector: 'app-library-id',
  templateUrl: './library-id.component.html',
  styleUrls: ['./library-id.component.scss']
})
export class LibraryIdComponent implements OnInit {

  private title = 'JGU Portal | Bibliotheksausweis';
  format = 'ITF14';
  libraryId = '1234567890123';

  constructor(
    private titleService: Title,
    private toolbarService: ToolbarService,
    private libraryIdService: LibraryIdService) { }

  ngOnInit() {
    this.setTitle();
    // this.libraryIdService.getLibraryId().subscribe( response => this.libraryId = response.own[0]);
  }

  private setTitle() {
    this.titleService.setTitle(this.title);
    this.toolbarService.setToolbarTitle(this.title);
  }
}
