package movies.spring.data.neo4j.movies;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node
public class Movie {

  @Id
  private final String title;

  private final String tagline;

  private Integer released;

  private Long likes;

  public Movie(String title, String tagline) {
    this.title = title;
    this.tagline = tagline;
  }

  public String getTitle() {
    return title;
  }

  public String getTagline() {
    return tagline;
  }

  public Integer getReleased() {
    return released;
  }

  public Long getLikes() {
    return likes;
  }

  public void setReleased(Integer released) {
    this.released = released;
  }

  public void setLikes(Long likes) {
    this.likes = likes;
  }
}
