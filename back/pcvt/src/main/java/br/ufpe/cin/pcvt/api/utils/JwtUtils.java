package br.ufpe.cin.pcvt.api.utils;

import br.ufpe.cin.pcvt.api.models.Credentials;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.util.Calendar;
import java.util.Date;

public class JwtUtils {

    private static final Integer TOKEN_LIFETIME = 1;
    private static final String SECRET_PHRASE = "Hello World PCVT";

    public static String buildToken(Credentials credentials) {

        SignatureAlgorithm algorithm = SignatureAlgorithm.HS512;

        Date now = new Date();

        Calendar expires = Calendar.getInstance();
        expires.add(Calendar.DAY_OF_MONTH, TOKEN_LIFETIME);

        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SECRET_PHRASE);
        SecretKeySpec key = new SecretKeySpec(apiKeySecretBytes, algorithm.getJcaName());

        JwtBuilder builder = Jwts.builder()
            .setIssuedAt(now)
            .setIssuer(credentials.getEmail())
            .signWith(algorithm, key)
            .setExpiration(expires.getTime());

        return builder.compact();
    }

    public static Claims validateToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_PHRASE))
                    .parseClaimsJws(token).getBody();

            return claims;
        } catch (Exception e) {
            throw e;
        }
    }
}
