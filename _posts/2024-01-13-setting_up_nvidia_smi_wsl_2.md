---
layout: post
title:  "Setting up nvidia-smi on WSL 2"
date:   2024-01-12 12:04:01 +0800
categories: nvidia
---


This article provides an ultra-simplified guide to settign up nvidia-smi in `WSL 2` on Windows Operating System.

## **Why Install `nvidia-smi` on WSL 2**

**WSL 2** allows Windows user to run Linux applications alongside and interact with other Windows-based programs on Windows operating system. If such applications requires acceleration using Nvidia Graphical Processing Units (GPU), setting up `nvidia-smi` is a must.

## **Installing `WSL 2`**

1. Run the following command in terminal, **running with administrative privileges**:

**Author's Notes**:
> Note that the installation requires a minimum of 20.2 GB.

```bash
# Install WSL 2 and Ubuntu
wsl.exe --install
# Update WSL 2 to latest version
wsl.exe --update
```

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

```bash
# Update WSL 2 to latest version
wsl.exe --update
# Unregister the distribution to avoid the following error [3].
wsl --unregister Ubuntu
```

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

**Author's Notes**:
> Note that the commands below uses the example of downloading *CUDA Toolkit 12.3*, as of this writing. The runfile is 4.07 GB.

```bash
# Remove old GPG key. For the reason, please refer to [1]
sudo apt-get update
sudo apt-key del 7fa2af80
# Get the runfile from official Nvidia download site
wget https://developer.download.nvidia.com/compute/cuda/12.3.2/local_installers/cuda_12.3.2_545.23.08_linux.run

# Install gcc required for Nvidia CUDA Toolkit
sudo apt-get update
sudo apt-get install build-essential

# Run the runfile and follow instructions in terminal to fully download
sudo sh cuda_12.3.2_545.23.08_linux.run

# Export PATH and LD_LIBRARY_PATH
export PATH=$PATH:/usr/local/cuda-12.3/bin:
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda-12.3/lib64:

```

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
1. **NVIDIA GPU Accelerated Computing on WSL 2** - [link](https://docs.nvidia.com/cuda/wsl-user-guide/index.html)
2. **CUDA Toolkit 12.3 Update 2 Downloads** - [link](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0&target_type=runfile_local)
3. **Error code: Wsl/Service/CreateInstance/MountVhd/ERROR_FILE_NOT_FOUND** - [link](https://superuser.com/questions/1758361/error-code-wsl-service-createinstance-mountvhd-error-file-not-found)
4. **How to uninstall WSL2 on Windows 10** - [link](https://pureinfotech.com/uninstall-wsl2-windows-10/)