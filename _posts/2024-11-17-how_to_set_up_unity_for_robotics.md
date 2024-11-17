---
layout: post
title:  "How To Set Up Unity for Robotics" 
permalink: /HowToSetUpUnityForRobotics/
categories: docker, unity
---

This tutorial runs you through how to quickly a Unity project that interacts with ROS.

## **Instructions**

{% capture code %}{% raw %}cd $HOME
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}git clone --recurse-submodules https://github.com/Unity-Technologies/Unity-Robotics-Hub.git
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}cd Unity-Robotics-Hub/tutorials/pick_and_place
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}git submodule update --init --recursive
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}docker build -t unity-robotics:pick-and-place -f docker/Dockerfile .
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}docker run -it --rm -p 10000:10000 unity-robotics:pick-and-place /bin/bash -c "roslaunch niryo_moveit part_3.launch"
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

## **References**

- [Pick-and-Place Tutorial: Quick Demo by Unity Technologies](https://github.com/Unity-Technologies/Unity-Robotics-Hub/blob/main/tutorials/pick_and_place/quick_demo.md)