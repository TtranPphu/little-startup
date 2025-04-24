package com.main.backend.authentication.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Document(collection = "little_users")
@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String id;

    private String email;
    private String username;
    private String password;

}
