---
layout: post
title:  "How To Reverse Engineer A Docker Image" 
permalink: /posts/2024/10/13/how_to_reverse_engineer_a_docker_image/
redirect_from:
  - "/HowToReverseEngineerADockerImage/"
categories: docker, 
---

> [!NOTE]
> This article provides easily accessible commands to inspect underlying Docker base images, aiming to determine verified ways of building Docker images more efficiently from restrictive ones.

## **Instructions** 📘

**Run** command below to retrieve the build history of a Docker image, formatting each step by who created it without truncating any lines.
{% capture code %}{% raw %}docker history --format "{{.CreatedBy}}" <docker_image_name> --no-trunc | tac{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

**Run** command below to export a running docker container as a `.zip` file:
{% capture code %}{% raw %}docker export <docker_container_name/id> > latest.tar
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

## **References**

- [Generating a Dockerfile From an Image](https://www.baeldung.com/ops/dockerfile-image-generate)
