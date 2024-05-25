---
layout: post
title:  "Getting Started with Turtlebot3 Navigation Simulation using Docker 🐢🐳" 
permalink: /GettingStartedWithTurtlebot3NavigationSimulationUsingDocker/
categories: docker, rmf, ROS 2, humble, tutorial
---

This article simply captures the steps I took to run a simulated Turtlebot3 ROS2 navigation stack within an isolated Docker image. 

**Why Read This?**
If you simply want to get started with **Turtlebot3 Navigation Simulation** where you have **a virtual turtlebot3 burger**, running in **turtlebot3_world** with its ROS 2 navigational stack running and allowing for autonomous navigation using `Nav2Goal` requests sent through an `RViz` window, then this is the article for you.

If this wall of text had you confused, just look at the `.gif` below:

> WIP

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
 --name ros2_turtlebot3_gazebo \
 --runtime=nvidia \
 -e DISPLAY=$DISPLAY \
 -v /tmp/.X11-unix:/tmp/.X11-unix \
 --net=host \
 --ipc host \
 rmf:latest /bin/bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

5\. **Set up** a **ROS 2** workspace:

{% capture code %}{% raw %}
cd /
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
mkdir -p turtlebot3_ws/src && cd turtlebot3_ws/src
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
git clone -b humble-devel https://github.com/ROBOTIS-GIT/turtlebot3_simulations.git --single-branch --depth 1
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
git clone -b humble-devel https://github.com/ROBOTIS-GIT/turtlebot3.git --single-branch --depth 1
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
sudo apt-get update && apt-get install ros-humble-nav2-map-server -y
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
cd /turtlebot3_ws
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
source /ros_entrypoint.sh
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
rosdep install --from-paths src --ignore-src --rosdistro=humble -y
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

6\. **Build** the **ROS 2** workspace:

{% capture code %}{% raw %}
colcon build --symlink-install
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

7\. **Set up** Gazebo models:

{% capture code %}{% raw %}
mkdir -p .gazebo/models
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
cd /turtlebot3_ws/.gazebo
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
git clone https://github.com/osrf/gazebo_models.git models --depth 1 --single-branch --branch master
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

8\. **Launch** the **Gazebo** Simulation:

{% capture code %}{% raw %}
cd /turtlebot3_ws
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
export GAZEBO_MODEL_PATH=/turtlebot3_ws/.gazebo/models:
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
source /usr/share/gazebo/setup.bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
source /turtlebot3_ws/install/setup.bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
export TURTLEBOT3_MODEL=burger
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
source install/setup.bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}


8\. **Launch** the **SLAM** Simulation to start generate the map in a new terminal:

{% capture code %}{% raw %}
docker exec -it ros2_turtlebot3_gazebo bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
source /turtlebot3_ws/install/setup.bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
export TURTLEBOT3_MODEL=burger
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
ros2 launch turtlebot3_cartographer cartographer.launch.py use_sim_time:=True
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

9\. **Run** `turtlebot3_teleop` to start moving the virtual turtlebot3 around on the map to populate the map in a new terminal:

{% capture code %}{% raw %}
docker exec -it ros2_turtlebot3_gazebo bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
source /turtlebot3_ws/install/setup.bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
export TURTLEBOT3_MODEL=burger
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
ros2 run turtlebot3_teleop teleop_keyboard
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

10\. **Save** the map by running the commands in a new terminal:

{% capture code %}{% raw %}
docker exec -it ros2_turtlebot3_gazebo bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
source /ros_entrypoint.sh
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
ros2 run nav2_map_server map_saver_cli -f /turtlebot3_ws/map
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

> This should generate map.pgm and map.yaml in `/turtlebot3_ws` file directory.

11\. **Launch** the **Navigation** Simulation to start allowing the robot to navigate autonomously in a new terminal:

{% capture code %}{% raw %}
docker exec -it ros2_turtlebot3_gazebo bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
source /turtlebot3_ws/install/setup.bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
export TURTLEBOT3_MODEL=burger
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
ros2 launch turtlebot3_navigation2 navigation2.launch.py use_sim_time:=True map:=/turtlebot3_ws/map.yaml
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

## **Verify** ✅

After completing all aformentioned steps, you should see something similar on your screen like what is shown below:



## **References**

- [Turtlebot3 SLAM Navigation](https://emanual.robotis.com/docs/en/platform/turtlebot3/slam_simulation/)
- [Turtlebot3 Navigation Simulation](https://emanual.robotis.com/docs/en/platform/turtlebot3/nav_simulation/)