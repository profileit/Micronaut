FROM ubuntu:18.04
RUN apt-get update
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get -qq -y install curl unzip zip jq

# Install Nginx and Node
RUN apt-get install -y nginx
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt install -y nodejs

# APP
COPY ./ /app
WORKDIR /app
RUN npm install
RUN npm run build
RUN rm /var/www/html/index.nginx-debian.html
RUN cp -a build/. /var/www/html/

CMD ["nginx", "-g", "daemon off;"]