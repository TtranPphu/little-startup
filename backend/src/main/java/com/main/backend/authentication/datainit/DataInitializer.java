package com.main.backend.authentication.datainit;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.main.backend.authentication.models.Role;
import com.main.backend.authentication.repositories.RoleRepo;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private RoleRepo roleRepo;

    @Override
    public void run(String... args) throws Exception {
        setupRolesTables();

        System.out.println("[[[ DONE! ]]] Initial Data Loaded!");
    }

    private void setupRolesTables() {
        insertRoleIfNotExists("ADMIN");
        insertRoleIfNotExists("LEARNER");
        insertRoleIfNotExists("TUTOR");
    }

    private void insertRoleIfNotExists(String roleName) {
        if (!roleRepo.existsByAuthority(roleName)) {
            roleRepo.save(new Role(null, roleName));
        }
    }
}
