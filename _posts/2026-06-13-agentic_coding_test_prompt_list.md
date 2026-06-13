---
layout: post
title:  "Agentic Code Test Prompt List"
permalink: /AgenticCodeTestPromptList/
categories: agentic, vibe-coding, privacy, self-host
---

> [!NOTE]
> Below is a list of test prompts you can use for evaluating whether or not your agent can conduct basic tool-calling that would be useful for general tasks:

| **Agentic Function** |:----------|
|:----------|:----------|
| **Write Tool** | Generate a simple README.md that only has the text "Hello World" in it. |
| **Verify ✅** | Agent created `README.md` successfully. |
| **Read Tool** | Tell me what is inside @README.md |
| **Verify ✅** | Agent outputs shows `Hello World`. |
| **Web Search Tool** | Search the web and tell me the latest exchange rate between Singapore SGD and Malaysia Ringgit. Provide the link to the source material used. |
| **Verify ✅** | Agent outputs a numeral output like `3.158` along with a valid web link that reflects the same value. |

