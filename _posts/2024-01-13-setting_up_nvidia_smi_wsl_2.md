---
layout: post
title:  "Setting up nvidia-smi on WSL 2"
permalink: /SettingUpNvidiaSMIonWSL2/
categories: nvidia
---


This article provides an ultra-simplified guide to settign up nvidia-smi in `WSL 2` on Windows Operating System.

## **Why Install `nvidia-smi` on WSL 2**

**WSL 2** allows Windows user to run Linux applications alongside and interact with other Windows-based programs on Windows operating system. If such applications requires acceleration using Nvidia Graphical Processing Units (GPU), setting up `nvidia-smi` is a must.

## **Installing `WSL 2`**

1. Run the following command in terminal, **running with administrative privileges**:

> ℹ️ Note that the installation requires a minimum of 20.2 GB.

{% capture code %}{% raw %}# Install WSL 2 and Ubuntu
wsl.exe --install{% endraw %}{% endcapture %} {% include code.html code=code lang="batch" %}
{% capture code %}{% raw %}# Update WSL 2 to latest version
wsl.exe --update{% endraw %}{% endcapture %} {% include code.html code=code lang="batch" %}

### **Verify**
You should see the following successful terminal output:

```bash
...
Installing: Windows Subsystem for Linux
Windows Subsystem for Linux has been installed.
Installing: Windows Subsystem for Linux
Windows Subsystem for Linux has been installed.
Installing: Ubuntu
Ubuntu has been installed.
The requested operation is successful. Changes will not be effective until the system is rebooted. 
...
```

2. Restart PC to allow WSL 2 to take effect.

3. Run the following command in terminal, **running with administrative privileges**:

{% capture code %}{% raw %}# Update WSL 2 to latest version
wsl.exe --update{% endraw %}{% endcapture %} {% include code.html code=code lang="batch" %}
{% capture code %}{% raw %}# Unregister the distribution to avoid the following error [3].
wsl --unregister Ubuntu{% endraw %}{% endcapture %} {% include code.html code=code lang="batch" %}

### **Verify**
You should see the following successful terminal output:

```bash
Checking for updates.
Updating Windows Subsystem for Linux to version: X.X.XX.
```

## **Installing `nvidia-smi`**

1. Once you are done installing `WSL 2`, open the `Ubuntu` Desktop app. A Ubuntu bash terminal should appear.

Set your username and password, following instructions in terminal.

2. Run the following commands in the Ubuntu terminal:

> ℹ️ The commands below uses the example of downloading *CUDA Toolkit 12.3*, as of this writing. The runfile is 4.07 GB.

{% capture code %}{% raw %}# Remove old GPG key. For the reason, please refer to [1]
sudo apt-get update{% endraw %}{% endcapture %} {% include code.html code=code lang="bash" %}
{% capture code %}{% raw %}sudo apt-key del 7fa2af80{% endraw %}{% endcapture %} {% include code.html code=code lang="bash" %}
{% capture code %}{% raw %}# Get the runfile from official Nvidia download site
wget https://developer.download.nvidia.com/compute/cuda/12.3.2/local_installers/cuda_12.3.2_545.23.08_linux.run{% endraw %}{% endcapture %} {% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}# Install gcc required for Nvidia CUDA Toolkit
sudo apt-get update && apt-get install build-essential{% endraw %}{% endcapture %} {% include code.html code=code lang="bash" %}

{% capture code %}{% raw %} Run the runfile and follow instructions in terminal to fully download
sudo sh cuda_12.3.2_545.23.08_linux.run{% endraw %}{% endcapture %} {% include code.html code=code lang="bash" %}

# Export PATH and LD_LIBRARY_PATH
{% capture code %}{% raw %}export PATH=$PATH:/usr/local/cuda-12.3/bin:{% endraw %}{% endcapture %} {% include code.html code=code lang="bash" %}
{% capture code %}{% raw %}export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda-12.3/lib64:{% endraw %}{% endcapture %} {% include code.html code=code lang="bash" %}

### **Verification**
You should see a similar output as shown below:

```bash
Sat Jan 13 14:41:21 2024
+---------------------------------------------------------------------------------------+
| NVIDIA-SMI 535.104.07             Driver Version: 537.34       CUDA Version: 12.2     |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
|                                         |                      |               MIG M. |
|=========================================+======================+======================|
|   0  NVIDIA GeForce RTX 3060 ...    On  | 00000000:01:00.0  On |                  N/A |
| N/A   52C    P8              11W /  85W |    111MiB /  6144MiB |      1%      Default |
|                                         |                      |                  N/A |
+-----------------------------------------+----------------------+----------------------+

+---------------------------------------------------------------------------------------+
| Processes:                                                                            |
|  GPU   GI   CI        PID   Type   Process name                            GPU Memory |
|        ID   ID                                                             Usage      |
|=======================================================================================|
|  No running processes found                                                           |
+---------------------------------------------------------------------------------------+
```

## **Uninstall `WSL 2` and `nvidia-smi`** :fire:

In case you need to remove all that is downloaded using this guide, please follow the instructions in [4].

Remember to restart PC after all is done.

## **References**
1. [NVIDIA GPU Accelerated Computing on WSL 2](https://docs.nvidia.com/cuda/wsl-user-guide/index.html)
2. [CUDA Toolkit 12.3 Update 2 Downloads](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0&target_type=runfile_local)
3. [Error code: Wsl/Service/CreateInstance/MountVhd/ERROR_FILE_NOT_FOUND](https://superuser.com/questions/1758361/error-code-wsl-service-createinstance-mountvhd-error-file-not-found)
4. [How to uninstall WSL2 on Windows 10](https://pureinfotech.com/uninstall-wsl2-windows-10/)