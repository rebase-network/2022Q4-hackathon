FROM python:3.9-slim

WORKDIR /usr/app

COPY requirements.txt .
ENV PYTHONIOENCODING="utf-8"
ENV PYTHONPATH="${PYTHONPATH}:/usr/app"
RUN pip3 install -r requirements.txt

COPY config.yaml .
COPY rules ./rules

CMD python3 -m elastalert.elastalert --verbose
