FROM nginx:latest

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/

# Copy SSL certificate and key
COPY ./ssl_certificate.crt /etc/ssl/certs/ssl_certificate.crt
COPY ./ssl_certificate_key.key /etc/ssl/private/ssl_certificate_key.key

# Expose HTTPS port
EXPOSE 443
