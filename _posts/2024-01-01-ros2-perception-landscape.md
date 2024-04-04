---
layout: post
title:  "ROS2 Perception Landscape At A Glance [ Ongoing ] 🧿"
permalink: /ROS2PerceptionLandscapeAtAGlance/
categories: ros2, perception, computer vision
---

This article focuses on the **ongoing ROS2 ecosystem of perception-related packages**. 

Going beyond the archived [awesome-ros2](https://github.com/fkromer/awesome-ros2/), this article aims to provide an experimental platform that provides relevant information about a repository upfront so that ROS2 developers can **make better decisions of software adoption quicker**.  

## **Applications** ⚙️

| [vision_opencv](https://github.com/ros-perception/vision_opencv/tree/ros2) | Packages for interfacing **ROS2** with **OpenCV**. |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/ros-perception/vision_opencv"> | [![GitHub last commit](https://img.shields.io/github/last-commit/ros-perception/vision_opencv.svg?style=flat)]() |

| [lidarslam_ros2](https://github.com/rsasaki0109/lidarslam_ros2) | ROS2 package of **3D lidar slam** using ndt/gicp registration and pose-optimization. |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/rsasaki0109/lidarslam_ros2">  | [![GitHub last commit](https://img.shields.io/github/last-commit/rsasaki0109/lidarslam_ros2.svg?style=flat)]() |

| [easy_perception_deployment](https://github.com/ros-industrial/easy_perception_deployment) | Package that accelerates **training** and **deployment** of Computer Vision models for industries. |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/ros-industrial/easy_perception_deployment"> | [![GitHub last commit](https://img.shields.io/github/last-commit/ros-industrial/easy_perception_deployment.svg?style=flat)]() |

| [darknet_ros](https://github.com/leggedrobotics/darknet_ros/tree/ros2) | ROS2 wrapper for deploying Darknet's **YOLO** Computer Vision model. |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/leggedrobotics/darknet_ros"> | [![GitHub last commit](https://img.shields.io/github/last-commit/leggedrobotics/darknet_ros.svg?style=flat)]() |

| [openrobotics_darknet_ros](https://github.com/ros2/openrobotics_darknet_ros/tree/ros2) | ROS 2 interface to darknet, an open source neural network library.  |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/ros2/openrobotics_darknet_ros"> | [![GitHub last commit](https://img.shields.io/github/last-commit/ros2/openrobotics_darknet_ros.svg?style=flat)]() |

| [ros2_openvino_toolkit](https://github.com/intel/ros2_openvino_toolkit) | ROS2 wrapper for CV API of **OpenVINO™** (human vision emulation). |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/intel/ros2_openvino_toolkit"> | [![GitHub last commit](https://img.shields.io/github/last-commit/intel/ros2_openvino_toolkit.svg?style=flat)]() |

| [apriltag_ros](https://github.com/christianrauch/apriltag_ros) | ROS2 node for **AprilTag** detection. |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/christianrauch/apriltag_ros"> | [![GitHub last commit](https://img.shields.io/github/last-commit/christianrauch/apriltag_ros.svg?style=flat)]() |

| [image_pipeline](https://github.com/ros-perception/image_pipeline) | Package that **bridges** between getting raw images from a camera driver and higher-level vision processing. |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/ros-perception/image_pipeline"> | [![GitHub last commit](https://img.shields.io/github/last-commit/ros-perception/image_pipeline.svg?style=flat)]() |

| [laser_filters](https://github.com/ros-perception/laser_filters) | Assorted **filters** designed to operate on **2D planar laser scanners**, which use the sensor_msgs/LaserScan type |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/ros-perception/laser_filters"> | [![GitHub last commit](https://img.shields.io/github/last-commit/ros-perception/laser_filters.svg?style=flat)]() |

| [laser_geometry](https://github.com/ros-perception/laser_geometry) | Provides the LaserProjection class for **turning laser scan data into point clouds**.  |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/ros-perception/laser_geometry"> | [![GitHub last commit](https://img.shields.io/github/last-commit/ros-perception/laser_geometry.svg?style=flat)]() |

| [perception_pcl](https://github.com/ros-perception/perception_pcl) | **PCL** (Point Cloud Library) ROS interface stack  |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/ros-industrial/easy_perception_deployment"> | [![GitHub last commit](https://img.shields.io/github/last-commit/ros-perception/perception_pcl.svg?style=flat)]() |

| [image_common](https://github.com/ros-perception/image_common) | Common code for working with images in ROS  |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/ros-perception/image_common"> | [![GitHub last commit](https://img.shields.io/github/last-commit/ros-perception/image_common.svg?style=flat)]() |

| [image_transport_plugins](https://github.com/ros-perception/image_transport_plugins) | A set of plugins for **publishing** and **subscribing** to **sensor_msgs/Image** topics in representations other than raw pixel data.   |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/ros-perception/image_transport_plugins"> | [![GitHub last commit](https://img.shields.io/github/last-commit/ros-perception/image_transport_plugins.svg?style=flat)]() |

## **Camera Drivers** 📷

| [realsense-ros](https://github.com/IntelRealSense/realsense-ros) | **Intel**(R) **RealSense**(TM) ROS Wrapper for Depth Camera |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/IntelRealSense/realsense-ros"> | [![GitHub last commit](https://img.shields.io/github/last-commit/IntelRealSense/realsense-ros.svg?style=flat)]() |

[![Contributors over time](https://contributor-graph-api.apiseven.com/contributors-svg?chart=contributorOverTime&repo=IntelRealSense/realsense-ros)](https://www.apiseven.com/en/contributor-graph?chart=contributorOverTime&repo=IntelRealSense/realsense-ros)


| [ensenso/ros_driver](https://github.com/ensenso/ros_driver) | Official ROS driver for **Ensenso** stereo cameras. |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/ensenso/ros_driver"> | [![GitHub last commit](https://img.shields.io/github/last-commit/ensenso/ros_driver.svg?style=flat)]() |


[![Contributors over time](https://contributor-graph-api.apiseven.com/contributors-svg?chart=contributorOverTime&repo=ensenso/ros_driver)](https://www.apiseven.com/en/contributor-graph?chart=contributorOverTime&repo=ensenso/ros_driver)


| [zed-ros2-wrapper](https://github.com/stereolabs/zed-ros2-wrapper) | ROS 2 wrapper for the **ZED** SDK  |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/stereolabs/zed-ros2-wrapper"> | [![GitHub last commit](https://img.shields.io/github/last-commit/stereolabs/zed-ros2-wrapper.svg?style=flat)]() |

[![Contributors over time](https://contributor-graph-api.apiseven.com/contributors-svg?chart=contributorOverTime&repo=stereolabs/zed-ros2-wrapper)](https://www.apiseven.com/en/contributor-graph?chart=contributorOverTime&repo=stereolabs/zed-ros2-wrapper)

## **Lidar Drivers** 📷

| [pf_lidar_ros2_driver](https://github.com/PepperlFuchs/pf_lidar_ros2_driver) | ROS2 driver for **Pepperl+Fuchs R2000** and **R2300 laser scanners**  |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/PepperlFuchs/pf_lidar_ros2_driver"> | [![GitHub last commit](https://img.shields.io/github/last-commit/PepperlFuchs/pf_lidar_ros2_driver.svg?style=flat)]() |

[![Contributors over time](https://contributor-graph-api.apiseven.com/contributors-svg?chart=contributorOverTime&repo=PepperlFuchs/pf_lidar_ros2_driver)](https://www.apiseven.com/en/contributor-graph?chart=contributorOverTime&repo=PepperlFuchs/pf_lidar_ros2_driver)

| [sick_scan_xd](https://github.com/SICKAG/sick_scan_xd) | ROS2 driver for **SICK lidars laser scanners**  |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/SICKAG/sick_scan_xd"> | [![GitHub last commit](https://img.shields.io/github/last-commit/SICKAG/sick_scan_xd.svg?style=flat)]() |

[![Contributors over time](https://contributor-graph-api.apiseven.com/contributors-svg?chart=contributorOverTime&repo=SICKAG/sick_scan_xd)](https://www.apiseven.com/en/contributor-graph?chart=contributorOverTime&repo=SICKAG/sick_scan_xd)

| [sick_scan_xd](https://github.com/SICKAG/sick_scan_xd) | ROS2 driver for **SICK lidars laser scanners**  |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/SICKAG/sick_scan_xd"> | [![GitHub last commit](https://img.shields.io/github/last-commit/SICKAG/sick_scan_xd.svg?style=flat)]() |

[![Contributors over time](https://contributor-graph-api.apiseven.com/contributors-svg?chart=contributorOverTime&repo=SICKAG/sick_scan_xd)](https://www.apiseven.com/en/contributor-graph?chart=contributorOverTime&repo=SICKAG/sick_scan_xd)

| [ros2_ouster_drivers](https://github.com/ros-drivers/ros2_ouster_drivers) | ROS2 driver for **Ouster OS-0, OS-1, and OS-2 Lidars**  |
|:----------|:----------|
| <img src="https://m3-markdown-badges.vercel.app/stars/3/2/ros-drivers/ros2_ouster_drivers"> | [![GitHub last commit](https://img.shields.io/github/last-commit/ros-drivers/ros2_ouster_drivers.svg?style=flat)]() |

[![Contributors over time](https://contributor-graph-api.apiseven.com/contributors-svg?chart=contributorOverTime&repo=ros-drivers/ros2_ouster_drivers)](https://www.apiseven.com/en/contributor-graph?chart=contributorOverTime&repo=ros-drivers/ros2_ouster_drivers)

## **References**
1. [awesome-ros2](https://github.com/fkromer/awesome-ros2/)
2. [A List of ROS 2 Supported Sensors for Robots](https://www.theconstruct.ai/list-ros2-supported-sensors-for-robots/)
3. [ros-drivers](https://github.com/ros-drivers)