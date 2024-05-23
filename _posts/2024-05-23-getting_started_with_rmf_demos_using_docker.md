---
layout: post
title:  "Getting Started with RMF Demos using Docker"
permalink: /GettingStartedWithRMFDemosUsingDocker/
categories: docker, rmf, ROS 2, humble, tutorial
---

This article is aimed at **providing its own standalone but supplementary information** to existing documentations regarding Open Robotics's Robot Middleware Framework (**RMF**).

While the documentation of RMF is comprehensive, readers or developers may still encounter confusion trying to getting an immediate first-hand experience on RMF and how it works by simply following it due to several ambiguous portion of Open Robotic's instructions. Therefore, by writing this article, a relatively more fool-proof method of getting started with RMF Demos can be achieved for any new ROS 2 developers working with the award-winning open-source software.

> Eg. In its suggestion for the use of `rocker` (https://github.com/open-rmf/rmf), it did not specify what command to run to get any of the demos running while not worrying about adhering to necessary environment dependencies. As a result, readers like me are left wondering what other actions need to be taken to simply get started. Furthermore, the instructions to get started using DOcker has the codebase running headless without graphical form which defeats the purpose of getting started and understanding when none can be visualised by anyone following the document.

## **Steps**

1\. **Download** the latest docker image containing the RMF demos:

{% capture code %}{% raw %}docker pull ghcr.io/open-rmf/rmf/rmf_demos:latest
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

> Caution: This instruction will take a while depending on your internet and local workstation. Grab a coffee or do something else while you wait. 

2\. **Rename** the docker image to `rmf:latest`:

{% capture code %}{% raw %}docker tag ghcr.io/open-rmf/rmf/rmf_demos:latest rmf:latest
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

3\. Enable Graphic User Interface access for docker:

{% capture code %}{% raw %}
xhost +local:docker
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

> Note that this command runs a security risk and should not be used as an official deployment. For the context of research and learning, this command should be okay.

4\. Create a docker container from the docker image downloaded:

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

5\. Launch `rmf_demos_gz_classic` ROS 2 package:

{% capture code %}{% raw %}ros2 launch rmf_demos_gz_classic hotel.launch.xml
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

6\. Open the following link in your browser to access the RMF Panel which you can use to send requests to robots in simulation:

**Link**: [https://open-rmf.github.io/rmf-panel-js/](https://open-rmf.github.io/rmf-panel-js/)

## **Verify** ✅

1\. Download `hotel_tasks.json` using the command below:

{% capture code %}{% raw %}wget https://github.com/open-rmf/rmf_demos/blob/main/rmf_demos_panel/task_lists/hotel_tasks.json
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

2\. Upload `hotel_tasks.json` to RMF Panel:

![](/img/2024_05_23/upload_hotel_tasks.jpg)

3\. Upon uploading, you should then see `tinyrobot_1` robot in Gazebo moving. 

![](/img/2024_05_23/tinybot_1_actions_rmf_hotel_spedup.gif)

## **References**

- [Root repository for the RMF software](https://github.com/open-rmf/rmf)
- [Demonstrations of the OpenRMF software](https://github.com/open-rmf/rmf_demos?tab=readme-ov-file)