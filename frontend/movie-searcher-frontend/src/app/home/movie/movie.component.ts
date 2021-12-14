import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WholeMovieInfo} from "../home.component";
import {HttpClient} from "@angular/common/http";

const API_VOTE_URL = 'https://movie-searcher-application.herokuapp.com/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @Input()
  movie: WholeMovieInfo = {};

  @Input()
  titlePreviouslySearched = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  @Output()
  myEvent = new EventEmitter<any>();

  callParent() {
    this.myEvent.emit({search: this.titlePreviouslySearched});
  }

  likeMovie() {
    this.http.post(`${API_VOTE_URL}/${this.movie.title}/like`, () => {
    }).subscribe(() => {
      this.callParent();
    });
  }
}
