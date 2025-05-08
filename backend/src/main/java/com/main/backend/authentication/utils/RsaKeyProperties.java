package com.main.backend.authentication.utils;

import java.security.KeyPair;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class RsaKeyProperties {

    private RSAPublicKey publicKey;
    private RSAPrivateKey privateKey;

    public RsaKeyProperties() {
        KeyPair keyPair = KeyGenerator.generateRsaKey();
        this.publicKey = (RSAPublicKey) keyPair.getPublic();
        this.privateKey = (RSAPrivateKey) keyPair.getPrivate();
    }

}
