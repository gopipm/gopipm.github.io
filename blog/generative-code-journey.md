+++
title = "A Journey in Generative Code: From Pascal to Modern AI"
date = "2023-03-03"
tags = ["generative-ai", "code-generation", "pascal", "python", "chatgpt", "bard", "software-engineering", "personal-story"]
categories = ["Technology", "Personal Story"]
+++

In 10th grade, I wrote a Pascal program that could generate the source code for another executable program. What fascinated me was that one program could produce another that could run independently. Hence, "Generating Code."

I went on to develop a Computer Graphics program for my final project where I would move the cursor on screen and place geometric shapes, record the coordinates and shape types in a data structure, and use that as input to "Generate code" that would independently execute and re-draw the original figure.

That was one of the first "Aha!" moments for me that motivated me towards Software Engineering.

Here’s a simple example, similar to what I wrote back then. This Pascal program, when compiled and run, doesn't print "Hello, World!" itself. Instead, it creates a new file called `HelloWorld.pas` containing the source code for a program that *does*.

```pascal
program CodeGenerator;

var
  F: Text;

begin
  Assign(F, 'HelloWorld.pas');
  Rewrite(F);
  Writeln(F, 'program HelloWorld;');
  Writeln(F, 'begin');
  Writeln(F, '  Writeln(''Hello, World!'');');
  Writeln(F, 'end.');
  Close(F);
  Writeln('Successfully generated HelloWorld.pas');
end.
```

Years later, I am so blown away that I can generate the same block of code, or much more complex applications, using ChatGPT and Google Bard with a simple text prompt. What a time to be alive!
