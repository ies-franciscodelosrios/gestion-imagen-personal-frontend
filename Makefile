# Levanta la arquitectura
file_selected := -f docker-compose.$(env).yml
environment := $(env)

install: build tag_image push_dockerhub

build:
	@docker build -t frontend .

tag_image:
	@docker tag frontend juanfran21/iestablero:latest

push_dockerhub:
	@docker push juanfran21/iestablero:latest
