---
layout: post
title:  "Concept Artist Blender Tool Kit"
date:   2024-02-27 19:05:49 +0800
categories: blender
---


As a concept artist, I use Blender. Here is a concise list of Blender plugins that have proved to be useful in this profession: 

## **Plugins**

| **[Hard-Ops](https://drive.google.com/drive/folders/1H_5i83hw2hpqhASwYrleHGxeFRK3JInV)** | [<img src="https://img.shields.io/badge/FREE-00A300">](<LINK>) | 
---
Streamlines hard surface modeling workflow in Blender.

| **[Extreme PBR Evo](https://andrew-d.gumroad.com/l/BvpHx)** | [<img src="https://img.shields.io/badge/PROPRIETARY-EF7215">](<LINK>) |
---
Provides 1-click realistic material library for Blender.

| **[SketchFab](https://github.com/sketchfab/blender-plugin)** | [<img src="https://img.shields.io/badge/FREE-00A300">](<LINK>) |
---
Provides quick import function from the SketchFab online platform for free 3D models.

| **[Easy HDRI](https://codeofart.gumroad.com/l/EasyHDRI)** | [<img src="https://img.shields.io/badge/FREE-00A300">](<LINK>) |
---
Provides 1-click simplified HDR environment map creation.

| **[Alt Tab Ocean](https://blendermarket.com/products/alt-tab-water)** | [<img src="https://img.shields.io/badge/FREE-00A300">](<LINK>) |
---
Provides 1-click realistic ocean creation tool for Blender.

| **[Ivy Generator](https://abaga.gumroad.com/l/ivygen)** | [<img src="https://img.shields.io/badge/FREE-00A300">](<LINK>) |
---
Provides procedural ivy generation for scenes.

| **[botaniq_full](https://polygoniq.gumroad.com/l/botaniq-trees)** | [<img src="https://img.shields.io/badge/FREE-00A300">](<LINK>) |
---
Provides comprehensive 3D plant model library.


## **3rd Party Applications**

| **[Quixel Bridge](https://quixel.com/bridge)** | [<img src="https://img.shields.io/badge/FREE-00A300">](<LINK>) |
---
Provides 1-click realistic material and architecture/nature models library for Blender.

## **Settings**

- **Render Engine**: `Cycles`
- **Denoise**: `Optix` + `Albedo`

Configure `Sampling` under `Render` tab as such to optimize for a better development workflow:

### **Viewport**

```bash
Noise Threshold: 0.1000
Max Samples: 128
Min Samples: 0
```

### **Render**

```bash
Noise Threshold: 0.1000
Max Samples: 250
Min Samples: 0
```
