---
layout: post
title:  "Getting Started with Turtlebot3 Navigation Simulation using Docker" 🐢🐳
permalink: /GettingStartedWithTurtlebot3NavigationSimulationUsingDocker/
categories: docker, rmf, ROS 2, humble, tutorial
---

This article simply captures the steps I took to run a simulated Turtlebot3 ROS2 navigation stack within an isolated Docker image. 

**Why Read This?**
If you simply want to get started **Turtlebot3** 

## **Steps**

1\. **Download** the latest docker image containing the RMF demos:

{% capture code %}{% raw %}docker pull ghcr.io/open-rmf/rmf/rmf_demos:latest
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

> To be changed.

2\. **Rename** the docker image to `rmf:latest`:

{% capture code %}{% raw %}docker tag ghcr.io/open-rmf/rmf/rmf_demos:latest rmf:latest
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

3\. **Enable** Graphic User Interface access for docker:

{% capture code %}{% raw %}
xhost +local:docker
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

> Note that this command runs a security risk and should not be used as an official deployment. For the context of research and learning, this command should be okay.

4\. **Create** a docker container from the docker image downloaded:

{% capture code %}{% raw %}
docker run -it --rm \
 --name ros2_rmf \
 --runtime=nvidia \
 -e DISPLAY=$DISPLAY \
 -v /tmp/.X11-unix:/tmp/.X11-unix \
 --net=host \
 --ipc host \
 rmf:latest /bin/bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

5\. 

## **Verify** ✅

1\. WIP

## **References**

- []()