package springsecurity.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import springsecurity.auth.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{

}
