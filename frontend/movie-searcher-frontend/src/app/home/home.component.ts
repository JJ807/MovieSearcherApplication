import {Component, OnInit, Output} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {forkJoin, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

const API_SEARCH_MOVIE_URL = 'https://movie-searcher-application.herokuapp.com:37036/searchMovie';
const API_SEARCH_PERSON_URL = 'https://movie-searcher-application.herokuapp.com:37036/searchPerson';
const API_MOVIE_URL = 'https://movie-searcher-application.herokuapp.com:37036/movie';


export interface Person {
  name: string;
  job: string;
  role: string | null;
}

export interface BasicMovieInfo {
  title: string;
  tagline: string;
  released: number;
  likes: number;
}

export interface MovieWithCast {
  title: string;
  cast: Array<Person>;
}

export interface WholeMovieInfo {
  title?: string;
  tagline?: string;
  released?: number;
  likes?: number;
  cast?: Array<Person>;
}

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output()
  movies: WholeMovieInfo[] = [];
  @Output()
  titlePreviouslySearched = '';
  searchNotTried = true;

  @Output()
  personMovies: BasicMovieInfo[] = [];
  @Output()
  personPreviouslySearched = '';
  personSearchNotTried = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  }

  getMovies(formData: { search: string }): void {
    this.titlePreviouslySearched = formData.search;
    const isWhitespace = (formData.search || '').trim().length === 0;
    const isValid = !isWhitespace;
    if (!isValid) {
      this.searchNotTried = false;
      return;
    }

    this.movies = [];
    const httpParams = new HttpParams().set('query', formData.search);
    this.http.get<any>(API_SEARCH_MOVIE_URL, {params: httpParams}).subscribe((data: any) => {
      this.searchNotTried = false;
      if (!data || data.length === 0) {
        return;
      }
      let promises = new Array<Observable<any>>();
      let basicMovieInfos: BasicMovieInfo[] = [];
      data.forEach((response: any) => {
        basicMovieInfos.push(response.movie);
        promises.push(this.showMovieObservable(response.movie.title));
      });
      this.processPromises(promises, basicMovieInfos);
    })
  }

  private showMovieObservable(movieTitle: string): Observable<any> {
    return this.http.get<any>(`${API_MOVIE_URL}/${movieTitle}`);
  }

  private processPromises(promises: Array<Observable<any>>, basicMovieInfos: BasicMovieInfo[]) {
    forkJoin(promises).pipe(
      catchError(error => of(error)))
    .subscribe((moviesWithCast: MovieWithCast[]) => {
      moviesWithCast.forEach((movieWithCast: MovieWithCast, index: number) => {
        this.movies.push({
          title: basicMovieInfos[index].title,
          tagline: basicMovieInfos[index].tagline,
          released: basicMovieInfos[index].released,
          likes: basicMovieInfos[index].likes,
          cast: movieWithCast.cast
        });
      });
    });
  }

  getPersonMovies(formData: { search: string }) {
    this.personPreviouslySearched = formData.search;
    const isWhitespace = (formData.search || '').trim().length === 0;
    const isValid = !isWhitespace;
    if (!isValid) {
      this.personSearchNotTried = false;
      return;
    }
    this.personMovies = [];
    const httpParams = new HttpParams().set('query', formData.search);
    this.http.get<any>(API_SEARCH_PERSON_URL, {params: httpParams}).subscribe((data: any) => {
      this.personSearchNotTried = false;
      if (!data || data.length === 0) {
        return;
      }
      data.forEach((response: any) => {
        this.personMovies.push(response.movie);
      });
    })
  }
}
