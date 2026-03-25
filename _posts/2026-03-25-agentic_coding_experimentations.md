---
layout: post
title:  "Localised Agentic Coding Experimentations"
permalink: /LocalisedAgenticCodingExperimentations/
categories: claude-code, agentic, vibe-coding, privacy, self-host
---

With the introduction of agentic coding platforms such as **Claude Code**, **OpenClaw**, **NemoClaw** and **Opencode**, I thought to check out what all the fuss is about and why this trend has seemingly taken over the internet, saying how cooked software developers are.

## **What is Agentic Coding?**

It goes by many names these days. The best terminology I saw is **Agentic Coding**. It refers to allowing an Large Language Model (LLM) to not just respond to textual prompts but also have control over reading and writing of files within a developer's workstation as well as executing terminal commands. This added layer of autonomy has, in my experience thus far, saved me the need to constantly copy-paste between a terminal output and a chatbot web interface. However, there are still many limitations which you will see below as I attempt to delegate certain types of tasks to these coding agents.

> If you wish to quickly get started using, be sure to follow the instructions in [my latest gist](https://gist.github.com/cardboardcode/5282e7e794b6d7757d4c8c983167f5db).

## **Why Run Localised?**

Privacy is critical in an age where organisations that collect confidential personnel data are often focused more on rushing products out the door for profit than doing things properly with the right safeguards. Therefore, I chose to keep all models self-hosted.

## **Why Run These Experiments?**

As much hype I see around the technology and the tangible slop I see it generate under my nose, I still see agentic coding to be critical in addressing the long-standing issue of developers working overtime, underappreciated and for business leaders who would not think twice about firing them in the name of cost-cutting or shareholder-value optimisation.

Agentic coding has already started taking root int the workflows of programmers worldwide. Even for developers who vehemently oppose the technology, news of mandated AI use among then often make headlines.

## **Environment**

In my experiments, these are the set of environmental dependencies I ran with:

- NVIDIA GeForce `RTX 4090` [GPU Hardware]
- Ubuntu `24.04` LTS [Operating System]
- Ollama [LLM Backend]
- Claude Code [Agentic Coding Platform]
- `glm-4.7-flash:latest` [LLM Model]

> Fully localised set-up with no dependencies on cloud models or services. No web searches are allowed as well.

## **Task(s) Approach**

These experimentations require a structured approach, learnt from many sharings I got from watching other developers experiment. With it, the effectiveness of 
agentic coding is stretched to its limits before evaluating its results.

## **Task(s) Evaluation**

Below you will see a list of tasks I assigned to the Agentic Coder and their respective results:

> Note that this list will be updated as and when I run more experiments. Last updated on `25th March 2026`.

| **Task Description** | Standardise naming within a folder containing sub-folders whose labels contain fragmented naming conventions but adhere to human-understandable numerical sequence |
|:----------|:----------|
| **Task Outcome** | ✅ **SUCCESS** |
| **Outcome Description** | This task is fairly straightforward, allowing me the user to set a clear goal on what the goal should look like and, consequently, the agentic coder to execute without issues and constant supervision or repeated prompting. |

| **Task Description** | Create a simple python script that would allow me to deduce, without paid X API, whether a X post has a video or not. |
|:----------|:----------|
| **Task Outcome** | ❌ **FAIL** |
| **Outcome Description** | This task, despite having a clear goal in mind, spiralled into failure with the agentic coder generating multiple python scripts, all of which did not work. Even when it did work for a specific set of test cases, it failed when introduced with a newer test cases. |

| **Task Description** | Fix nvidia-driver issue on remote laptop on the same local area network that would allow nvidia-smi to work with `ERR` error. |
|:----------|:----------|
| **Task Outcome** |  ✅ **SUCCESS** |
| **Outcome Description** | The success of this task surprised me the most. The agentic coder (at least Claude Code) was able to understand the context that it needs to always run bash commands on a remote PC. After having given it `ssh` access to the laptop, the task took about 45 minutes to resolve with the agentic coder re-installing various versions of nvidia-drivers on the laptop while ensuring that the existing operating system continued to function. It knew to restart and observe for when the laptop came online again after each new install of drivers. However, on further inspection, better constraints could be set to ensure it did not leave the laptop in an unrecoverable state. This was a risky attempt. |

| **Task Description** | Summarise code changes, commit and push code to a GitHub repository |
|:----------|:----------|
| **Task Outcome** |  ✅ **SUCCESS** |
| **Outcome Description** | Straightforward and simple. The agentic coder, being able to automate this tedious task, has been the most helpful in this aspect while leaving detailed commit messages, useful for debugging using version control. |
