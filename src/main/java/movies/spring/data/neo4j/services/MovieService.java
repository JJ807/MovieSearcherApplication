package movies.spring.data.neo4j.services;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import movies.spring.data.neo4j.movies.CastMemberDTO;
import movies.spring.data.neo4j.movies.MovieDetailsDTO;
import movies.spring.data.neo4j.movies.MovieResultsDTO;
import movies.spring.data.neo4j.repositories.MovieRepository;
import org.neo4j.driver.types.TypeSystem;
import org.springframework.data.neo4j.core.DatabaseSelectionProvider;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

  private final MovieRepository movieRepository;

  private final Neo4jClient neo4jClient;

  private final DatabaseSelectionProvider databaseSelectionProvider;

  MovieService(MovieRepository movieRepository,
      Neo4jClient neo4jClient,
      DatabaseSelectionProvider databaseSelectionProvider) {

    this.movieRepository = movieRepository;
    this.neo4jClient = neo4jClient;
    this.databaseSelectionProvider = databaseSelectionProvider;
  }

  public MovieDetailsDTO getDetailsOfMovieWithTitle(String title) {
    return this.neo4jClient
        .query("" +
            "MATCH (movie:Movie {title: $title}) " +
            "OPTIONAL MATCH (person:Person)-[r]->(movie) " +
            "WHERE TOLOWER(movie.title) CONTAINS TOLOWER($title) " +
            "WITH movie, COLLECT({ name: person.name, job: REPLACE(TOLOWER(TYPE(r)), '_in', ''), role: HEAD(r.roles) }) as cast "
            +
            "RETURN movie { .title, cast: cast }"
        )
        .in(database())
        .bindAll(Map.of("title", title))
        .fetchAs(MovieDetailsDTO.class)
        .mappedBy(this::toMovieDetails)
        .one()
        .orElse(null);
  }

  public int likeMovieWithTitle(String title) {
    return this.neo4jClient
        .query("MATCH (m:Movie {title: $title}) " +
            "WITH m, coalesce(m.likes, 0) AS currentVotes " +
            "SET m.likes = currentVotes + 1;")
        .in(database())
        .bindAll(Map.of("title", title))
        .run()
        .counters()
        .propertiesSet();
  }

  public List<MovieResultsDTO> searchMoviesByTitle(String title) {
    return this.movieRepository.findMoviesByTitle(title)
        .stream()
        .map(MovieResultsDTO::new)
        .collect(Collectors.toList());
  }

  public List<MovieResultsDTO> searchMoviesByPersonName(String personName) {
    return this.movieRepository.findMoviesByPerson(personName)
        .stream()
        .map(MovieResultsDTO::new)
        .collect(Collectors.toList());
  }

  private String database() {
    return databaseSelectionProvider.getDatabaseSelection().getValue();
  }

  private MovieDetailsDTO toMovieDetails(TypeSystem ignored, org.neo4j.driver.Record record) {
    var movie = record.get("movie");
    return new MovieDetailsDTO(
        movie.get("title").asString(),
        movie.get("cast").asList((member) -> {
          var result = new CastMemberDTO(
              member.get("name").asString(),
              member.get("job").asString()
          );
          var role = member.get("role");
          if (role.isNull()) {
            return result;
          }
          return result.withRole(role.asString());
        })
    );
  }
}
