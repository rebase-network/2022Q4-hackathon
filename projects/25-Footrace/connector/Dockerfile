FROM docker.elastic.co/logstash/logstash:8.5.3

RUN rm -f /usr/share/logstash/pipeline/logstash.conf
#COPY pipeline/ /usr/share/logstash/pipeline/
#COPY config/ /usr/share/logstash/config/

WORKDIR /usr/share/logstash/

RUN rm -f ./config/logstash-sample.conf
COPY --chown=1000 config/logstash.yml ./config/logstash.yml
COPY --chown=1000 config/pipelines.yml ./config/pipelines.yml
COPY --chown=1000 src/ ./src/
