package com.main.backend.authentication.models;

import java.util.Collection;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.main.backend.authentication.dtos.UserDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "little_users")
public class User implements UserDetails {

    @Id
    private String userId;

    @Indexed(unique = true)
    private String username;

    private String password;

    private String email;

    private boolean enable;

    // @ManyToMany(fetch = FetchType.EAGER)
    // @JoinTable(name = "user_role_junction", joinColumns = { @JoinColumn(name = "user_id") }, inverseJoinColumns = {
    //         @JoinColumn(name = "role_id") })
    private Set<Role> roles;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        // This one is for the feature where users have to verify the email to enable the account
        return true;
    }

    public UserDto getDto() {
        return new UserDto(username, email);
    }
}
