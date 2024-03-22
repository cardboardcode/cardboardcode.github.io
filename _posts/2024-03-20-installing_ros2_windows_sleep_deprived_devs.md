---
layout: post
title:  "How To Install ROS 2 on Windows for Sleep-Deprived Developers"
date:   2024-03-20 20:27:49 +0800
categories: ROS 2, windows
---


Hey. Yo. Didn't sleep much? Rushing yet another project? Same here. So let's keep things simple for both of us. 

So you want to install **ROS 2 Humble** on Windows? Great. 

**Copy & Paste**. That's all. 

Just copy & paste. No thinking needed. Just basic cognitive functions here.

## **Setup**

Open up a **[ Command Prompt ]** & **[ PowerShell ]** with `admin rights`.

![](/img/2024_03_20/admin_cp_powershell.png)

1. **[ Command Prompt ]** - Install **wget**

    ```batch
    choco install -y wget
    ```

2. **[ PowerShell ]** - Install **Chocolatey**:

    ```batch
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    ```

3. **[ Command Prompt ]** - Install **Python**

    ```batch
    choco install -y python --version 3.8.3
    ```


4. **[ Command Prompt ]** - Install **Visual C++ Redistributables**:

    ```batch
    choco install -y vcredist2013 vcredist140
    ```

5. **[ Command Prompt ]** - Install **OpenSSL**:

    ```batch
    wget https://slproweb.com/download/Win64OpenSSL-1_1_1w.msi
    ```

    ```batch
    setx /m OPENSSL_CONF "C:\Program Files\OpenSSL-Win64\bin\openssl.cfg"
    ```

    ```batch
    setx /m PATH "%PATH%;C:\Program Files\OpenSSL-Win64\bin\"
    ```

6. **[ Command Prompt ]** - Install **Visual Studio 2019**:

    ```batch
    choco install -y visualstudio2019community
    ```

    ![](/img/2024_03_20/visual_studio_code.png)

7. Restart your PC to refresh environment variables before continuing.

8. **[ Command Prompt ]** - Install **OpenCV**:

    ```batch
    cd %USERPROFILE%/Downloads
    ```

    ```batch
    wget https://github.com/ros2/ros2/releases/download/opencv-archives/opencv-3.4.6-vc16.VS2019.zip
    ```

    ```batch
    cd C:\
    ```

    ```batch
    mkdir opencv
    ```

    ```batch
    cd %USERPROFILE%/Downloads
    ```

    ```batch
    expand -f opencv-3.4.6-vc16.VS2019.zip /D C:\opencv
    ```

    ```batch
    setx /m OpenCV_DIR C:\opencv
    ```

    ```batch
    setx /m PATH "%PATH%;C:\opencv\x64\vc16\bin"
    ```

9. **[ Command Prompt ]** - Install **other dependencies**:


    ```batch
    choco install -y cmake
    ```

    ```batch
    mkdir repositories
    ```

    ```batch
    cd repositories
    ```

    ```batch
    wget https://github.com/ros2/choco-packages/releases/download/2022-03-15/asio.1.12.1.nupkg
    ```

    ```batch
    wget https://github.com/ros2/choco-packages/releases/download/2022-03-15/bullet.3.17.nupkg
    ```

    ```batch
    wget https://github.com/ros2/choco-packages/releases/download/2022-03-15/cunit.2.1.3.nupkg
    ```

    ```batch
    wget https://github.com/ros2/choco-packages/releases/download/2022-03-15/eigen.3.3.4.nupkg
    ```

    ```batch
    wget https://github.com/ros2/choco-packages/releases/download/2022-03-15/tinyxml-usestl.2.6.2.nupkg
    ```

    ```batch
    wget https://github.com/ros2/choco-packages/releases/download/2022-03-15/tinyxml2.6.0.0.nupkg
    ```

    ```batch
    cd ..
    ```

    ```batch
    choco install -y -s repositories asio cunit eigen tinyxml-usestl tinyxml2 bullet
    ```

    ```batch
    python -m pip install -U pip setuptools==59.6.0
    ```

    ```batch
    python -m pip install -U catkin_pkg cryptography empy importlib-metadata lark==1.1.1 lxml matplotlib netifaces numpy opencv-python PyQt5 pillow psutil pycairo pydot pyparsing==2.4.7 pyyaml rosdistro
    ```

10. **[ Command Prompt ]** - Install **Qt5**:

    ```batch
    wget https://download.qt.io/archive/qt/5.12/5.12.12/qt-opensource-windows-x86-5.12.12.exe
    ```

    ```batch
    setx /m Qt5_DIR C:\Qt\Qt5.12.12\5.12.12\msvc2017_64
    ```

    ```batch
    setx /m Qt5_DIR C:\Qt\Qt5.12.12\5.12.12\msvc2017_64
    ```

    ```batch
    setx /m QT_QPA_PLATFORM_PLUGIN_PATH C:\Qt\Qt5.12.12\5.12.12\msvc2017_64\plugins\platforms
    ```

11. **[ Command Prompt ]** - Install **GraphViz**:

    ```batch
    choco install -y graphviz
    ```

12. **[ Command Prompt ]** - Install **ROS 2**:

    ```batch
    cd %USERPROFILE%/Downloads
    ```

    ```batch
    wget https://github.com/ros2/ros2/releases/download/release-humble-20240222/ros2-humble-20240222-windows-release-amd64.zip
    ```

    ```batch
    cd C:\
    ```

    ```batch
    mkdir dev\ros2_humble
    ```

    ```batch
    cd %USERPROFILE%/Downloads
    ```

    ```batch
    expand -f ros2-humble-20240222-windows-release-amd64.zip /D C:\dev\ros2_humble
    ```


## **Verify**

1. **[ Command Prompt ]** - Source the ROS 2 setup file.
    ```batch
    call C:\dev\ros2_humble\local_setup.bat
    ```

2. **[ Command Prompt ]** - Run `talker` ROS 2 node:

    ```batch
    ros2 run demo_nodes_cpp talker
    ```

3. **[ Command Prompt ]** - Run `listener` ROS 2 node:

    ```batch
    ros2 run demo_nodes_py listener
    ```

## **References**

1. [Windows (binary)](https://docs.ros.org/en/humble/Installation/Windows-Install-Binary.html)
