---
layout: post
title:  "So Your Ubuntu Crashed After An Update..." 
permalink: /SoYourUbuntuCrashedAfterAnUpdate/
categories: ubuntu, tty, crash, 
---

This article aims to contribute the growing pool of solutions for when one's Ubuntu Operating System(OS) broken after an update. 

The solutions will be presented in order of incrementally layered symptoms:

1\. After an update, my OS is now booting into a `tty` terminal instead of the normal Login Screen.

The reason you are seeing the `tty` terminal is because `ubuntu-desktop` is missing. This could be because the update in question removed it for unknown reasons. However, it is now up to install it back.

Follow the commands below:

    a\. Log in within `tty` terminal by typing your username first and then your password.
    b\. Update the package index files:

    ```bash
    sudo apt-get update
    ```

    c\. Install `ubuntu-desktop`:

    ```bash
    sudo apt-get install ubuntu-desktop
    ```

2\. Unable to install `ubuntu-desktop` due to **unmet dependencies**.

The reason you are seeing this is due to broken packages concerning dependencies needed by `ubuntu-desktop`. Understandably, because the update broken them to begin with. 

Follow the commands below:

    a\. Clean up your packages:

    ```bash
    sudo apt autoclean
    ```

    ```bash
    sudo apt clean
    ```

    ```bash
    sudo apt autoremove
    ```

    b\. Fix the broken packages:

    ```bash
    sudo apt --fix broken
    ```

    ```bash
    sudo apt install -f ubuntu-desktop
    ```

    c\. If the above command did nothing to fix it, try the following alternative:

    ```bash
    sudo dpkg --configure -a
    ```

    ```bash
    sudo apt install -f ubuntu-desktop
    ```

3\. Tried all solutions above to install `ubuntu-desktop`. None of it works. 

If, like me, you have reached this stage of debugging and your issue is still persisting, run the commands below:

    a\. Open `sudo vim /etc/apt/sources.list`:

    ```bash
    sudo vim /etc/apt/sources.list
    # If you don't have vim, use the one below:
    sudo nano /etc/apt/sources.list 
    ```

    b\. Add the following 2 lines:

    ```bash
    deb http://ir.archive.ubuntu.com/ubuntu/ jammy-updates main restricted universe multiverse
    deb http://ir.archive.ubuntu.com/ubuntu/ jammy-backports main restricted universe multiverse
    ```

    c\. Update the package index files:

    ```bash
    sudo apt update
    ``` 

    d\. Install `ubuntu-desktop`:

    ```bash
    sudo apt install ubuntu-desktop
    ```

## **References**

- [Cannot install ubuntu-desktop on Ubuntu 22.04 LTS](https://askubuntu.com/a/1488891)
- []()