package springsecurity.auth.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_user", uniqueConstraints=@UniqueConstraint(columnNames="email"))
@Setter
@Getter
public class User {

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
	
}
