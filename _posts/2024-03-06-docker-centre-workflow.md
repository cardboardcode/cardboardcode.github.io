---
layout: post
title:  "A Docker-Centric Approach to Software Development 🐳"
permalink: /ADockerCentricApproachToSoftwareDevelopment/
categories: pyautogui, python
---

![](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnh6dDJpaTltaGQ4dG9nc3FoZzF5YXBtMnJzeDB5ZmxsbHcxY2R4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xVurSXSjNiifP8qLXy/giphy.gif)

In my experience developing software within a team, **standardization of environment dependencies has always been a constant pain**. There had been **countless instances** where trying to get more hands onboard resulted in **more intense bouts of stress**, rather than actually resolving the issue at hand. 

This often comes in the form of teammates being unable to set up a project's complex network of software dependencies which would likely conflict with their own workstation's existing dependencies. **While it is easier to manage such conflicts within python environments, the same cannot be said for C++ libraries as well as lower-level hardware-centric backends like Nvidia's CUDA.** Usually, the workarounds would be a quick dirty hack to switch different versions around while the simpler option would be to completely remove and install the required versions tediously.

Therefore, this article hopes to **address this issue** of environment standardization through **an intuitive use of Docker**. 

## **Setup**

1. If you do not have Docker installed, please follow [the offical installation guide](https://docs.docker.com/engine/install/ubuntu/).

2. Configure `docker` such that you need not always have to run it with `sudo`. Do note this carries security risk but at least offers ease of use within the context of largely-offline development.

> ℹ️ To avoid such security risk, please consider setting up Docker [rootless](https://docs.docker.com/engine/security/rootless/).


## **Run**

1. Downloading public docker images

```bash
docker pull <image_name:tag_name>
```

2. Building local docker images using `Dockerfile`

```bash 
docker build -t <image_name:tag_name> .
```
Replace `<image_name:tag_name>` with something like `cardboardcode/opencv:1`

3. Run docker images as containers:

```bash
#!/usr/bin/env bash

xhost +local:docker
XSOCK=/tmp/.X11-unix
XAUTH=/tmp/.docker.xauth
xauth nlist $DISPLAY | sed -e 's/^..../ffff/' | xauth -f $XAUTH nmerge -
docker run -m 8GB -it --rm -e DISPLAY=$DISPLAY -v $XSOCK:$XSOCK -v $XAUTH:$XAUTH -e XAUTHORITY=$XAUTH -v ${PWD}:/src  -it <image_name:tag_name>
xhost -local:docker
```

## **Save & Share** 
This section covers an offline methodology of sharing varying docker images in order to achieve the quick environmental standardization among different developers:

1. Save a docker image as `.tar` file:

```bash
docker save -o <file_name>.tar <docker_image_name>
#Eg. docker save -o mynginx1.tar nginx
```

2. Load a `.tar` file as docker image on different workstations:

```bash
docker load < <file_name>.tar
#Eg. docker load < mynginx1.tar
```


## **Clean-Up** 🧹

This section covers how to remove Docker containers/images. Create the following `.bash` file and run them.

### 1a. 🐧 [ **Linux** ] - `remove_all_docker_containers.bash`

```bash
#!/bin/bash

# Run the command to get container IDs in a single line
container_ids=$(docker ps -a -q)

# Check if the variable is empty
if [[ -z "$container_ids" ]]; then
  echo "No containers found."
else
  echo "Containers found:"
  # Print each container ID on a new line
  echo "$container_ids"
  # Prompt user for confirmation
  read -p "Do you want to stop and remove these containers? (y/N): " answer

  # Convert user input to lowercase
  answer=${answer,,}

  # Check if user confirms
  if [[ "$answer" == "y" || "$answer" == "yes" ]]; then
    # Use loop to stop and remove containers safely
    for container_id in $containers; do
      docker stop "$container_id" && docker rm -f "$container_id"
      echo "Removed container: $container_id"
    done
  else
    echo "Containers not stopped or removed."
  fi
fi
```

### 1b. 🪟 [ **Windows - Powershell** ]

{% capture code %}{% raw %}docker ps -aq | Where-Object { $_ -ne "" } | ForEach-Object { docker rm $_ }{% endraw %}{% endcapture %} {% include code.html code=code lang="batch" %}

### 1c. 🐧 [ **Linux** ]

{% capture code %}{% raw %}{% endraw %}docker rm $(docker ps -aq){% endcapture %} {% include code.html code=code lang="bash" %}

### 2a. 🐧  [ **Linux** ] - `remove_all_docker_images.bash`

```bash
#!/bin/bash

# Run the command to get image IDs in a single line
image_ids=$(docker images -a -q)

# Check if the variable is empty
if [[ -z "$image_ids" ]]; then
  echo "No images found."
else
  echo "Images found:"
  # Print each image ID on a new line
  echo "$image_ids"
  # Prompt user for confirmation
  read -p "Do you want to remove all these images? (y/N): " answer

  # Convert user input to lowercase for case-insensitive comparison
  answer=${answer,,}

  # Check if user confirms (y or yes)
  if [[ "$answer" == "y" || "$answer" == "yes" ]]; then
    # Use loop to remove images safely
    for image_id in $image_ids; do
      docker rmi -f "$image_id"
      echo "Removed image: $image_id"
    done
  else
    echo "Images not removed."
  fi
fi
```

### 2b. 🪟 [ **Windows - Powershell** ]

{% capture code %}{% raw %}docker rmi -f $(docker images -aq){% endraw %}{% endcapture %} {% include code.html code=code lang="batch" %}

### 2c. 🐧 [ **Linux** ]

{% capture code %}{% raw %}{% endraw %}docker rmi $(docker images -q){% endcapture %} {% include code.html code=code lang="bash" %}

## **Limitations** 👎

- **MEMORY** - Docker images could easily exceed `10GB` in memory space use.

- **GRAPHIC USER INTERFACE** - Instantiating Graphical User Interfaces through docker instances can be problematic and impossible in many cases. While users could circumvent this, most approaches introduces security risks which one should be mindful of.

- **SECURITY** - Please consider reading up on security risks posed in the following recent hacks:

1. [Coinhive Cryptojacking via Malicious Docker Images (2018)](https://unit42.paloaltonetworks.com/cryptojacking-docker-images-for-mining-monero/) 


> ℹ️ Coinhive has shut down as of 2019. [[Ref]](https://www.theverge.com/2019/2/28/18244636/coinhive-cryptojacking-cryptocurrency-mining-shut-down-monero-date)

2. ["Escape the Docker" Vulnerability (2019) ](https://csbygb.gitbook.io/pentips/web-pentesting/docker-exploitation)

> ℹ️ Docker versions 18.09.2, 17.03.1-ce, and 17.06.2-ce and later addressed the issue.

- **HARDWARE** - Hardware-specific programs that rely on devices such as GPU cannot be instantiated or virtualized effectively through Docker. 

## **References**

1. [Docker Official Documentation](https://docs.docker.com/)
2. [Run the Docker daemon as a non-root user (Rootless mode)](https://docs.docker.com/engine/security/rootless/)
3. ["Escape the Docker" Vulnerability (2019) ](https://csbygb.gitbook.io/pentips/web-pentesting/docker-exploitation)
4. [Coinhive Cryptojacking via Malicious Docker Images (2018)](https://unit42.paloaltonetworks.com/cryptojacking-docker-images-for-mining-monero/) 
5. [Saving Images and Containers as Tar Files for Sharing](https://dockerlabs.collabnix.com/beginners/saving-images-as-tar/)
