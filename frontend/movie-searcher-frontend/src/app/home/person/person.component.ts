import {Component, Input, OnInit} from '@angular/core';
import {BasicMovieInfo} from "../home.component";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input()
  personMovies: BasicMovieInfo[] = [];

  @Input()
  personPreviouslySearched = '';

  constructor() { }

  ngOnInit(): void {
  }

  changeSource(event: any) {
    event.target.src = "../../../assets/posters/not-found.jpg";
  }

}
