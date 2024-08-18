---
layout: post
title:  "So Your Ubuntu Crashed After An Update...⛓️‍💥" 
permalink: /SoYourUbuntuCrashedAfterAnUpdate/
categories: ubuntu, tty, crash, 
---

This article aims to contribute the growing pool of solutions for when one's Ubuntu Operating System(OS) broken after an update. 

The solutions will be presented in order of incrementally layered symptoms:

## 1\. After an update, my OS is now booting into a `tty` terminal instead of the normal Login Screen.

The reason you are seeing the `tty` terminal is because `ubuntu-desktop` is missing. This could be because the update in question removed it for unknown reasons. However, it is now up to install it back.

Follow the commands below:

a\. Log in within `tty` terminal by typing your username first and then your password.

b\. Update the package index files:

{% capture code %}{% raw %}sudo apt-get update{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

c\. Install `ubuntu-desktop`:

{% capture code %}{% raw %}sudo apt-get install ubuntu-desktop{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}


## 2\. Unable to install `ubuntu-desktop` due to **unmet dependencies**.

The reason you are seeing this is due to broken packages concerning dependencies needed by `ubuntu-desktop`. Understandably, because the update broken them to begin with. 

Follow the commands below:

a\. Clean up your packages:

{% capture code %}{% raw %}sudo apt autoclean{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}sudo apt clean{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}sudo apt autoremove{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

b\. Fix the broken packages:

{% capture code %}{% raw %}sudo apt --fix broken{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}sudo apt install -f ubuntu-desktop{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

c\. If the above command did nothing to fix it, try the following alternative:

{% capture code %}{% raw %}sudo dpkg --configure -a{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}sudo apt install -f ubuntu-desktop{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

## 3\. Tried all solutions above to install `ubuntu-desktop`. None of it works. 

If, like me, you have reached this stage of debugging and your issue is still persisting, run the commands below:

a\. Open `/etc/apt/sources.list`:

{% capture code %}{% raw %}sudo nano /etc/apt/sources.list{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

b\. Add the following 2 lines:

{% capture code %}{% raw %}deb http://ir.archive.ubuntu.com/ubuntu/ jammy-updates main restricted universe multiverse
deb http://ir.archive.ubuntu.com/ubuntu/ jammy-backports main restricted universe multiverse{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

c\. Update the package index files:

{% capture code %}{% raw %}sudo apt update{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}sudo apt install ubuntu-desktop{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

## 4\. Able to boot to the Login Screen now but my screen resolution is all messed up.

Also, if, like me, your GUI is now at a low resolution and you cannot change it, your nvidia graphics card driver is still broken from the update. Here's what you need to do to set thing right:

a\. Remove nvidia drivers:

{% capture code %}{% raw %}sudo dpkg -P $(dpkg -l | grep nvidia-driver | awk '{print $2}'){% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

b\. Switch back to nouvea driver:

{% capture code %}{% raw %}sudo apt update{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}sudo apt install xserver-xorg-video-nouveau{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

c\. Shut down (not restart) your system and then boot it up.

d\. Once your GUI is now back to the original resolution, install nvidia drivers:

{% capture code %}{% raw %}ubuntu-drivers devices{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

{% capture code %}{% raw %}sudo ubuntu-drivers autoinstall
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

## **References**

- [Cannot install ubuntu-desktop on Ubuntu 22.04 LTS](https://askubuntu.com/a/1488891)
- [Unmet Dependencies ubuntu-desktop](https://unix.stackexchange.com/questions/673340/unmet-dependencies-ubuntu-desktop)
- [Restoring the Ubuntu UI After an Unexpected tty1 Boot](https://medium.com/@elysiumceleste/restoring-the-ubuntu-ui-after-an-unexpected-tty1-boot-9f1042e03139)
- [How to uninstall the NVIDIA drivers on Ubuntu 22.04 Jammy Jellyfish Linux](https://linuxconfig.org/how-to-uninstall-the-nvidia-drivers-on-ubuntu-22-04-jammy-jellyfish-linux)