package movies.spring.data.neo4j.repositories;

import movies.spring.data.neo4j.movies.Movie;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends Repository<Movie, String> {

	@Query("MATCH (movie:Movie) WHERE TOLOWER(movie.title) CONTAINS TOLOWER($title) RETURN movie ORDER BY movie.title")
	List<Movie> findMoviesByTitle(@Param("title") String title);

	@Query("MATCH (person:Person WHERE TOLOWER(person.name) = TOLOWER($personName))-[:ACTED_IN]->(personMovies) RETURN person,personMovies")
	List<Movie> findMoviesByPerson(@Param("personName") String personName);
}
