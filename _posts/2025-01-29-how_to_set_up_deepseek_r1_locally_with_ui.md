---
layout: post
title:  "How To Set Up DeepSeek R1 Locally with UI" 
permalink: /HowToSetUpDeepSeekR1LocallyWithUI/
categories: llm, deepseek, ai, ollama
---

This document provides instructions on how to easily set up and use DeepSeek R1 LLM such that you can interact with it as a chatbot.

## **What Is DeepSeek R1?**
DeepSeek-R1 is a large language model (LLM) developed by the Chinese company DeepSeek. It is based on the LLaMA (Large Language Model with Attention) architecture, which is designed for general-purpose NLP tasks such as text generation, translation, summarization, and question answering.

The model has been proven to host performance rivalling that of OpenAI's o1 and has therefore made waves in the global tech communities.

## **Why Set This Up?**
This particular LLM presents itself as a win for open-source technologies. Allowing for better data privacy since the model with its trained weights is accessible and can be hosted locally for use. 

## **Instructions**


These instructions assumes that you are running on a Linux operating system such as Ubuntu:

1\. **Navigate** to your home directory:
{% capture code %}{% raw %}cd $HOME
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

2\. **Download** ollama using the command below:
{% capture code %}{% raw %} curl -fsSL https://ollama.com/install.sh | sh
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

Ollama is an open-source tool designed to manage and interact with LLaMA-based LLMs.

3\. **Download** `deepseek_r1` using ollama:
{% capture code %}{% raw %}ollama pull deepseek-r1
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

4\. **Start** a ollama server (which would later interact with the chatbot user interface): 
{% capture code %}{% raw %}ollama serve
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

5\. **Download** Ollama ChatUI: 
{% capture code %}{% raw %}git clone https://github.com/ivanfioravanti/chatbot-ollama --single-branch --depth 1 --branch main
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

6\. **Build** local docker image for Ollama ChatUI: 
{% capture code %}{% raw %}docker build -t chatbot-ollama .
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

7\. **Run** local docker container for Ollama ChatUI: 
{% capture code %}{% raw %}docker run --rm -p 3000:3000 chatbot-ollama
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}

8\. **Access** the Ollama ChatUI via the following link:

{% capture code %}{% raw %}http://localhost:3000/
{% endraw %}{% endcapture %}
{% include code.html code=code lang="bash" %}


## **References**

- [DeepSeek: Official Website](https://www.deepseek.com/)
- [ollama/ollama: GitHub](https://github.com/ollama/ollama)
- [ivanfioravanti/chatbot-ollama: GitHub](https://github.com/ivanfioravanti/chatbot-ollama)