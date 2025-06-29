FROM python:latest

WORKDIR /app

EXPOSE 8000

COPY requirements.txt ./

RUN apt-get update && apt-get install -y gettext

RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000", "--settings=mysite.settings.local" ]