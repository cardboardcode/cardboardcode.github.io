---
layout: post
title:  "A ROS 2 Developer's Survival Kit 🧰"
permalink: /ROS2DevSurvivalKit/
categories: ROS 2
---

This is collation of publicly-accessible resources I used as a ROS 2 developer who has worked on industrial projects in the past.
These resources not only allowed me to achieve what is required at work, it also helped reduce frustrations during the tedium of development.

##  **Documentations**

1\. **General Documentation** - Essential for understanding ROS 2.

`Link`: [https://docs.ros.org/en/humble/index.html](https://docs.ros.org/en/humble/index.html)

2\. **3rd-Party ROS 2 Resource Curation List** - Useful for knowing what open-source ROS 2 packages are out there.

`Link`: [https://github.com/fkromer/awesome-ros2](https://github.com/fkromer/awesome-ros2)

3\. **ROS 2  Distributions** - Useful to understand the general roadmap of ROS 2.

`Link` : [https://docs.ros.org/en/humble/Releases.html](https://docs.ros.org/en/humble/Releases.html)

4\. **How To Guides** - Useful for exploring different types of implement you may need for your projects.

`Link` : [https://docs.ros.org/en/humble/How-To-Guides.html](https://docs.ros.org/en/humble/How-To-Guides.html)

5\. **Open Source Licenses** - Useful for understanding the licenses applied to different ROS 2 packages in the ecosystem

`Link` : [https://opensource.org/licenses](https://opensource.org/licenses)

## **Tool**

1\. **Colcon Build Tool** - Essential cli tool for building ROS 2 packages

`Link`: [https://colcon.readthedocs.io/en/released/index.html](https://colcon.readthedocs.io/en/released/index.html)

    > ⚠️
    > ROS 2 does not automatically build colcon tools which is required for building basic ROS 2 packages. 
    > Use the link above for instructions to install. 

2\. **Visual Studio Code** - Useful GUI application for writing code.

`Link` : [https://code.visualstudio.com/docs/setup/linux](https://code.visualstudio.com/docs/setup/linux)

    > Install Plugin: [https://marketplace.visualstudio.com/items?itemName=ms-iot.vscode-ros](https://marketplace.visualstudio.com/items?itemName=ms-iot.vscode-ros)

3\. **VNC Docker for ROS 2** - Useful automatic environment setup tool to get started using ROS 2:

`Link` : [https://github.com/Tiryoh/docker-ros2-desktop-vnc](https://github.com/Tiryoh/docker-ros2-desktop-vnc)

4\. **act** - Useful for running GitHub Action locally before commiting to cloud.

`Link`: [https://github.com/nektos/act](https://github.com/nektos/act)

5\. **ROS 2 Dockers** - Useful for Continuous Integration concerning ROS and environment standardization among team developers.

`Link`: [https://hub.docker.com/_/ros/](https://hub.docker.com/_/ros/)

6\. **gdb** - Useful for debugging runtime errors.

`Link`: [https://sourceware.org/gdb/](https://sourceware.org/gdb/)
`Link`: [https://devguide.python.org/development-tools/gdb/](https://devguide.python.org/development-tools/gdb/) - For python debugging
`Link`: [https://github.com/reveng007/GDB-Cheat-Sheet](https://github.com/reveng007/GDB-Cheat-Sheet) - A cheat sheet for using gdb.

7\. **vim** - Useful for editing code on the fly and with lighweight software.

`Link`: [https://github.com/cardboardcode/quick_vim](https://github.com/cardboardcode/quick_vim)

7\. **nano** - Useful for editing code in Docker containers with built-in lighweight software.

`Link`: [https://github.com/cardboardcode/quick_nano](https://github.com/cardboardcode/quick_nano)

## **Code**

1\. **Code Examples for Exploration** - Useful for exploring different types of implement you may need for your projects.

`Link`: [https://github.com/ros2/demos](https://github.com/ros2/demos)
`Link` : [https://github.com/ros2/examples](https://github.com/ros2/examples)
`Link` : [https://github.com/IntelligentSystemsLabUTV/ros2-examples](https://github.com/IntelligentSystemsLabUTV/ros2-examples)
`Link` : [https://github.com/mikeferguson/ros2_cookbook](https://github.com/mikeferguson/ros2_cookbook)

2\. **Industrial Standard GitHub Action Workflow** - Useful for integrating industrial-standard static and dynamic analysis via Continuous Integration via GitHub Action.

`Link` : [https://github.com/ros-industrial/industrial_ci](https://github.com/ros-industrial/industrial_ci)

3\. **RMF Demos** - Useful for getting started quickly with `OpenRMF`.

`Link`: [https://github.com/open-rmf/rmf_demos](https://github.com/open-rmf/rmf_demos)

## **Programming Languages**

- [Bash](https://www.gnu.org/software/bash/)
- [C++](https://cplusplus.com/)
- [Python](https://www.python.org/)
- [Markdown](https://www.markdownguide.org/)

