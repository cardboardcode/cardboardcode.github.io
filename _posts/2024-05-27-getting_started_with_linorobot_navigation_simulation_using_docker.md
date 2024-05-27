---
layout: post
title:  "Getting Started with LinoRobot2 Navigation Simulation using Docker 🐳" 
permalink: /GettingStartedWithLinoRobot2NavigationSimulationUsingDocker/
categories: docker, ROS 2, humble, tutorial
---

This article simply captures the steps I took to **run a simulated LinoRobot ROS2 navigation stack** within an isolated Docker image. 

## **Why Read This?**



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
 --name ros2_linorobot2_gazebo \
 --runtime=nvidia \
 -e DISPLAY=$DISPLAY \
 -v /tmp/.X11-unix:/tmp/.X11-unix \
 --net=host \
 --ipc host \
 rmf:latest /bin/bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

5\. **Set up** a **ROS 2** workspace:

> WIP

6\. **Build** the **ROS 2** workspace:

{% capture code %}{% raw %}
colcon build --symlink-install
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

7\. **Launch** the **Gazebo** Simulation:


8\. **Launch** the **SLAM** Simulation to start generate the map in a new terminal:

9\. **Run** `turtlebot3_teleop` to start moving the virtual turtlebot3 around on the map to populate the map in a new terminal:

10\. **Save** the map by running the commands in a new terminal:

11\. **Launch** the **Navigation** Simulation to start allowing the robot to navigate autonomously in a new terminal:

## **Verify** ✅

> WIP

## **References**

- [LinoRobot2 GitHub Repository](https://github.com/linorobot/linorobot2)
- []()