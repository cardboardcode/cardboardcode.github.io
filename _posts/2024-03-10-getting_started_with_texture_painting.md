---
layout: post
title:  "Getting Started With Texture Painting in Blender"
permalink: /GettingStartedWithTexturingPaintingInBlender/
categories: blender, texture painting
---


Here is an **overview** and **resource/cheat sheet** to get started with **Texture Painting** in **Blender**.

## **Environment/Tools used**

- Blender `3.6.2` (Updated as of `10th March 2023`)
- [CR Basic Brushpack by craftreaper](https://omarfaruqtawsif.gumroad.com/l/zcpfq)

## **Workspace Layout**
Please arrange the workspace similar to what is show below:

![](/img/2024_03_10/blender_layout.png)

This is for ease of development. Providing an intuitive overview of what your texture paint looks like as you work on it.

> ℹ️ This is basically just adding an UV editor on the left side on top of the default workspace layout.

## **Initial Steps**

1\. Select your mesh object you wish to apply Texture Painting to.

2\. Press `Tab` to go to edit mode. 

3\. Press `Ctrl` + `a` to select all mesh faces of selected object.

4\. Press `u` to open `UV Mapping` and select **Unwrap**

5\. Add a new **Base Color** texture under the `Tool` tab as shown below:

![](/img/2024_03_10/adding_texture_button.png)

6\. Configure the **Base Color** texture with the recommended settings as shown below:

![](/img/2024_03_10/base_color_settings.png)

```bash
Width: 2048 px
Height: 2048 px
Disable Alpha # Unless you need transparency in your texture paint.
Select your designated base color to fill with.
```

## **Keyboard Shortcut**

| **Keyboard Shortcut** | **Function** | 
|------------------------|---------------|
| `f` | Change brush size. Click and tweak using mouse. | 
| `Shift` + `f` | Change brush strength. Click and tweak using mouse. | 
| `s` | Pick color at cursor's position. Hover and click once. |
| `Shift` + `Mouse Middle Button` | Pan camera. |
| `Ctrl` + `Mouse Middle Button` | Zoom camera. |

> ℹ️ Map the `Mouse Middle Button` to the bottom button of your **Stylus Pen** if you are using a Monitor Tablet for your workflow.

### **References**

1. [CR Basic Brushpack for blender texture painting](https://omarfaruqtawsif.gumroad.com/l/zcpfq) - Additional Brush Textures for Texture Painting in Blender.
2. [BLENDER - ROCK MATERIAL STUDY - hand painted](https://www.youtube.com/watch?v=1lMfRhO09JA) - 14 minutes video tutorial showing how
to do a basic texture painting to produce a stylized 3D rock asset, typically used for games.
3. [Texture Painting - Quick Start Guide - Blender](https://www.youtube.com/watch?v=WjS_zNQNVlw) - A 4 minutes video tutorial on getting started with texture painting. Painting a simple hammer by Grant Abbitt.
4. [Painterly brushworks in blender ; Recreate your favorite paintings in 3d!](https://www.youtube.com/watch?v=10kJdVW8qOs) - Art Goal 1.
5. [Getting that 2D look in 3D! 🍑](https://www.youtube.com/watch?v=5Idffj0gjIs) - Art Goal 2.
