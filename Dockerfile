FROM ubuntu:16.04
RUN apt-get update
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get -qq -y install curl unzip zip
# Install SDKMAN and Micronaut
RUN apt-get install -y default-jdk
RUN curl -s https://get.sdkman.io | bash
RUN chmod a+x "$HOME/.sdkman/bin/sdkman-init.sh"
RUN source "$HOME/.sdkman/bin/sdkman-init.sh"
RUN bash -c ". /root/.sdkman/bin/sdkman-init.sh && sdk install micronaut"

# Install Nginx and Node
RUN apt-get install -y nginx
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt install -y nodejs

# APP
COPY ./app /app
WORKDIR /app
RUN npm install
RUN npm run build
RUN rm /var/www/html/index.nginx-debian.html
RUN cp -a build/. /var/www/html/

# API
RUN apt-get install -y python-pip python-dev build-essential
COPY ./api /api
WORKDIR /api
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["hello.py"]