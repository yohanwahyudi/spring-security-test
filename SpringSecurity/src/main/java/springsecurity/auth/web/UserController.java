package springsecurity.auth.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import springsecurity.auth.model.Role;
import springsecurity.auth.model.User;
import springsecurity.auth.service.RoleService;
import springsecurity.auth.service.SecurityService;
import springsecurity.auth.service.UserService;
import springsecurity.auth.validator.UserValidator;

@Controller
public class UserController {
	
	@Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;
    
    @Autowired
    private RoleService roleService;

    @GetMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("userForm", new User());
        model.addAttribute("roles", roleService.getAllRoles());
        
        System.out.println("roles: "+ roleService.getAllRoles());

        return "registration";
    }

    @PostMapping("/registration")
    public ModelAndView registration(@ModelAttribute("userForm") User userForm, BindingResult bindingResult, Model model) {
        userValidator.validate(userForm, bindingResult);
        
        ModelAndView mv = new ModelAndView();
        
        if (bindingResult.hasErrors()) {
        	
        	mv.addObject("roles", roleService.getAllRoles());
        	mv.setViewName("registration");
            
        	return mv;
        }

        userService.save(userForm);

        securityService.autoLogin(userForm.getUsername(), userForm.getPasswordConfirm());

        mv.setViewName("redirect:/welcome");
        
        return mv;
    }
    
    @GetMapping("/login")
    public String login(Model model, String error, String logout) {
    	
    	System.out.println("entering login controller");
    	System.out.println("error: " +error);
    	System.out.println("logout: " +logout);
    	
        if (error != null)
            model.addAttribute("error", "Your username and password is invalid.");

        if (logout != null)
            model.addAttribute("message", "You have been logged out successfully.");

        return "login";
    }

    @GetMapping({"/", "/welcome"})
    public String welcome(Model model) {
        return "welcome";
    }

    @ModelAttribute("allRoleOptions")
    public List<Role> getAllRole(){
    	return roleService.getAllRoles();
    }
}
