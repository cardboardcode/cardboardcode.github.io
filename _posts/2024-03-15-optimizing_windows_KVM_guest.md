---
layout: post
title:  "Optimizing Windows 10 when using inside KVM 🪟"
permalink: /OptimizingWindows10WhenInKVM/
categories: KVM, virtual machine
---

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWV6N3hqejNpbWM4MmQxMzZpY3BrNmg4emplOG4xdzJtamZncHpncSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3Q2hJ4FLN1UvS/giphy.gif)

When setting up a **Windows 10** image using the KVM `virt-manager` (following popular online articles), using it just as is **yields poor user experience** with the following problems:

- Low frame refresh rate 
- Laggy mouse cursor movement
- No easy access to file transfer between **Guest** and **Host**

This article aims to collate a list of tool you can download and use for free to address such performance and accessibility issues when using a **Windows 10** Guest.

- virtio drivers
- Windows File System Proxy (WinFSP)
- virtio-win-guest-tools.exe

## **What To Do** 

### **For Performance Improvement**:  🔴

[WIP] Please follow [this video tutorial by Blandman Studios](https://youtu.be/eTWf5D092VY?si=bCn4oXp1aCHsJzXl&t=600) to install the **virtio drivers**.

Read in greater detail why **virtio drivers** help improve performance [here](https://pve.proxmox.com/wiki/Windows_VirtIO_Drivers). **TLDR** - It does so by allowing direct access to underlying Linux drives, rather than slower emulated Windows in KVM.

Download **virtio drivers** [here](ttps://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md#downloads). Be sure to select `Stable virtio-win ISO`.


> ⚠️
> For unknown reasons, downloading this `.iso` file will take a long time. Would recommend using [this unofficial mirror link](https://1drv.ms/u/s!AgPqSRmLOBnd-Fh3JBDRBISogIV3?e=eYKAkK) instead.

### **For Easy File Sharing**: 🔵

[WIP] Please follow [this article by debugpoint](https://www.debugpoint.com/kvm-share-folder-windows-guest/) to install **WinFSP** and **virtio-win-guest-tools.exe**

Download **WinFSP** [here](https://github.com/winfsp/winfsp/releases/). Be sure to select the `.msi` file of the latest version. Eg. `winfsp-2.0.23075.msi`.

Download **virtio-win-guest-tools.exe** [here](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.240-1/).

### **References**

1. [How to Create a Windows Virtual Machine in Linux With KVM](https://www.makeuseof.com/create-windows-virtual-machine-in-linux-with-kvm/)
2. [Why should we install Virtio drivers when using Windows 10 inside KVM by Blandman Studios](https://youtu.be/eTWf5D092VY?si=bCn4oXp1aCHsJzXl&t=600)
3. [virtio_win-pkg-scripts Downloads](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md#downloads)
4. [Share Folder Between Windows Guest and Linux Host in KVM using virtiofs](https://www.debugpoint.com/kvm-share-folder-windows-guest/)
5. [Windows VirtIO Drivers](https://pve.proxmox.com/wiki/Windows_VirtIO_Drivers)