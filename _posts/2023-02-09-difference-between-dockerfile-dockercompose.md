---
layout: post
title:  "Difference between Dockerfile and docker compose"
date:   2023-02-09 21:56:49 +0800
categories: docker
---

**Dockerfile** and `docker compose` are two different tools used in building and managing Docker containers.

A **Dockerfile** is a script that contains instructions on how to build a Docker image. It specifies the base image to use, the dependencies to install, and any custom configurations or settings to be applied. Once the Dockerfile is created, you can use the docker build command to build the Docker image.

`docker compose`, on the other hand, is a tool for defining and running multi-container Docker applications. It uses a `.yml` file to define the services, networks, and volumes used by the application, and the configuration options for each service. With `docker compose`, you can start, stop, and manage all the services defined in the `.yml` file with a single command.

## When To Use What?

Generally speaking, if you want to **create a single Docker container**, you would use a **Dockerfile**. If you have a complex application that consists of multiple containers and services, you would use `docker compose`. `docker compose` makes it easier to manage and organize complex applications, as you can **define all the services in one place, and start and stop all of them at once**.

## Example using Dockerfile

### Verify



## Example using `docker compose`


### Verify