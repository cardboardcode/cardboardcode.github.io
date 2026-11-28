---
layout: post
title:  "Tool-Use Benchmark for Coding Agents"
permalink: /posts/2026/06/13/tool_use_benchmark_for_coding_agents/
redirect_from:
  - "/AgenticCodeTestPromptList/"
  - "/posts/2026/06/13/agentic_coding_test_prompt_list/"
categories: agentic, vibe-coding, privacy, self-host
---

Below is a list of prompts you can use for evaluating whether or not your agent can conduct basic tool-calling that would be useful for general tasks:

## **Write To File**

Verify that Agent is able to write to a file.

**Copy** the prompt below and send it to your agent to test its write tool.
{% capture code %}{% raw %}Generate a simple README.md that only has the text "Hello World" in it.
{% endraw %}{% endcapture %}
{% include code.html code=code lang="plaintext" %}

| **Verify ✅** | Agent created `README.md` successfully. |

## **Read From File**

Verify that Agent is able to read a file.

**Copy** the prompt below and send it to your agent to test its read tool.
{% capture code %}{% raw %}Tell me what is inside README.md
{% endraw %}{% endcapture %}
{% include code.html code=code lang="plaintext" %}

| **Verify ✅** | Agent says "Hello World" is in the file. |

## **Analyze Codebase**

Verify that Agent is able to read a codebase.

**Copy** the prompt below and send it to your agent to test its codebase analysis.
{% capture code %}{% raw %}Analyze the files in the current directory and write a short paragraph summarising what the files. Save the paragraph to OVERVIEW.md
{% endraw %}{% endcapture %}
{% include code.html code=code lang="plaintext" %}

| **Verify ✅** | Agent generates `OVERVIEW.md` with a short description of what is in the directory. |

## **Web Search**

Verify that Agent can do a web search.

**Copy** the prompt below and send it to your agent to test its web search.
{% capture code %}{% raw %}Search the web and tell me what is the latest exchange rate between SGD and Malaysia Ringgit. State the reference source link.
{% endraw %}{% endcapture %}
{% include code.html code=code lang="plaintext" %}

| **Verify ✅** | The exchange rate given by Agent should match what you get from a manual search. |

## **Automatic Permissions**

Verify that Agent has permissions to automatically execute tasks without constantly halting to ask for user input.

**Copy** the prompt below and send it to your agent to test its auto-permission behavior.
{% capture code %}{% raw %}Create a temporary file called /tmp/auto-test.txt containing the text "auto mode works", then read it back and delete it.
{% endraw %}{% endcapture %}
{% include code.html code=code lang="plaintext" %}

| **Verify ✅** | Agent is able to create `/tmp/auto-test.txt` in a restricted space that would normally require permission, read the generated file, and remove the generated file. |

## **Long-Form Generation**

Verify that Agent has a large enough context window to properly process complex tasks via proper automatic compaction.

**Copy** the prompt below and send it to your agent to test its long-form generation.
{% capture code %}{% raw %}Write an extremely detailed technical TUTORIAL.md about Rust asynchronous programming. Continue for as long as possible. Cover async/await, futures, executors, Tokio, channels, cancellation, concurrency, error handling, and testing. Do not stop early. Don't stop to clarify any questions. Automatically do what you think is best and only stop once TUTORIAL.md has been written.
{% endraw %}{% endcapture %}
{% include code.html code=code lang="plaintext" %}

| **Verify ✅** | Agent is able to generate a long-form document without having its output cut off. |
