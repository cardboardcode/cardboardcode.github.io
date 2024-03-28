---
layout: post
title:  "Generating Line Art in Blender"
date:   2023-05-27 13:05:31 +0800
permalink: /GeneratingLineArtInBlender/
categories: blender
---

![](/img/2023_05_27/lineart_result.png)

## **Why Learn This?**

Having traced over 3d models countless times manually, the process of creating good linework can be a tedious, mind-numbing and time-consuming process. While automatically-generated linework lacks the human touch and variety, it still helps save time by getting at least 80% of the way and reduce the risk of developing carpal tunnel syndrome for any poor starving artists.

## **Requirements**

1. [Blender `3.3.0`](https://www.blender.org/download/releases/3-3/)
2. Windows 10/Ubuntu 22.04 (Operating System)

## **Instructions**

### **Step 1**. Create **Override** material.
Create a `Cube` and select its **Material** tab:

```
Set Roughness to 1.000
Set Emission Color to White
Set Emission Strength to 100.000
```

![](/img/2023_05_27/override_material.png)

Remove the cube once the above material properties has been set.

### **Step 2**. Configure View Layer properties.

Set **Material Override** with **Override** material under **View Layer** as shown below:

![](/img/2023_05_27/override_under_view_layer.png)

Enable `Z` and `Combined` under **Passes** => **Data**.

![](/img/2023_05_27/enable_z_combined.png)

### **Step 3**. Create and Configure **Scene Line Art** object for Contour Lines.

Create a `Scene Line Art` and configure its **Modifier Properties** accordingly.

> ℹ️ Once created, name it LineArt HBO. Additionally, add to its own collection. Call it lines.

```
Disable Realtime to make viewport efficient.
Enable only Contour and disable everything else under Edge Type.
Set Line Thickness to 8.
```

![](/img/2023_05_27/hbo.png)


Configure its **Object Data Properties** accordingly.

```
Set Stroke Thickness to Screen Space under Strokes <= Object Data.
```

![](/img/2023_05_27/screen_space.png)

### **Step 4**. Create and Configure **Scene Line Art** object for Inner Lines.

Create a `Scene Line Art` and configure its **Modifier Properties** accordingly.

> ℹ️ Once created, name it LineArt Thin. Additionally, add to lines collection.

```
Set Line Thickness to 4. 
```

![](/img/2023_05_27/thin.png)

> ℹ️ Generally, thin inner lines should have half the size of the contour lines.

Configure its **Object Data Properties** similar to **Step 2**.

```
Set Stroke Thickness to Screen Space under Strokes <= Object Data.
```

### **Step 5**. Render & Save

Press `F12` to render out the scene. 

> ℹ️ Don't panic when you see a blank white screen in your render screen. The linework 
should appear only once the rendering is done overall. 

![](/img/2023_05_27/save_render.png)

# **Configurables**

Here are ways to vary the linework Blender can generate:

1. Try out different Edge Types under **Scene Line Art** Modifier properties.
2. Set it render resolution to a higher fidelity for smoother lines. :warning: This will slow your render.

## **Credits**
The models are not my own. Please see below for proper attributions:
1. [Dodemon by Adrien Marcastel](https://sketchfab.com/3d-models/dodemon-1ad6adda56bd4d47a984c0c45cdc3a54)
2. [CINQUEDEA (medieval sword) by Bulat.Shakirov](https://sketchfab.com/3d-models/cinquedea-medieval-sword-8426d3b40cae4211875189cb5a55cc08)

## **References**

1. [Quick Line Art Technique for Blender 2.93 by chippwalters](https://www.youtube.com/watch?v=HYs3mOV8mmo)
2. [Warning message solution : To Render Grease Pencil enable combined and z passes (Blender) by Open Class](https://www.youtube.com/watch?v=aaVRrFmYY0k)