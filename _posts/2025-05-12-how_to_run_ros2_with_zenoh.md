---
layout: post
title:  "How To Run ROS 2 with Zenoh DDS" 
permalink: /HowToRunROS2WithZenoh/
categories: zenoh
---

This document provides instructions on how to easily set up and use Zenoh DDS as the underlying middleware.

## **What Is Zenoh DDS?**

Zenoh is a pub/sub/query protocol that unifies data in motion, data at rest and computations. That said, one way of thinking about Zenoh is to imagine it as a data liberator protocol. Zenoh liberates data in several dimensions.

## **Why Set This Up?**

In the context of Robot Middleware Framework (RMF), it has been strongly hinted by maintainers that the Zenoh DDS will be de-facto DDS used for RMF-enabled components going forward.

For general ROS 2 development best practices, Zenoh offers a rust-based and memory-safe approach for communications between ROS 2-based applications going forward.

## **Dependencies**

- ROS 2 Jazzy

Note that Zenoh is only official supported for ROS 2 Jazzy.

## **Instructions**

To get your ROS 2 components running with Zenoh, there are 2 critical steps to do as follows:

- Start a Zenoh server.
- Ensure your custom ROS package is communicating with `RMW_IMPLEMENTATION` set to `rmw_zenoh_cpp`.


These instructions assumes that you are running on a Linux operating system such as Ubuntu:

1\. **Install** `rmw_zenoh_cpp`:
{% capture code %}{% raw %}sudo apt-get update && sudo apt-get install ros-jazzy-rmw-zenoh-cpp
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

2\. **Start** the Zenoh server:
{% capture code %}{% raw %}source /opt/ros/jazzy/setup.bash && ros2 run rmw_zenoh_cpp rmw_zenohd
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

3\. **Switch** the default DDS to `rmw_zenoh_cpp`:
{% capture code %}{% raw %}export RMW_IMPLEMENTATION=rmw_zenoh_cpp
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

3\. **Run** your ROS 2 package.

## **References**

- [rmw_zenoh](https://github.com/ros2/rmw_zenoh)
- [zenoh-plugin-ros2dds](https://github.com/eclipse-zenoh/zenoh-plugin-ros2dds)
- [What is Zenoh?](https://zenoh.io/docs/overview/what-is-zenoh/)