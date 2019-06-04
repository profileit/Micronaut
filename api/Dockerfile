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

RUN mn --version

# # FLASK API
RUN add-apt-repository ppa:jonathonf/python-3.6
RUN apt-get install -y python-pip python-dev build-essential
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["app.py"]