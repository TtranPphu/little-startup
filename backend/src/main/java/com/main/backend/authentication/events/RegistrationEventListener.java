package com.main.backend.authentication.events;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

import com.main.backend.authentication.models.User;
import com.main.backend.authentication.services.VerificationTokenService;

@Component
public class RegistrationEventListener implements ApplicationListener<OnRegistrationCompleteEvent> {
    
    @Autowired
    private VerificationTokenService verificationTokenService;
 
    @Autowired
    private MailSender mailSender;

    @Override
    @SuppressWarnings("null")
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        this.confirmRegistration(event);
    }

    private void confirmRegistration(OnRegistrationCompleteEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        verificationTokenService.createVerificationToken(user, token);
        
        String recipientAddress = user.getEmail();
        String subject = "Registration Confirmation";
        String confirmationUrl = event.getAppUrl() + "/api/auth/v1/verification?token=" + token;
        
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText("Click on this to activate your account: " + confirmationUrl);
        mailSender.send(email);
    }
}
