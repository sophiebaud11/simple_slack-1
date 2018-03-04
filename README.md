# SIMPLE EXPRESS & SLACK APP TUTORIAL

[Express](https://expressjs.com/) is a ‘minimalist’ framework for [node.js](https://nodejs.org/en/about/) applications. It will offer us a fast, relatively simple way to get started building a web application, which in this case will also involve hooks into our Slack team, making it possible to build slash commands and other useful stuff.

This tutorial is really going to build from the ground up, presuming no knowledge of anything (though in some cases we'll link out to more detailed and comprehensive intros to what's covered here--this is going to teach you the bare minimum required to get this app up and running).  Key tools covered inlude:

- javascript
- node.js
- express.js
- html
- css
- js scripting on client side
- mongodb
- slack api

## CREATING AN BLANK EXPRESS APP

Here are the steps for creating the blank express app template (and connecting it to [github.com](http://www.github.com)).

1. create an empty repository on [github.com](http://www.github.com).  You'll need a github account for this.  As you create the repository, you'll be prompted with some settings options: you want to select "node.js" for the `.gitignore` file type, "MIT" for the license type, and you'll want to check the box for “initialize with a README.”
2. clone to this repository to your computer by opening up Terminal, navigating to your Development folder (`cd ~/Development` on our machines) and pasting in the `git clone [REPO_NAME]` text that you can copy from the repository page. ![clone-repo](https://raw.githubusercontent.com/learninglab-dev/simple_slack/master/public/images/clone-repo.png)
3. if you now type `ls` (for "list"), you should see a folder with the same name as your repository—this is where you are going to put your app
4. change directories into your app's root folder by typing `cd [MY_APP]`
5. use express-generator to create an empty express app template by typing `express —view=ejs` (go ahead and enter `ls` to take a look at what has shown up after this command)
6. install node modules with `npm install`
7. at this point you should be able to type `npm start` and then open the app up in your web browser at [localhost:3000](http://localhost:3000).
8. now that we have an blank template, we will want to begin adding some code, so go back to Terminal (and still inside your app's root folder), type `atom .` to open up the contents of the current directory in Atom (your text editor).
9. you’ll see a bunch of folders and files:
	- `bin` is a folder with an important file that actually starts up your app, but we won’t be touching it
	- `public` is the folder that holds all the files your server will serve up for visitors to your site.  All of your ’static’ html pages can go here. More on how to do this in a bit.
	- `routes` is where we’ll put files that tell your app what to do with users’ requests, like if they type in `www.yourapp.com/theirname/resources` and you want to read their name and send them back the gifs they’ve saved on your service, say.  We won’t actually build a special page for each use that we save in `public`––this would take forever––instead we’ll grab their name, and check for relevant files on the server side, and then plop these into an html template, which brings us to . . .
	- `views`, which holds our view-templates.  In this case we are using ejs (we asked for this when we ran express-generator above), so you’ll see a couple of files with the .ejs extension.  We’ll be doing something to one of them soon.
	- `.gitignore` is the file that tells git what to include and what to exclude when uploading files to github.  As long as you selected ‘node’ from the dropdown menu when creating your repository in github, you shouldn’t need to touch this file while doing this tutorial.
	- `app.js` is a really key file—the heart of your app (I know we said the that file in `bin` is where the app starts, but if you check that file out you’ll see that the very first thing it does is bring in `app.js` with a `require` statement, and then it runs `http.createserver` for the app--don't worry if you're new to js and this all looks confusing right now).  We are going to **add** some things to `app.js`, but we won’t be deleting or changing anything that’s there right now (in this tutorial anyway).
	- `LICENSE` is just a text file with the MIT license.
	- `package.json` is important––you can think of it as holding some of the “settings” of the app. It has a list of dependencies, which are the node_modules we’ll need for the project. `express-generator` put some there already, and when we typed `npm install`, npm looked in this file for the dependencies to install and then downloaded them from the cloud.
	- README.md is where you’ll put notes on your work that you’d like collaborators or other users of your code to see.  Whatever you put here will show up on the github page for your repository.

## ADDING HTML/CSS

To start out, let’s add a basic html page to our public folder and get it connected to some CSS styles (and in the next step, to a JS script).  If you are just using express to start a development server while you explore a client-side js library like d3, for instance, this may be as far as you need to go in this tutorial.  If you already know all about HTML and CSS you can skip this one.

1. In Atom, right-click on the `public` and add a folder for your static page project, in this repo we’ll call ours `first-project`.  Inside this folder we’re going to create a file and save it as `index.html`.
2. If you already know a bunch about HTML, you can get as elaborate as you’d like at this stage, but you are starting out, copy and paste in the following code:
   ```html
    <body>
        <h2>steps</h2>
        <ol>
        <li>create an index.html page</li>
        <li>link it to a style.css page</li>
        <li>link it to a script.js page</li>
        </ol>
    </body>
   ```  
    The `<` and `>` characters define HTML tags, in this case tags for the `body` (which contains the HTML that browser will display), `h2` for the heading, `ol` for ordered list, and `li` for list elements.  Note the way the opening and closing tags for the ordered list (`<ol>` and `</ol>`) bracket the list elements, and the way the body tags bracket everything.  This nesting structure is a big part of what you'll encounter (and become comfortable with) as you learn HTML.
3. if you now go to [localhost:3000/first-project](http://localhost:3000/first-project) in your web browser you should see the page.  For fun, change the `<ol>` and `</ol>` tags (the opening and closing ordered list tags) to `<ul>` and `</ul>` (to change it to an unordered list).  Play around adding other stuff and other tags, including h1, h2, h3, etc for different headings, p for paragraphs, etc.  Don’t forget both opening and closing tags.  For a detailed intro go [here](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals), for a complete reference go [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element).
4. you can add as many pages to this folder as you want, but, unlike `index.html` which has a special status, you’d need to type in the complete path to the document if you want your browser to see it.  For instance, if I put a file called `my-gifs.html` in the `first-project` folder, I would access it at `localhost:3000/first-project/my-gifs.html`.  For `index.html` files, you only need to type in the path to the containing folder (`localhost:3000/first-project`).
5. In order to style the page, we are going to create a `style.css` file (right in the current `first-project` folder).  So right click on your `first-project` folder and create a new file that you save as `style.css`.
6. to connect this file to your html page, you'll need to reopen the `index.html` file.  And when working with both a css file and an html file in Atom, it's nice to be able to see both at once.  So find your html file in the project hierarchy on the left, right-click on it, and select "split right." You should now see your two files side by side.
7. In the `index.html` file, add the following lines of code at the top:
    ```html
    <!DOCTYPE html>
    <html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <title>First Project</title>
        <link rel="stylesheet" href="style.css" type="text/css">
    </head>
    ```
    Unlike the `body`, the `head` of the document doesn't get displayed in the browser, but it still does some useful stuff for us: for instance, it will see to it that the words "First Project" are there in the Chrome or Firefox tab when you open the page in your browser (that's what `<title>` does); and, most importantly for us right now, it will tell your browser to look in the `style.css` stylesheet for info on the styles to apply to your various HTML elements.
8. In your `style.css` file, paste in the following chunk of code:
    ```css
    body {
        background-color: rgba(20,20,20,0.7);
        color: white;
    }

    h2 {
        font-family: Futura;
        font-size: 50px;
        text-transform: uppercase;
    }
    ```
    Once you save it, you should be able to head back to your browser, hit command+R to reload, and see a dramatic difference.  Take a look [here](https://www.w3schools.com/cssref/default.asp) to see some of the properties you can change, and start modifying additional attributes of your HTML elements.
9. The `body` and `h2` you see in the css file are called "selectors", and in many cases using the basic HTML elements as your selectors is great (if you want h1's to be huge and h2's to be medium and h3's to be small and blue, say).  But sometimes you'll want to target a very specific item on your page, or a specific group of elements, and for this we need to start assigning some of your html elements "classes" and "ids".  To get started, grab this chunk of html and paste it in just before your opening `<ol>` tag to add some "divs"--empty divisions of the site that we'll turn into colored boxes:
    ```HTML
    <div id="big-box">
    </div>    
    <div class="small-box">  
    </div>
    <div class="small-box">
    </div>
    <div class="small-box">
    </div>
    ```
    Reload the browser and you should see . . . nothing new.  That's because these divs don't have anything in them, so they are zero pixels high right now. To change this, paste the following into your `style.css` file.
    ```CSS
    .small-box {
      width: 50px;
      height: 50px;
      background-color: rgba(255,0,40,0.7)
    }

    #big-box {
      width: 250px;
      height: 250px;
      background-color: rgba(25,80,200,0.7)
    }
    ```
    The first selector, `.small-box` selects all of the elements with the `small-box` class, while the second selects the **one** element with the id `big-box` (`id`s are exclusive--you can only assign them to one element on a page).  And they each define the width, height, and background-color for the divs.  If you go back the browser now, you should see your boxes.  Change some colors and add some more boxes to get a sense of how all this works.  Add some text to a box and see if you can style it.
10. While most of the interactivity we build will happen with javascript, there are some things you can do with just css.  For instance, if you paste the following chunk of css at the bottom of your `style.css` file and then resize your web browser, you should see the `#big-box` div change size once the browser crosses the 600px-wide threshold:
    ```css
    @media screen and (max-width: 600px)  {
      #big-box {
        width: 100px;
      }
    }
    ```
    Try adding a few more lines--you can change anything you'd like, but usually this sort of "media query" is used to give the page a new layout when it's viewed on a small screen (like a phone).
    Next, add the following little chunk to add some behavior to your `.small-box` divs whenever a user hovers over them with the mouse:
    ```css
    .small-box:hover {
      background-color: rgba(255,240,40,0.9);
      width: 250px;
    }
    ```
    Reload the page and you should see your small red squares turn into wide yellow rectangles when you hover over them.  Try adding a `:hover` selector for one of your other elements, and experiment with changing different properties.
11. To add an extra little bit of polish, add this one line to your `.small-box` css: `transition: 1s;` . . . reload the page and see how much more elegant the `:hover` effects are.  If you are lost at this point, you can find the complete css for this practice project in the [github repository](https://github.com/learninglab-dev/simple_slack/blob/master/public/first-project/style.css).

## JS on the client side

## Creating routes and views


1. Take a look at lines 10 & 27 in `app.js`.  You'll note that require `routes/index.js` and declare that we'll use whatever's there when users make requests at the `'/'` endpoint (i.e. the root of the site we're building).  To see what's currently going on in more detail, let's open up `/routes/index.js` in the left pane on Atom and `/views/index.ejs` in the right pane.  In `index.js` we find the following:
    ```
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });
    ```
    Here we're saying that when a user makes a [get request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) we are going to render a template called `'index'`, and we're going to pass in a javascript object full of data we want the template to render somehow.  In this case we're just sending in a title for the page, but we could be sending in urls of images, user data, giant arrays of information from our database, etc. etc.  To test this out, change the value of `title` to `'Simple Slack App'` and reload [localhost:3000](http://localhost:3000).
2. Now, over in `views/index.ejs` you can see where the `title` value is being sent.  In line 4, we find `<title><%= title %></title>`, in line 8 we find `<h1><%= title %></h1>`, and in line 9 we find `<p>Welcome to <%= title %></p>`.  In each of these three cases, the string 'Simple Slack App' is being passed in and rendered, just as if you would have typed `<title>Simple Slack App</title>`, etc.  The strange `<%= %>` tags are what we need to use to access the `title`, and instead of having to type `data.title` or some such, as you might expect, we get to just use the properties of the object we pass in (from `index.js`) as variables (in `index.ejs`).  We'll also be able to add plain old js (loops, conditionals, etc.) to the `.ejs` files using `<% %>` instead of `<%= %>`, but let's not worry about that yet. To make sure you're grasping how this works, add another property/key along with another value, perhaps `subtitle: 'My First App'` or something like that. Then, over in the `index.ejs` file, do something with it, like maybe `<h2><%= subtitle %>`.
3.

## Handling Post requests

## Starting a Slack App

1. create a new slack team for yourself
2. maybe create a couple of different users so that you can test out privacy-related settings, etc.
3. head to [api.slack.com/apps](https://api.slack.com/apps), where you should be able to see a big "create Slack App" button. ![screenshot01](screenshot01) Click it and call your app whatever you like.  We'll call ours `simple-slack`. ![slack-app-name-screenshot](screenshot2).
4. next up, we're going to do a bunch of stuff in the "add features and functionality" section. ![add-features-and-functionality](screenshot3).  Start by clicking "Incoming Webooks".  Toggle the on/off switch to "on". ![on-off-switch](screenshot4).
5. Towards the bottom of the page, you'll find an "Add New Webhook to Workspace" button. ![add-new-webhook-to-workspace](screenshot5) You'll then be prompted to approve this webhook for posting to a specific channel, and once you do this, you'll be able to copy the slack webhook URL.  
6. To test if it's working, you can copy and paste the "Sample curl request" that gets generated for you and paste it into your Terminal.  This command should send a message to your chosen Slack channel.
7. This webhook URL, and all the other secret keys and tokens you get from Slack, Mongo, etc, should be kept secret, and this means keeping them off of github.  So don't just add these to app.js.  Instead, create a file named `.env` in the root folder and save your tokens and keys there.  In this case, it should have the following format: `SLACK_WEBHOOK=https://hooks.slack.com/services/ABCDE1234/XXXXXXXXXetc`.
8. If you click "Basic Information" at the top of the lefthand sidebar, you'll find three other secret strings you'll want to save securely.  You can call them `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, and `SLACK_VERIFICATION_TOKEN` as add them to your `.env` file.
9. If you're wondering how to access these variables from within your app, all you have to do is
    1. Install `dotenv` by typing `npm i -S dotenv` into the Terminal (while in your app's root folder of course)
    2. Add the following line near the top of your `app.js` file:  `require('dotenv').config();`
    3. To check if this is working, try adding `console.log(process.env.SLACK_WEBHOOK)` to `app.js` and seeing if it logs the right thing out.  This is happening **on the server side**, so your users won't see it (which they WOULD if you were logging it in **their** web-browser consoles)
10.


## Creating a Slash Command

## Using the Web api
