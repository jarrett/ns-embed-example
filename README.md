# Number Stories JS Documentation & Examples

## Required skills

This documentation assumes a working knowledge of client-side web programming. In other
words: HTML, JavaScript (JS), and CSS. Knowledge of
[Bootstrap](https://getbootstrap.com/), [jQuery](https://api.jquery.com/), and
[Underscore](http://underscorejs.org/) is recommended but not strictly necessary. An
introduction to these topics is outside the scope of this manual.

This documentation also assumes very basic knowledge of the terminal, a.k.a. the command
prompt. How to open a terminal:

* [Mac OSX](http://blog.teamtreehouse.com/introduction-to-the-mac-os-x-command-line)
* [Windows](http://windows.microsoft.com/en-us/windows-vista/open-a-command-prompt-window)

Frequently, these instructions will tell you to "run" a command. That means to type or
paste the command into the terminal window and press enter.

## Basic Concepts

Number Stories activities consist of *contexts* and *questions*. (From the end-user's
perspective, contexts are called "stories." This discrepancy in naming exists for
historical reasons.) Each question belongs to exactly one context. Each context can own
number of questions.

Contexts and questions are written in the standard languages of the web: HTML, JS, and
CSS. Each context and each question is a single web page. Like any other web page, it
consists of a single HTML file and associated assets such as images, CSS files, and JS
files. The HTML file and its assets are grouped together into a folder layout. For
example, a typical context folder might be structured like this:

    context-name
    |-- context.html
    |-- assets
        |-- css
        |   |-- bootstrap.css
        |   |-- buttons.css
        |-- img 
        |   |-- background.png
        |   |-- baseball.png
        |-- js
            |-- jquery.js
            |-- math.js

Although contexts and questions start out as separate web pages, they merge together in
a process called *compilation*. This produces a single web page featuring the content from
both the context and the question. That way, the end user can enjoy both without having
to switch back and forth between two windows. It also means that the context and the
question can interact with each other. For example, a question could contain a slider that
changes the value of a variable within the context.

## Getting Started

### Installing Ruby

The Ruby programming language must be installed on your computer.

**Mac**: Ruby should be pre-installed with OS X. To verify, run `ruby -v`. If Ruby is
installed, it'll print a version number. If not, it'll say "command not found." Contact
Jarrett if Ruby isn't installed.

**Windows**: Try [RubyInstaller](http://rubyinstaller.org/).

**Linux**: Try [RVM](https://rvm.io/).

### Installing and updating the `question_compiler` gem

Ruby programs are distributed in packages called "gems." We've published a gem for
compiling Number Stories questions. Our gem is called `question_compiler`. To install it,
run:

    gem install question_compiler

At the start of each work session, you should ensure that the gem is up-to-date. Run:

    gem update question_compiler

### Downloading the project folder and example code

You'll be working in a project folder. All contexts and questions will be in subfolders.
The project folder, including example code, is available on
[GitHub](https://github.com/jarrett/ns-embed-example). You can download a ZIP—look for the
button on the right side of the page. Or, If you know how to use Git, you can get the
example code by running:

    git clone https://github.com/jarrett/ns-embed-example.git

Again, if you know Git, you can update to the latest example code at any time by running
this in the `ns-embed-example` folder:

    git pull origin master

You should end up with a folder layout like this:

    ns-embed-example
    |-- compiled
    |-- contexts
    |   |-- jarrett
    |       |-- example
    |-- questions
    |   |-- jarrett
    |       |-- example
    |-- zip
     
Contexts are stored in `contexts/username/context-name`. Similarly, questions are stored
in `questions/username/question-name`.

## Creating a context

Throughout these instructions, look at the example code under `contexts/jarrett/example`.

You need a subfolder of `contexts` for your Number Stories account. So if your Number
Stories username is `pat`, create the folder `contexts/pat` (if it doesn't already
exist). Within that folder, create a folder for your new context. So if your context will
be called "Baseball Stats", create the folder `contexts/pat/baseball-stats`. Within that
folder, create an empty text file called `context.html`. Also within `baseball-stats`,
create the folder `assets` with subfolders `css`, `img`, and `js`. You should have a
folder layout like this:

    ns-embed-example
    |-- contexts
       |-- pat
           |-- baseball-stats
               |-- assets
               |   |-- css
               |   |-- img
               |   |-- js
               |-- context.html

You can put anything you want in `context.html`, so long as you end up with a valid HTML
document. Usually, `context.html` will refer to stylesheets in the `css` folder, images in
the `img` folder, and scripts in the `js` folder. Look at
`contexts/jarrett/example/context.html` for an example.

## Creating a question

Throughout these instructions, look at the example code under `questions/jarrett/example`.

As with contexts, create a subfolder of `questions` for your username, then another
subfolder for your new question. Create `question.html`, `assets/css`, `assets/img`, and
`assets/js`. You should have a folder layout like this:

    ns-embed-example
    |-- contexts
    |  |-- pat
    |      |-- baseball-stats
    |          |-- assets
    |          |   |-- css
    |          |   |-- img
    |          |   |-- js
    |          |-- context.html
    |-- questions
       |-- pat
           |-- batting-average
               |-- assets
               |   |-- css
               |   |-- img
               |   |-- js
               |-- question.html

## Testing a context or a question with a development webserver

While you're working on a context or a question, you'll want to test it in the web browser.
The `question_compiler` Ruby gem provides a *development webserver* for this purpose. So
first, make sure you have the gem installed. See [Installing and updating the
`question_compiler` gem](#installing-and-updating-the-question_compiler-gem) above.

To start the webserver, open a terminal and navigate (`cd`) to the root folder of the
context or question. For example, in the folder layout pictured above, you'd navigate to
either `baseball-stats` or `batting-average`. Then run `qc -s` to start the server. E.g.:

    cd ns-embed-example/contexts/pat/baseball-stats
    qc -s

A development webserver should now be running. You can access it in your browser by
visiting:

* [http://localhost:3000/context.html](http://localhost:3000/context.html) or
* [http://localhost:3000/question.html](http://localhost:3000/question.html)

The server will automatically compile questions and contexts together as appropriate. See
"[Compiling with a development webserver](#compiling-with-a-development-webserver)" below.

## Embedding a context into a question

Typically, a question will *embed* exactly one context. This is achieved by including an
*embed div* in `question.html`. You can find an example in
`questions/jarrett/example/question.html`. The embed div looks like this:

    <div data-embed-context="pat/baseball-stats"></div>

The `data-embed-context` attribute has two parts: the username and the context's *embed
code*. The username is the *author's* Number Stories username. (Remember that the user
marked as the author isn't necessarily the one who uploaded the context.) The embed code
is a string that you set when you upload the context. It must match the folder name in the
folder layout pictured above. Embed codes should be all lower case, should not include
special characters, and should use hyphens in place of spaces. For example, a context
titled "Letters & Numbers" could have the embed code `letters-and-numbers`.

When you embed a context, a few things things happen:

* All markup inside the `<body>` tag of `context.html` is copied into `question.html`
  at the site of embedding.
* All `<link>`, `<style>`, and `<script>`tags in the `<head>` tag of `context.html`
  are copied into the `<head>` tag of `question.html`.
* All files in the context's `assets` folder will be copied into the question's `assets`
  folder. So be sure the filenames don't conflict.

For example, consider this minimal `context.html`:

    <!DOCTYPE html>
    <html>
      <head>
        <script src="assets/js/baseball-stats.js" type="text/javascript"></script>
        <link src="assets/css/baseball-stats.css" type="text/css" rel="stylesheet"/>
      </head>
      <body>
        <h1>Context: Baseball Stats</h1>
      </body>
    </html>

Suppose you've set its embed code to `example-context`, and your username is `pat`. Now
suppose you embed the context into `question.html` like so:

    <!DOCTYPE html>
    <html>
      <head>
        <title>Baseball Stats</title>
        <script src="assets/js/batting-average.js" type="text/javascript"></script>
        <link src="assets/css/batting-average.css" type="text/css" rel="stylesheet"/>
      </head>
      <body>
        <div data-embed-context="pat/baseball-stats"></div>
        <h1>Question: Batting Average</h1>
      </body>
    </html>

When you compile the question ([see below](#compiling-a-question)), `question.html` will
be transformed into this:

    <!DOCTYPE html>
    <html>
      <head>
        <title>Batting Average</title>
        <script src="assets/js/baseball-stats.js" type="text/javascript"></script>
        <script src="assets/js/batting-average.js" type="text/javascript"></script>
        <link src="assets/css/baseball-stats.css" type="text/css" rel="stylesheet"/>
        <link src="assets/css/batting-average.css" type="text/css" rel="stylesheet"/>
      </head>
      <body>
        <div data-embed-context="pat/baseball-stats">
          <h1>Context: Baseball Stats</h1>
        </div>
        <h1>Question: Batting Average</h1>
      </body>
    </html>

## Compiling a question

So far, you've learned how to specify an embedded context with
`<div data-embed-context="">`, and you've learned what effect this will have upon
compilation. To review: A question may *embed* exactly one context. When the question is
*compiled*, the embedded context will be merged into the question.

Now you'll learn how to actually trigger the compilation. There are three ways to compile:

1. [With a development webserver](#compiling-with-a-development-webserver)
2. [Uploading to the Number Stories site](#compiling-with-a-development-webserver)
3. [Manually](#compiling-manually)

### Compiling with a development webserver

Earlier, in "[Testing a context or question with a development webserver]
(#testing-a-context-or-question-with-a-development-webserver)," you learned how to start a
development webserver. When you test a question with the webserver, the server
automatically compiles the embedded context into the question. This happens every time you
refresh the page.

### Compiling by uploading to the Number Stories site

When you upload a JS question, the Number Stories website will automatically compile the
question. If you download the question again, you'll get the compiled version (not the
un-compiled version that you uploaded).

The first step is to create ZIP files of your context and question. (This does not invoke
the compiler. Compilation will occur when you upload the ZIP file.) The
`question_compiler` gem automates the process of creating ZIP files:

    cd ns-embed-example
    qc -z

There should now be one or more ZIP files in the `zip` folder. Questions have the
extension `.qst.zip`, and contexts have the extension `.ctx.zip`. Log in to Number Stories.

Create a new JavaScript context or edit an existing one. Type the context's embed code
into the form. Setting the embed code is essential. If you don't set the embed
properly, the question won't be able to find the context at compile time. Attach the
`.ctx.zip` file and submit the form.

Under that context, create a new JavaScript question or edit an existing one. Attach the
`.qst.zip` file and submit the form. This will trigger compilation.

Visit the student view of the question. It should be compiled and working now, just like
when you tested on your local development server.

Warning: You can create a mismatch between the context that owns the question and the
embed tag. For example, consider this scenario. You have two contexts: "Baseball Stats"
and "Climate." You create a question called "Batting Average" under the context "Baseball
Stats." In "Batting Average," you mistakenly embed "Climate" by writing
`<div data-embed-context="pat/climate">`. The compiler will dutifully embed the "Climate"
context into "Batting Average" even though the parent context of "Batting Average" is
really "Baseball Stats." The site won't report any errors, but your question will be
illogical. So it's your responsibility to make sure your embed tags are correct.

### Compiling manually

If for some reason you want to, you can compile a question manually. The results go
into the `compiled` folder. Run:

    cd ns-embed-example
    qc -c pat/batting-average

You wouldn't normally need to do this, though.