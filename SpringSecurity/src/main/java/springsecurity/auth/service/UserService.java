package springsecurity.auth.service;

import springsecurity.auth.model.User;

public interface UserService {
	
	void save(User user);
	User findByUsername(String username);

}
