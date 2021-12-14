package movies.spring.data.neo4j.movies;

import java.util.Objects;

public class CastMemberDTO {

    private final String name;

    private final String job;

    private final String role;

    public CastMemberDTO(String name, String job) {
        this(name, job, null);
    }

    CastMemberDTO(String name, String job, String role) {
        this.name = name;
        this.job = job;
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public String getJob() {
        return job;
    }

    public String getRole() {
        return role;
    }

    public CastMemberDTO withRole(String role) {
        return new CastMemberDTO(this.name, this.job, role);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CastMemberDTO that = (CastMemberDTO) o;
        return Objects.equals(name, that.name) && Objects.equals(job, that.job) && Objects.equals(role, that.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, job, role);
    }
}
