+++
title = "Context Free Art Studio"
date = "2026-05-02"
image = "welcome_11.png"
tags = ["art", "generative", "wasm", "react"]
categories = ["art", "generative"]
type = "gallery"
description = "A powerful, real-time studio for creating recursive fractal art using Context Free Design Grammar. Features a Monaco editor and Wasm rendering engine."
+++

<div style="width: 100%; border: 1px solid #333; border-radius: 8px; overflow: hidden; background: #000; margin-bottom: 10px;">
    <iframe src="/art/context-free/app/index.html" width="100%" height="900px" style="border:none;"></iframe>
</div>

<p align="right">
    <a href="/art/context-free/app/index.html" style="color: #888; font-size: 0.8rem; text-decoration: none;">[ Launch Fullscreen Mode ]</a>
</p>

### About this Project
This is a full-featured studio for **Context Free Design Grammar (CFDG)**. It allows you to create complex, recursive fractal art using a simple text-based grammar.

The engine is written in C++ and compiled to **WebAssembly**, providing high-performance rendering directly in your browser.

**Credits & Acknowledgements:**
- **Original Project**: This studio is based on the [Context Free Art](https://www.contextfreeart.org/) project.
- **Original Authors**: The grammar, engine, and example sketches are the work of **Chris Coyne, John Horigan, and Mark Lentczner**. 
- **Web Port**: This web-based implementation was developed with the assistance of **Gemini** to bring the power of CFDG to a modern browser environment.

### Key Features
- **Monaco Editor**: A professional-grade code editor with syntax highlights.
- **Wasm Engine**: Real-time rendering of your designs.
- **Local Gallery**: Save and organize your variations using browser IndexedDB.
- **Disk Sync**: (Local only) Automatically syncs your designs to your physical `gallery/` folder when running the Node.js backend.

### Sample Designs
Check out the pre-loaded examples in the dropdown menu (Tree, Welcome, Sierpinski, Cilia) to see what's possible!
