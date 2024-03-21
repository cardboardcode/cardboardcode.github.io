---
layout: post
title:  "How To Install ROS 2 on Windows for Sleep-Deprived Developers"
date:   2024-03-20 20:27:49 +0800
categories: ROS 2, windows
---


Hey. Yo. Didn't sleep much? Rushing yet another project? Same here. So let's keep things simple for both of us. 

So you want to install **ROS 2 Humble** on Windows? Great. **Copy & paste** all the commands below and run them in either terminal or Powershell. 

That's it. It should not take long. Just copy & paste. No thinking needed. Just basic cognitive functions here.

## **Setup**

1. Open up a **[ Command Prompt ]** & **[ PowerShell ]** with `admin rights`.

2. **[ PowerShell ]** - Install Chocolatey:

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

5. **[ Command Prompt ]** - Install **Visual Studio 2019**:

```batch
choco install -y visualstudio2019community
```

6. ...

## **References**

1. [Windows (binary)](https://docs.ros.org/en/humble/Installation/Windows-Install-Binary.html)
