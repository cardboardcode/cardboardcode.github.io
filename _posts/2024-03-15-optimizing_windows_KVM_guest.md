---
layout: post
title:  "Optimizing Windows KVM Guest on Linux Host"
date:   2024-03-15 13:40:49 +0800
categories: KVM, virtual machine
---

When setting up a **Windows 10** image using the KVM `virt-manager` (following popular online articles), using it just as is **yields poor user experience** with the following problems:

- Low frame refresh rate 
- Laggy mouse cursor movement
- No easy access to file transfer between **Guest** and **Host**

This article aims to collate a list of tool you can download and use for free to address such performance and accessibility issues when using a **Windows 10** Guest.

- virtio drivers
- Windows File System Proxy (WinFSP)
- virtio-win-guest-tools.exe

## **Downloads**

### **For Performance Improvement**:

[WIP] Please follow [this video tutorial by Blandman Studios](https://youtu.be/eTWf5D092VY?si=bCn4oXp1aCHsJzXl&t=600) to install the **virtio drivers**.

### **For Easy File Sharing**:

[WIP] Please follow [this article by debugpoint](https://www.debugpoint.com/kvm-share-folder-windows-guest/) to install WinFSP and virtio-win-guest-tools.exe


### **References**

1. [How to Create a Windows Virtual Machine in Linux With KVM](https://www.makeuseof.com/create-windows-virtual-machine-in-linux-with-kvm/)
2. [Why should we install Virtio drivers when using Windows 10 inside KVM by Blandman Studios](https://youtu.be/eTWf5D092VY?si=bCn4oXp1aCHsJzXl&t=600)
3. [virtio_win-pkg-scripts Downl](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md#downloads)
4. [Share Folder Between Windows Guest and Linux Host in KVM using virtiofs](https://www.debugpoint.com/kvm-share-folder-windows-guest/)