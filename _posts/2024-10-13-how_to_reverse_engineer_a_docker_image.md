---
layout: post
title:  "How To Reverse Engineer A Docker Image" 
permalink: /HowToReverseEngineerADockerImage/
categories: docker, 
---

This article aims to provide easily accessible commands you could use to understand underlying docker base images: 

## **Why**

To determine verified ways of building docker images more efficiently from restrictive docker images.

## **Instructions**

{% capture code %}{% raw %}docker history --format "{{.CreatedBy}}" <docker_image_name> --no-trunc | tac{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

## **References**

- [Generating a Dockerfile From an Image](https://www.baeldung.com/ops/dockerfile-image-generate)