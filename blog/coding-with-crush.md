+++
date = "2025-08-02"
title = "My First Crush: Effortless Multi-Model AI in the Terminal"
tags = ["crush", "cli", "ai", "gemini-api", "openrouter"]
categories = ["Tools", "Tutorials"]
+++

I spent some time today setting up and playing with a new tool, and I'm genuinely impressed. It's called [Crush](https://github.com/charmbracelet/crush), a new command-line interface for interacting with large language models from the brilliant minds at Charm Bracelet. The experience was so smooth that I had to write about it.

## A Beautiful Interface for All the Models

The first thing that strikes you about `crush` is its beautiful, intuitive interface. It lives in your terminal but feels incredibly modern and responsive. Getting started was a breeze. I already had a Gemini API key, so I plugged that in to get access to **Gemini 2.5 Pro**.

What really blew me away was how easy it was to add more models. I also have an OpenRouter API key, and by adding it to the `crush` config, I instantly had access to a plethora of other models, including free ones like **QWEN 3** and **GLM4.5**.

Switching between them is trivial. A simple command lets you cycle through your configured models, allowing you to pick the best brain for the job without any hassle.

## Vibe-Driven Development

With everything set up, I started to "vibe code" some simple games. I'd describe a concept, and `crush` would start generating the code. The interactive nature of the tool makes it feel like a true pair-programming session with an AI. It's a fantastic way to quickly prototype ideas and get a working foundation.

## A Note on Safety: The Approval Workflow

One thing that initially felt a bit tedious was the need to approve every single file `crush` wanted to create or modify. It would present the changes and wait for my explicit 'yes'. I found myself wishing for an "auto-approve" mode to speed things up.

However, after a moment's reflection, I realized this is a crucial safety feature. Giving an AI tool carte blanche to write files directly to your system could be risky. This approval step ensures you are always in control, allowing you to review changes before they are committed. It prevents the tool from "behaving badly" and gives you the final say, which is ultimately a good thing.

## Next Steps with Crush

I'm already thinking about what to do next with this powerful tool. Here are a few ideas:

* **Scripting & Automation:** Integrate `crush` into shell scripts to automate complex tasks, like generating documentation or refactoring code.
* **Git Hooks:** Create a Git pre-commit hook that uses `crush` to generate commit messages based on your staged changes.
* **Explore More Models:** Dive deeper into the variety of models available through OpenRouter to see how different AIs handle the same prompts.
* **Contribute:** The project is open source, and contributing to a tool you use every day is always a rewarding experience.

## Conclusion

If you spend your days in the terminal and work with AI, you owe it to yourself to check out `crush`. It has masterfully simplified the process of using multiple models and wrapped it in a delightful user experience. It's a powerful, safe, and fun way to bring the power of LLMs directly into your local development workflow.

### External References
* **Crush on GitHub:** [https://github.com/charmbracelet/crush](https://github.com/charmbracelet/crush)