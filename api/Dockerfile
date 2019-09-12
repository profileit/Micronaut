FROM ubuntu:18.04
RUN apt-get update
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get -qq -y install curl unzip zip jq
# Install SDKMAN and Micronaut
RUN apt-get install -y default-jdk
RUN curl -s https://get.sdkman.io | bash
RUN chmod a+x "$HOME/.sdkman/bin/sdkman-init.sh"
RUN source "$HOME/.sdkman/bin/sdkman-init.sh"
COPY config /root/.sdkman/etc/config
COPY mn.sh /mn.sh
RUN bash -c "./mn.sh"

# API
RUN apt-get install -y python-pip python-dev build-essential
COPY ./ /api
WORKDIR /api
RUN pip install -r requirements.txt

ENTRYPOINT ["python"]
CMD ["hello.py"]