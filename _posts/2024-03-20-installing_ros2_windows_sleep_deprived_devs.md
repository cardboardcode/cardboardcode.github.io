---
layout: post
title:  "How To Install ROS 2 on Windows for Sleep-Deprived Developers"
permalink: /InstallingROS2OnWindowsSleepyGuide/
categories: ROS 2, windows
---

![](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjdqcnM5OGdvbW5pM3E2OGJ5MjN0YnRrYnN0dzdkaDYyemM3YWgwdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/z2Sectp9SiC88/giphy.gif)

Hey. Yo. Didn't sleep much? Rushing yet another project? Same here. So let's keep things simple for both of us. 

So you want to install **ROS 2 Humble** on Windows? Great. 

##  **Copy & Paste**. That's all. 

Just copy & paste. No thinking needed. Just basic cognitive functions here.

## **Setup**

Open up a **[ Command Prompt ]** & **[ PowerShell ]** with `admin rights`.

![](/img/2024_03_20/admin_cp_powershell.png)


1\. **[ Command Prompt ]** - Install **wget**

{% capture code %}{% raw %}choco install -y wget{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

2\. **[ PowerShell ]** - Install **Chocolatey**:

{% capture code %}{% raw %}Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1')){% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

3\. **[ Command Prompt ]** - Install **Python**

{% capture code %}{% raw %}choco install -y python --version 3.8.3{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}


4\. **[ Command Prompt ]** - Install **Visual C++ Redistributables**:

{% capture code %}{% raw %}choco install -y vcredist2013 vcredist140{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

5\. **[ Command Prompt ]** - Install **OpenSSL**:

{% capture code %}{% raw %}cd %USERPROFILE%/Downloads{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}wget https://slproweb.com/download/Win64OpenSSL-1_1_1w.msi{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}setx /m OPENSSL_CONF "C:\Program Files\OpenSSL-Win64\bin\openssl.cfg"{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}setx /m PATH "%PATH%;C:\Program Files\OpenSSL-Win64\bin\"{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

6\. **[ Command Prompt ]** - Install **Visual Studio 2019**:

{% capture code %}{% raw %}choco install -y visualstudio2019community{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

![](/img/2024_03_20/visual_studio_code.png)

7\. ⚠️ **Restart** your PC to refresh environment variables before continuing.

8\. **[ Command Prompt ]** - Install **OpenCV**:

{% capture code %}{% raw %}cd %USERPROFILE%/Downloads{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}cd C:\{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}mkdir opencv{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}cd %USERPROFILE%/Downloads{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}wget https://github.com/ros2/ros2/releases/download/opencv-archives/opencv-3.4.6-vc16.VS2019.zip{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}tar xvfz opencv-3.4.6-vc16.VS2019.zip -C C:\opencv{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}setx /m OpenCV_DIR C:\opencv{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}setx /m PATH "%PATH%;C:\opencv\x64\vc16\bin"{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

9\. **[ Command Prompt ]** - Install **other dependencies**:

{% capture code %}{% raw %}choco install -y cmake{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}cd %USERPROFILE%/Downloads{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}mkdir repositories{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}cd repositories{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}wget https://github.com/ros2/choco-packages/releases/download/2022-03-15/asio.1.12.1.nupkg{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}wget https://github.com/ros2/choco-packages/releases/download/2022-03-15/bullet.3.17.nupkg{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}wget https://github.com/ros2/choco-packages/releases/download/2022-03-15/cunit.2.1.3.nupkg{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}wget https://github.com/ros2/choco-packages/releases/download/2022-03-15/eigen.3.3.4.nupkg{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}wget https://github.com/ros2/choco-packages/releases/download/2022-03-15/tinyxml-usestl.2.6.2.nupkg{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}wget https://github.com/ros2/choco-packages/releases/download/2022-03-15/tinyxml2.6.0.0.nupkg{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}cd ..{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}choco install -y -s repositories asio cunit eigen tinyxml-usestl tinyxml2 bullet{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}python -m pip install -U pip setuptools==59.6.0{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}python -m pip install -U catkin_pkg cryptography empy importlib-metadata lark==1.1.1 lxml matplotlib netifaces numpy opencv-python PyQt5 pillow psutil pycairo pydot pyparsing==2.4.7 pyyaml rosdistro{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

10\. **[ Command Prompt ]** - Install **Qt5**:

{% capture code %}{% raw %}cd %USERPROFILE%/Downloads{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}wget https://download.qt.io/archive/qt/5.12/5.12.12/qt-opensource-windows-x86-5.12.12.exe{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}call qt-opensource-windows-x86-5.12.12.exe{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

    > ⚠️
    > You will need to sign up for a login account here when installing. This is due to
    > a controversial policy change in 2020. Check out [here](https://www.qt.io/blog/qt-offering-changes-2020) for more details.

{% capture code %}{% raw %}setx /m Qt5_DIR C:\Qt\Qt5.12.12\5.12.12\msvc2017_64{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}setx /m QT_QPA_PLATFORM_PLUGIN_PATH C:\Qt\Qt5.12.12\5.12.12\msvc2017_64\plugins\platforms{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

11\. **[ Command Prompt ]** - Install **GraphViz**:

{% capture code %}{% raw %}choco install -y graphviz{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

12\. **[ Command Prompt ]** - Install **ROS 2**:

{% capture code %}{% raw %}cd %USERPROFILE%/Downloads{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}wget https://github.com/ros2/ros2/releases/download/release-humble-20240222/ros2-humble-20240222-windows-release-amd64.zip{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}mkdir dev\ros2_humble{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}cd %USERPROFILE%/Downloads{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}cd C:\{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

{% capture code %}{% raw %}tar xvfz ros2-humble-20240222-windows-release-amd64.zip -C C:\dev\ros2_humble{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}


## **Verify** 

1\. **[ Command Prompt ]** - Source the ROS 2 setup file.

{% capture code %}{% raw %}call C:\dev\ros2_humble\ros2-windows\local_setup.bat{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

2\. **[ Command Prompt ]** - Run `talker` ROS 2 node:

{% capture code %}{% raw %}ros2 run demo_nodes_cpp talker{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

3\. **[ Command Prompt ]** - Run `listener` ROS 2 node in another terminal:

{% capture code %}{% raw %}ros2 run demo_nodes_py listener{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}

4\. It should look similar to what is shown below:


    [INFO] [1711201903.525939200] [talker]: Publishing: 'Hello World: 1'
    [INFO] [1711201904.531960900] [talker]: Publishing: 'Hello World: 2'
    [INFO] [1711201905.538109400] [talker]: Publishing: 'Hello World: 3'
    [INFO] [1711201906.528078800] [talker]: Publishing: 'Hello World: 4'
    [INFO] [1711201907.534121300] [talker]: Publishing: 'Hello World: 5'
    [INFO] [1711201908.524656700] [talker]: Publishing: 'Hello World: 6'
    [INFO] [1711201909.531361100] [talker]: Publishing: 'Hello World: 7'
    [INFO] [1711201910.537687100] [talker]: Publishing: 'Hello World: 8'


    [INFO] [1711201905.595844300] [listener]: I heard: [Hello World: 3]
    [INFO] [1711201906.530543000] [listener]: I heard: [Hello World: 4]
    [INFO] [1711201907.536591800] [listener]: I heard: [Hello World: 5]
    [INFO] [1711201908.527087400] [listener]: I heard: [Hello World: 6]
    [INFO] [1711201909.533571700] [listener]: I heard: [Hello World: 7]
    [INFO] [1711201910.540949700] [listener]: I heard: [Hello World: 8]


## **Uninstall** 🔴

Run the command below to undo everything that is installed following this article:


{% capture code %}{% raw %}rmdir /s /q C:\dev\ros2_humble{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}
{% capture code %}{% raw %}rmdir /s /q C:\opencv{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}
{% capture code %}{% raw %}choco uninstall -y wget python vcredist2013 vcredist140 cmake graphviz asio cunit eigen tinyxml-usestl tinyxml2 bullet -x{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}


Remove the system environment variables that were set before:

    Qt5_DIR
    QT_QPA_PLATFORM_PLUGIN_PATH

Remove the following paths from `PATH`:

    C:\opencv\x64\vc16\bin
    C:\Program Files\OpenSSL-Win64\bin\

Run the command below to remove the installed python packages:

{% capture code %}{% raw %}python -m pip uninstall -U catkin_pkg cryptography empy importlib-metadata lark==1.1.1 lxml matplotlib netifaces numpy opencv-python PyQt5 pillow psutil pycairo pydot pyparsing==2.4.7 pyyaml rosdistro{% endraw %}{% endcapture %} {% include code.html code=code lang="batch" %}

Delete all files downloaded from `wget`:

{% capture code %}{% raw %}cd %USERPROFILE%/Downloads{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}
{% capture code %}{% raw %}del Win64OpenSSL-1_1_1w.msi{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}
{% capture code %}{% raw %}del opencv-3.4.6-vc16.VS2019.zip{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}
{% capture code %}{% raw %}rmdir /s /q repositories{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}
{% capture code %}{% raw %}del qt-opensource-windows-x86-5.12.12.exe{% endraw %}{% endcapture %}
{% include code.html code=code lang="batch" %}


## **References**

1. [Installing ROS 2 on Windows](https://docs.ros.org/en/humble/Installation/Windows-Install-Binary.html)
2. [GraphViz 10.0.1 - Chocolatey](https://community.chocolatey.org/packages/Graphviz)
3. [Qt 5.12.12](https://download.qt.io/archive/qt/5.12/5.12.12/)
4. [OpenSSL](https://www.openssl.org/source/)
5. [ROS 2 Choco Packages](https://github.com/ros2/choco-packages/releases/)
