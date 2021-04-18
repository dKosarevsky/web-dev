FROM nginx

RUN mkdir static
COPY /static/ /static/
COPY /service_1/app/static/ /static/service_1/
COPY /service_2/app/static/ /static/service_2/
COPY nginx.conf /etc/nginx/nginx.conf
COPY fullchain.pem /etc/letsencrypt/live/api.domain.com/fullchain.pem
COPY privkey.pem /etc/letsencrypt/live/api.domain.com/privkey.pem
COPY options-ssl-nginx.conf /etc/letsencrypt/options-ssl-nginx.conf
COPY ssl-dhparams.pem /etc/letsencrypt/ssl-dhparams.pem
COPY localhost.crt /etc/nginx/ssl/localhost.crt
COPY localhost.key /etc/nginx/ssl/localhost.key
