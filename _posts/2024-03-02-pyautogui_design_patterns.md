---
layout: post
title:  "PyAutoGUI Design Pattern"
date:   2024-03-02 15:27:49 +0800
categories: pyautogui, python
---


This article contains **plug-and-play** `.py` **python snippets** that calls `PyAutoGUI` functions that automates mouse and keyboard movements.

This also aims to highlight design patterns you could use to **observe** during your own **tedious computer-related workflow** and thus **automate** easily.

## **Design Pattern**

**A typical computer task** is observed to have the following repeating pattern:

### **LOCATE - INTERACT**
```bash
LOCATE refers to what you are looking at to interact.

Input Data Type: .png/.jpeg image
Output Data Type: int x-position, int y-position
```
> **Author's Note**: For a tentative tangible implementation of **LOCATE**, please see **LOCATE** section below.

```bash
INTERACT refers to what you are looking at to interact.

Input Data Type: Keyboard Strokes and Mouse Movements
Output Data Type: Change of GUI state.
```

## **Snippets**

- **Mouse Movement**

```python
pyautogui.moveTo(x=200, y=200, duration=1.0)
```

- **Mouse Clicks**

```python
pyautogui.click(x=100, y=200, button='left')
pyautogui.doubleClick(x=100, y=200, button='left')
```

- **Screenshot Function(s)**

> **Author's Note**: While `PyAutoGUI` offers its own screenshot function `locateOnScreen`, please use the following `.py` implementation for higher and repeatable accuracy: 

```python
import cv2
import numpy as np
from PIL import ImageGrab 

def locateOnScreen(template_path, threshold=0.99):

    # Grab the whole screen using Pillow and convert to OpenCV.
    whole_screen = ImageGrab.grab()
    # whole_screen.save("whole_screen.png")
    open_cv_image = np.array(whole_screen)
    image = open_cv_image[:, :, ::-1].copy()

    # Convert to grayscale for template matching.
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Load in template image to find in the whole screen
    template = cv2.imread(template_path, cv2.IMREAD_GRAYSCALE)

    # Run template-matching using OpenCV.
    result = cv2.matchTemplate(image, template, cv2.TM_CCOEFF_NORMED)

    # Get the width and height of the location template image
    w, h = template.shape[::-1]
    # Get locations (x,y).
    locations = np.where(result >= threshold)

    # Loop through the locations and draw rectangles around the matches
    for pt in zip(*locations[::-1]):
        return pt[0] + int(w/2), pt[1] + int(h/2)
```

### LOCATE
```python
goto_pos = None
curr_threshold = 0.99
while (goto_pos is None):
    goto_pos = locateOnScreen('path_to_image_to_find.png', curr_threshold)
    if goto_pose is None:
        curr_threshold = curr_threshold - 0.01
        print("No match found. Reducing curr_threshold to:", curr_threshold)
```
Replace the `path_to_image_to_find.png` with **the path to your own image**.

- **Keyboard Strokes**

```python
pyautogui.press('left') # Press specific keyboard key.
pyautogui.write('asdf') # Type a string using keyboard.
```

## **KEYBOARD KEYS**

```
['\t', '\n', '\r', ' ', '!', '"', '#', '$', '%', '&', "'", '(',
')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7',
'8', '9', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`',
'a', 'b', 'c', 'd', 'e','f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~',
'accept', 'add', 'alt', 'altleft', 'altright', 'apps', 'backspace',
'browserback', 'browserfavorites', 'browserforward', 'browserhome',
'browserrefresh', 'browsersearch', 'browserstop', 'capslock', 'clear',
'convert', 'ctrl', 'ctrlleft', 'ctrlright', 'decimal', 'del', 'delete',
'divide', 'down', 'end', 'enter', 'esc', 'escape', 'execute', 'f1', 'f10',
'f11', 'f12', 'f13', 'f14', 'f15', 'f16', 'f17', 'f18', 'f19', 'f2', 'f20',
'f21', 'f22', 'f23', 'f24', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9',
'final', 'fn', 'hanguel', 'hangul', 'hanja', 'help', 'home', 'insert', 'junja',
'kana', 'kanji', 'launchapp1', 'launchapp2', 'launchmail',
'launchmediaselect', 'left', 'modechange', 'multiply', 'nexttrack',
'nonconvert', 'num0', 'num1', 'num2', 'num3', 'num4', 'num5', 'num6',
'num7', 'num8', 'num9', 'numlock', 'pagedown', 'pageup', 'pause', 'pgdn',
'pgup', 'playpause', 'prevtrack', 'print', 'printscreen', 'prntscrn',
'prtsc', 'prtscr', 'return', 'right', 'scrolllock', 'select', 'separator',
'shift', 'shiftleft', 'shiftright', 'sleep', 'space', 'stop', 'subtract', 'tab',
'up', 'volumedown', 'volumemute', 'volumeup', 'win', 'winleft', 'winright', 'yen',
'command', 'option', 'optionleft', 'optionright']
```

## **Limitations**
This type of automation is not perfect and there are **shortcomings** which need **to be accounted for**:

### **Fringe Cases**
Here are a few cases where this type of GUI automation would fall short:

1. **A GUI change of state** takes a long while and there are duplicates of the **LOCATE** object present
during transition that would give false positives.

2. The rate of interaction required is too high. Examples would be **playing an FPS game** and **reacting
promptly to enemies**.

## **References**

1. [PyAutoGUI's Documentation](https://pyautogui.readthedocs.io/en/latest/)
