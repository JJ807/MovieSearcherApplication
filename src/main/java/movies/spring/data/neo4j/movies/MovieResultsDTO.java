package movies.spring.data.neo4j.movies;

import java.util.Objects;

public class MovieResultsDTO {

  private final Movie movie;

  public MovieResultsDTO(Movie movie) {
    this.movie = movie;
  }

  public Movie getMovie() {
    return movie;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    MovieResultsDTO that = (MovieResultsDTO) o;
    return Objects.equals(movie, that.movie);
  }

  @Override
  public int hashCode() {
    return Objects.hash(movie);
  }
}
