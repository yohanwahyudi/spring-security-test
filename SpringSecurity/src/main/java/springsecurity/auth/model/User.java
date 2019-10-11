package springsecurity.auth.model;

import java.util.Collection;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_user", uniqueConstraints=@UniqueConstraint(columnNames="email"))
@Setter
@Getter
public class User implements UserDetails{

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String password;

    @Transient
    private String passwordConfirm;
    
    private String email;
    
    private String loginType; //LDAP user, internal user
    
    private boolean isEnabled;

    @ManyToMany
    private Set<Role> roles;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return getRoles();
	}

	@Override
	public boolean isAccountNonExpired() {
		
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		
		return true;
	}
	
}
