---
layout: post
title:  "Setting up sambashare between Host Ubuntu 20.04 and Virtual Machine Ubuntu 22.04"
permalink: /SettingUpSambaShareBetweenHostU20AndVirtU22/
categories: sambashare, kvm, virtual machine
---

Here are quick instructions on how to set up **sambashare** in order to easily share files between a Host Ubuntu `20.04` and Virtual Ubuntu `22.04`.

## **What Is The Point of This Guide?**
While there are countless articles detailing how to share files easily across Host and Virtual Machine for KVM, I was unable to find any that does it for specifically Host Ubuntu `20.04`. 

For Ubuntu `20.04`, `virt-manager` in this version of the Operating System (OS) does not **enable shared memory** which is neccessary to set up the shared folder between Host and Virtual Machine. 

Even with backports available for `virt-manager` and KVM is updated to the latest version `4.1.0` as of this writing, `Enable Shared Memory` will remain disabled due to a discrepancy in `qemu-system-x86` package dependency version.

Therefore, the current solution is to set up `sambashare` and share files via a shared-network folder approach. 

The alternative would be to use a physical thumbdrive, treat it as the shared folder in question and tediously mount and unmount as you use. This is far too troublesome to rely on.

## **Steps**

1. Start up your Virtual **Ubuntu** `22.04` via `KVM's virt-manager`.

2. Install `sambashare` in Virtual **Ubuntu** `22.04` by running the following command:

{% capture code %}{% raw %}sudo apt-get update{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}sudo apt-get install sambashare{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

3. Include the following code snippet in the file, `/etc/samba/smb.conf`

{% capture code %}{% raw %}sudo gedit /etc/samba/smb.conf{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}

[ShareName]
   path = /path/to/shared/folder
   read only = no
   browsable = yes

{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

> Replace /path/to/shared/folder with the folder on Virtual Ubuntu 22.04 you wish to be the shared point.

> Eg. /home/garybey/Downloads

4. Restart Samba using the command below to apply the changes.

{% capture code %}{% raw %}sudo systemctl restart smbd{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

5. Create a password to lock the shared folder:

{% capture code %}{% raw %}sudo smbpasswd -a username{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

> Replace 'username' with your ubuntu user name.

6. In Host **Ubuntu** `20.04`, identify the **IP ADDRESS** of Virtual **Ubuntu** `22.04` by running the following command in terminal:

{% capture code %}{% raw %}virsh net-dhcp-leases default{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

7. Add the shared network folder to your file directory using the IP address of Virtual **Ubuntu** `22.04`.

> smb://INSERT IP ADDRESS HERE/

> Eg. smb://192.168.50.25

## **References**

- [Installing Configuring Samba on Ubuntu 22.04](https://reintech.io/blog/installing-configuring-samba-ubuntu-22)