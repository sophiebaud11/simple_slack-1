## SIMPLE EXPRESS & SLACK APP TUTORIAL

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

### CREATING AN BLANK EXPRESS APP

Here are the steps for creating the blank express app template (and connecting it to [github.com](http://www.github.com)).

1. create empty repository on [github.com](http://www.github.com) (with "node.js" selected for the `.gitignore` file, "MIT" selected for the license type, and “initialize with a README” checked)
2. clone to Dev folder with `git clone [REPO_NAME]`
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

### CREATING AN HTML/CSS/JS PROJECT

To start out, let’s add a basic html page to our public folder and get it connected to some CSS styles and JS script (and if you are just using express to start a development server while you explore a client-side js library like d3, for instance, this may be as far as you need to go in this tutorial).

1. In Atom, right-click on the `public` and add a folder for your static page project, in this repo we’ll call ours `first-project`.  Inside this folder we’re going to create a file and save it as `index.html`.
<li> If you already know a bunch about HTML, you can get as elaborate as you’d like at this stage, but you are starting out, copy and paste in the following code:
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
</l1>
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

This will do a couple of things: first, it will see to it that the words "First Project" are there in the Chrome or Firefox tab when you open the page in your browser (that's what `<title>` does); second, it will tell your browser to look in the `style.css` stylesheet for info on the styles to apply to your various HTML elements.
8. In your `style.css` file, paste in the following chunk of code:
    ```
body {
	background-color: rgba(20,20,20,0.7);
	color: white;
}
h2 {
	font-family: Futura;
	text-transform: uppercase;
}
    ```
Once you save it, you should be able to head back to your browser, hit command+R to reload, and see a dramatic difference.
9. ok.
