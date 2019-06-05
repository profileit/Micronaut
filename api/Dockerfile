FROM xqdocker/ubuntu-openjdk:jdk-8

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt update
RUN apt install wget unzip git -y
RUN git --version

RUN wget https://services.gradle.org/distributions/gradle-5.0-bin.zip -P /tmp
RUN unzip -d /opt/gradle /tmp/gradle-*.zip
RUN ls /opt/gradle/gradle-5.0
RUN export GRADLE_HOME=/opt/gradle/gradle-5.0
RUN export PATH=${GRADLE_HOME}/bin:${PATH}

RUN git clone https://github.com/micronaut-projects/micronaut-core.git
RUN cd micronaut-core && ./gradlew cli:fatJar
ENV PATH="$PATH:/micronaut-core/cli/build/bin"

# # FLASK API
RUN apt update && apt install python3-pip -y
RUN pip3 install --upgrade pip
COPY . /srv/flask_app
WORKDIR /srv/flask_app

RUN apt-get clean && apt-get -y update
RUN apt-get -y install nginx && apt-get -y install python3-dev && apt-get -y install build-essential

RUN pip install -r requirements.txt --src /usr/local/src

COPY nginx.conf /etc/nginx
RUN chmod +x ./start.sh
CMD ["./start.sh"]


# COPY . /app
# WORKDIR /app
# RUN pip3 install -r requirements.txt
# ENV LANG C.UTF-8
# ENV LC_ALL C.UTF-8
# # ENTRYPOINT ["flask", "run"]
# ENTRYPOINT [ "waitress-serve --call 'flaskr:create_app'" ]