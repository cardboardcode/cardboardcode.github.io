---
layout: post
title:  "Setting up file-sharing between Host Ubuntu 22.04 and Virtual Machine Ubuntu 22.04"
permalink: /SettingUpFileSharingBetweenHostU22AndVirtU22/
categories: file-sharing, kvm, virtual machine
---

Here are quick instructions on how to set up **sambashare** in order to easily share files between a Host Ubuntu `22.04` and Virtual Ubuntu `22.04`.

## **What Is This?**
Unlike the caveat faced when setting up file-sharing for host Ubuntu `20.04`, `enable_shared-memory` is allowed for host Ubuntu `22.04`. 

This article offers a quick-cut manner of mounting shared folders for quick file-sharing between Host and Virtual Ubuntus with the extra step of persistent mounting after restarting Virtual Ubuntu on KVM.


## **Steps**

1\. **Ensure** your Virtual **Ubuntu** `22.04` via `KVM's virt-manager` is **powered off**.

2\. **Navigate** to `Memory` in Virtual **Ubuntu** `22.04` KVM Configuration as shown below:

![](/img/2025_07_06/1_enable_shared_memory.png)

3\. Set `Enable shared memory` to true.

4\. Add a `Filesystem` by pressing `Add hardware` as shown below:

![](/img/2025_07_06/2_add_hardware.png)

5\. **Configure** `Filesystem` as shown below:

![](/img/2025_07_06/3_configure_filesystem.png)

6\. **Turn** on your Virtual **Ubuntu** `22.04` via `KVM's virt-manager

7\. **Open** a terminal in Virtual **Ubuntu** `22.04`.

8\. **Create** the local mount directory using the command below:

{% capture code %}{% raw %}sudo mkdir /mnt/host{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

9\. **Mount** host path to the local mount directory using the command below:

{% capture code %}{% raw %}sudo mount -t virtiofs mount_host /mnt/host
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

9\. **Configure** mount to be persistent for subsequent system bootup:

{% capture code %}{% raw %}echo "mount_host /mnt/host virtiofs defaults 0 0" | sudo tee -a /etc/fstab
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

10\. **Reboot** your Virtual **Ubuntu** `22.04`.

11\. You should then be able to see files on your host path accessible via `/mnt/host`.

## **References**

- [Share Folder Between Guest and Host in virt-manager (KVM/Qemu/libvirt)](https://www.debugpoint.com/share-folder-virt-manager/)