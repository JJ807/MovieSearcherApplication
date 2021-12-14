package movies.spring.data.neo4j.api;

import java.util.List;
import movies.spring.data.neo4j.movies.MovieDetailsDTO;
import movies.spring.data.neo4j.movies.MovieResultsDTO;
import movies.spring.data.neo4j.services.MovieService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(origins = "http://localhost:8081")

@RestController
@CrossOrigin(origins = "*")
class MovieController {

  private final MovieService movieService;

  MovieController(MovieService movieService) {
    this.movieService = movieService;
  }

  @GetMapping("/movie/{title}")
  public MovieDetailsDTO findMovieWithTitle(@PathVariable("title") String title) {
    return movieService.getDetailsOfMovieWithTitle(title);
  }

  @PostMapping("/movie/{title}/like")
  public int likeMovieWithTitle(@PathVariable("title") String title) {
    return movieService.likeMovieWithTitle(title);
  }

  @GetMapping("/searchMovie")
  List<MovieResultsDTO> searchMovie(@RequestParam("query") String title) {
    return movieService.searchMoviesByTitle(handleWildcards(title));
  }

  @GetMapping("/searchPerson")
  List<MovieResultsDTO> searchPerson(@RequestParam("query") String personName) {
    return movieService.searchMoviesByPersonName(handleWildcards(personName));
  }

  private static String handleWildcards(String title) {
    String res = title;
    if (res.startsWith("*")) {
      res = res.substring(1);
    }
    if (res.endsWith("*")) {
      res = res.substring(0, res.length() - 1);
    }
    return res;
  }
}
