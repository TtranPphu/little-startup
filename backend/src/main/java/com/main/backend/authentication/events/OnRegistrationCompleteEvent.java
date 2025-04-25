package com.main.backend.authentication.events;

import java.util.Locale;

import org.springframework.context.ApplicationEvent;

import com.main.backend.authentication.models.User;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class OnRegistrationCompleteEvent extends ApplicationEvent {

    private User user;
    private Locale locale;
    private String appUrl;

    public OnRegistrationCompleteEvent(User user, Locale locale, String appUrl) {
        super(user);
        
        this.user = user;
        this.locale = locale;
        this.appUrl = appUrl;
    }
}
