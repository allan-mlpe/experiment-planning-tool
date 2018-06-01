FROM allanmlpe/nginx

ADD dist/. /usr/share/nginx/html

#ADD cert.crt /etc/nginx/certs/cert.crt

#ADD passfile /etc/nginx/certs/passfile

#ADD cert.key /etc/nginx/certs/cert.key

ADD server.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
