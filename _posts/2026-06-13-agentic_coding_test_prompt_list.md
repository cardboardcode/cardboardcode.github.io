---
layout: post
title:  "Agentic Code Test Prompt List"
permalink: /AgenticCodeTestPromptList/
categories: agentic, vibe-coding, privacy, self-host
---

Below is a list of test prompts you can use for evaluating whether or not your agent can conduct basic tool-calling that would be useful for general tasks:

| **Agentic Function** | **Prompt** |
|:----------|:----------|
| **Write Tool** | {% capture code %}{% raw %}Generate a simple README.md that only has the text "Hello World" in it.{% endraw %}{% endcapture %}{% include code.html code=code lang="bash" %} |
| **Expected Behaviour ✅** | Agent created `README.md` successfully. |
| **Read Tool** | {% capture code %}{% raw %}Tell me what is inside @README.md.{% endraw %}{% endcapture %}{% include code.html code=code lang="bash" %} |
| **Expected Behaviour ✅** | Agent outputs shows `Hello World`. |
| **Web Search Tool** | {% capture code %}{% raw %}Search the web and tell me the latest exchange rate between Singapore SGD and Malaysia Ringgit. Provide the link to the source material used.{% endraw %}{% endcapture %}{% include code.html code=code lang="bash" %} |
| **Expected Behaviour ✅** | Agent outputs a numeral output like `3.158` along with a valid web link that reflects the same value. |

