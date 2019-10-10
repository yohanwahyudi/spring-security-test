package springsecurity.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import springsecurity.auth.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	User findByUsername(String username);
}
