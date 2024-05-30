---
layout: post
title:  "Getting Started with LinoRobot2 Navigation Simulation using Docker 🐳" 
permalink: /GettingStartedWithLinoRobot2NavigationSimulationUsingDocker/
categories: docker, ROS 2, humble, tutorial
---

This article simply captures the steps I took to **run a simulated LinoRobot ROS2 navigation stack** within an isolated Docker image. 

## **Why Read This?**

![](/img/2024_05_27/linorobot_simulation_spedup.gif)

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

{% capture code %}{% raw %}
cd /
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
mkdir -p linorobot2_ws/src && cd linorobot2_ws/src
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
git clone -b humble https://github.com/linorobot/linorobot2 --single-branch --depth 1
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

6\. **Build** the **ROS 2** workspace:

{% capture code %}{% raw %}
cd /linorobot2_ws
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
rosdep update && rosdep install --from-path src --ignore-src -y --skip-keys microxrcedds_agent --skip-keys micro_ros_agent
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
colcon build
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

7\. **Set up** Gazebo models:

{% capture code %}{% raw %}
cd /linorobot2_ws
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
mkdir -p .gazebo/models
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
cd /linorobot2_ws/.gazebo
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
git clone https://github.com/osrf/gazebo_models.git models --depth 1 --single-branch --branch master
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
cd /linorobot2_ws/.gazebo/models && rm -r .git README.md .gitignore CMakeLists.txt LICENSE check_install.bash database.config.in manifest.xml.in
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

8\. **Launch** the **Gazebo** Simulation:

{% capture code %}{% raw %}
cd /linorobot2_ws
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
export GAZEBO_MODEL_PATH=/linorobot2_ws/.gazebo/models:
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
source /usr/share/gazebo/setup.bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
source /linorobot2_ws/install/setup.bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
export LINOROBOT2_BASE=2wd
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
export GAZEBO_MDOEL_PATH=/root/linorobot_ws/.gazebo/models:
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
source install/setup.bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
ros2 launch linorobot2_gazebo gazebo.launch.py
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

![](/img/2024_05_27/gazebo_simulation_linorobot2.png)

8\. **Launch** the **SLAM** Simulation to start generate the map in **a new terminal**:

{% capture code %}{% raw %}
docker exec -it ros2_turtlebot3_gazebo bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
source /linorobot2_ws/install/setup.bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
export LINOROBOT2_BASE=2wd
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
ros2 launch linorobot2_navigation slam.launch.py rviz:=true sim:=true
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

9\. **Run** `teleop_twist_keyboard` to start moving the virtual **LinoRobot2** around on the map to populate the map in **a new terminal**:

{% capture code %}{% raw %}
docker exec -it ros2_linorobot2_gazebo bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
source /linorobot2_ws/install/setup.bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
export LINOROBOT2_BASE=2wd
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
ros2 run teleop_twist_keyboard teleop_twist_keyboard
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

10\. **Save** the map by running the commands in **a new terminal**:

{% capture code %}{% raw %}
docker exec -it ros2_linorobot2_gazebo bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
source /ros_entrypoint.sh
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
ros2 run nav2_map_server map_saver_cli -f playground_selfmade --ros-args -p save_map_timeout:=10000.
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

11\. **Launch** the **Navigation** Simulation to start allowing the robot to navigate autonomously in **a new terminal**:

{% capture code %}{% raw %}
docker exec -it ros2_linorobot2_gazebo bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
source /linorobot2_ws/install/setup.bash
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
export LINOROBOT2_BASE=2wd
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}
ros2 launch linorobot2_navigation navigation.launch.py rviz:=true sim:=true
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

## **Verify** ✅

After completing all aformentioned steps, you should see something similar on your screen like what is shown below:

When sending a **Nav2 Goal** request via `RViz`, you should see the following:
![](/img/2024_05_27/linorobot_simulation_spedup.gif)

> The virtual linorobot2 should then start navigating to the new destination in **Gazebo**:

## **References**

- [LinoRobot2 GitHub Repository](https://github.com/linorobot/linorobot2)