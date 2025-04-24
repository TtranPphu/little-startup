package com.main.backend.authentication.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "little_roles")
public class Role implements GrantedAuthority {

    @Id
    private String roleId;
    private String authority;

    @Override
    public String getAuthority() {
        return authority;
    }

}
