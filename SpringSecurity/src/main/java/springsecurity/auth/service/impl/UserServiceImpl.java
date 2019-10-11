package springsecurity.auth.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import springsecurity.auth.model.Role;
import springsecurity.auth.model.User;
import springsecurity.auth.repository.RoleRepository;
import springsecurity.auth.repository.UserRepository;
import springsecurity.auth.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	public void save(User user) {
		
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		
		Set<Role> roles = user.getRoles();
		
		System.out.println("userserviceimpl...");
		roles.forEach(x -> {
			System.out.println(x.getName());
		});
		
		user.setRoles(roles);
		userRepository.save(user);
	}

	@Override
	public User findByUsername(String username) {
		
		return userRepository.findByUsername(username);
	}

}
