+++
date = "2025-08-10"
title = "From Idea to MVP: A Technical Journey Building a Gen AI App"
tags = ["gen-ai", "app-development", "javascript", "html", "llm", "iterative-design", "software-engineering"]
categories = ["Technical-Walkthrough", "Case-Study"]
+++

A software engineer's logbook on the iterative process of creating a feature-rich web application with a Large Language Model, highlighting the key lessons learned along the way.

## The Genesis of an Idea 💡
Every software project begins with an idea. Mine was a desire to create a learning tool inspired by the teaching methods of Peter Norvig and Sebastian Thrun. I wanted a simple app that would present a new puzzle at the click of a button, but with a twist: it would also provide a detailed solution, explaining the nuances from a naive approach to an optimized one. The goal was to help users recognize underlying algorithmic patterns and improve their problem-solving skills.

This was the seed of the "Gen AI Puzzle Solver," a project that would take me on an iterative journey of development, debugging, and refinement. In this post, I'll share the technical story of how this app was built, the challenges I faced, and the key takeaways for anyone looking to build their own applications with Large Language Models (LLMs).

## Version 1: The Foundation 🏗️
The first version of the app was a simple, single-page HTML file. It used Tailwind CSS for styling and had a basic JavaScript structure for interacting with the Gemini API. The core logic was straightforward: a generatePuzzle function would construct a prompt, send it to the API, and then parse the JSON response to display the puzzle.

**Key Takeaway: Start Small and Iterate**

This initial version was far from perfect, but it was a crucial first step. It allowed me to validate the core concept and get a feel for working with the Gemini API. By starting with a minimal viable product (MVP), I was able to get feedback early and often, which proved to be invaluable as the project evolved.

## Version 2: Feature Expansion 🚀
With the basic functionality in place, it was time to start adding features. Based on my own experience using the app, I identified several areas for improvement:

*   **Persistence:** I needed a way to save puzzles so I wouldn't lose them. I implemented this using the browser's localStorage.

*   **Sharing:** I wanted to be able to share the puzzles with others, so I added social sharing links and a "copy as Markdown" feature.

*   **Algorithm Simulation:** To better understand the solutions, I added a button to display a text-based simulation of the algorithm.

*   **Keyword-Based Puzzle Generation:** I wanted more control over the types of puzzles that were generated, so I added the ability to input keywords to guide the AI.

*   **Configuration:** To make it easier to run the app locally, I moved all the configuration variables into a separate section at the top of the script.

**Key Takeaway: The Power of Customization**

Adding these features made the app significantly more powerful and engaging. The ability to customize the puzzles and share them with others transformed it from a simple toy into a valuable learning tool.

## Version 3: Bug Fixing and Robustness 🐞
As the app grew in complexity, I started to encounter bugs. The most significant of these was a race condition where a pending visualization from a previous puzzle could be incorrectly attached to a new one.

**Key Takeaway: The Importance of Bug Management**

This bug highlighted the importance of having a solid bug management process in place. By carefully debugging the issue and implementing a request cancellation mechanism, I was able to fix the bug and make the app more robust.

## Version 4: The Final Polish ✨
With the major features in place and the most critical bugs fixed, it was time to add the final layer of polish. This included:

*   **Auto-Saving:** I added an auto-save feature to automatically save puzzles after they were generated.

*   **Content Regeneration:** I added a "Regenerate" button to the solution and visualization sections, with an optional feedback field to guide the AI in refining the content.

*   **Cultural Customization:** I added a country dropdown menu to customize the puzzle's story and context.

*   **Dynamic Illustrations:** I used an image generation API to create and display a unique illustration for each puzzle.

*   **Voice Narration:** I added a text-to-speech feature to read the puzzle aloud, with a selection of different voices.

*   **Settings Tab:** I moved all the configuration options into a dedicated "Settings" tab.

**Key Takeaway: The Devil is in the Details**

These final touches made a huge difference in the overall user experience. The app felt more polished, professional, and engaging.

## Lessons Learned 🎓
This project was a valuable learning experience. Here are some of the key lessons I learned along the way:

*   **Iterative Development is Key:** By starting small and iterating, I was able to build a complex and feature-rich application in a relatively short amount of time.

*   **Security is Paramount:** I learned the importance of keeping secrets out of the codebase and using a separate file for sensitive information.

*   **Localization Matters:** By adding support for different languages and cultural contexts, I was able to make the app accessible to a global audience.

*   **LLMs are Powerful, but Not Perfect:** I learned that LLMs can be a powerful tool for generating creative content, but they're not perfect. It's important to have a solid bug management process in place to deal with the inevitable errors and inconsistencies.

*   **Version Management is a Lifesaver:** When things went wrong, I was always able to go back to a previous working version of the app. This saved me a lot of time and frustration.

I hope this technical story has been helpful. If you're thinking about building your own application with an LLM, I encourage you to jump in and get started. It's a challenging but rewarding experience.

## Try the App and Explore its Features
You can try the "Gen AI Puzzle Solver" app here: [https://gemini.google.com/share/0e45bdacce5d?full-screen=true](https://gemini.google.com/share/0e45bdacce5d?full-screen=true)

The app is packed with features designed to provide a rich and engaging learning experience. Here's a detailed breakdown of what you can do:

*   **Generate Puzzles:** Create new puzzles on demand by clicking the "Generate New Puzzle" button.

*   **Keyword-Based Puzzle Generation:** Input keywords to generate puzzles on specific topics.

*   **Difficulty Levels:** Choose from 10 difficulty levels, from "Elementary School" to "Nobel Winner."

*   **Cultural Customization:** Select a country to customize the puzzle's story and context.

*   **Custom City Input:** Specify a custom city for even more personalized puzzle contexts.

*   **Detailed Solutions:** View a detailed solution for each puzzle, including the core problem, a naive approach, and an optimized solution.

*   **Algorithm Simulation:** Get a text-based simulation of the algorithm to better understand how it works.

*   **Dynamic Illustrations:** See a unique, AI-generated illustration for each puzzle.

*   **Voice Narration:** Listen to the puzzle being read aloud in a variety of voices.

*   **Translation:** Translate the puzzle into different languages and have it read aloud in the translated language.

*   **Save and Manage Puzzles:** Save your favorite puzzles to your personal library and view them later.

*   **Import/Export:** Export your puzzle library to a JSON file and import it back, or export individual puzzles as standalone HTML or Markdown files.

*   **Advanced Social Sharing:** Generate different post formats for Twitter, LinkedIn, and a full blog post in Markdown.
