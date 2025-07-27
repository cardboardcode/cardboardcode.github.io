---
layout: post
title:  "How To Set Up BehaviourTree.CPP v3.8.7 API Documentation"
permalink: /HowToSetUpBehaviourTreeCPPv3APIDocs/
categories: behaviour-tree, robotics, api, documentations
---

Here are quick instructions on how to generate and access the API documentation of **BehaviourTree.CPP** v`3.8.7` which is the last **V3** released in ROS 1 Noetic.

## **Why?**

While there is plenty online documentation available for **BehaviourTree.CPP V4**, documentation for **V3** has since been deprecated, along **ROS 1 Noetic Ninjemys** which reached End-Of-Life (EOL) in May 2025.

Documentation on the official [BehaviourTree.CPP](https://www.behaviortree.dev/) website is now focused on V4 and does not provide necessary exact API documentations for V3.

Even though each release of [BehaviourTree.CPP](https://github.com/BehaviorTree/BehaviorTree.CPP) is accompanied with a `Doxyfile` that allows for automatic API documentation generation. It is not as straightforward as to directly use it given that the sources and outputs defined in its root `Doxyfile` are hardcoded to non-existent directories.

Therefore, modifications have been made and instructions are provided to allow for an easier access to V3 API documentations.


## **Steps**

1\. **Download** modified v`3.8.7` BehaviourTree.CPP:

{% capture code %}{% raw %} git clone https://github.com/cardboardcode/BehaviorTree.CPP.git --branch v3/docs_fix --depth 1 --single-branch && cd BehaviorTree.CPP
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

2\. **Build** the API Doxygen Documentations:

{% capture code %}{% raw %} doxygen Doxyfile
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

3\. **View** the API Doxygen Documentations

{% capture code %}{% raw %} xdg-open ./output_doc/html/index.html >/dev/null 2>&1 &
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

## **References**

- [BehaviourTree.CPP](https://github.com/BehaviorTree/BehaviorTree.CPP)
- [BehaviourTree.CPP Official Documentations](https://www.behaviortree.dev/)
- [BehaviourTree.CPP V4 API Documentations](https://www.behaviortree.dev/)
- [ROS 1 Noetic Ninjemys goes End-of-Life 2025-05-31](https://www.ros.org/blog/noetic-eol/)