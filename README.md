
# The Chaos Collective: Client/Browser Library
  
![ChaosLibClient](img/banner_720x135.jpg)

Rapid Prototyping library for javascript in the browser.

Our focus is on building a simple base library that enables ideas to be quickly realized and experienced. 

***

**Core Components**

As a foundation for quickly building prototypes, all apps should first include a small set of core javascript files:

* jQuery: DOM manipulation.
* Less: CSS with tons of helpers.
* Init_browser: Polyfill to make life easier as browsers add new features and change over time (+ a few key functions we wish existed in the browser).

Once the core is loaded, we load the final javascript call to RequireJS; this sets the app in motion and recursively resolves dependencies in subsequence modules to run everything.

* RequireJS: Simple and powerful way to manage lots of little packages and resolve dependecies on the fly.

Note that RequireJS also has a nice tool to optimize (read: combine and minify) modules when development moves beyond the initial exploration. This is super cool because it enable code to be built into lots of specific modular libraries and then sewn together as one.

***

**3rd Party**

We've added a handful of 3rd party open source javascript libraries for convenience. These include:

* markdown

# community

The `community` module allows for, you guessed it, simple integration with the community. Discussions via Disqus, and simple links for sharing on Twitter, Facebook, and Google+.

**settings**

    settings.community = {
      disqus_shortname: 'YOUR_SITE_SHORTNAME'
    };

# readme

The `readme` module makes including a project's info (in markdown format) a snap.

**settings**

    settings.readme    = {
      project_base_url: "http://example.com/?Project=" // projectID gets appended to this
    } 

# lessadder

The `lessadder` module enables for adding LESS (sugared CSS) via javascript. 

This allows both inclusion by filename, as well as directly passing in LESS code to be parsed and added to the DOM. Any module that has a DOM interface and can be styled is likely to make use of lessadder and dynamically include the modules corresponding stylesheet as needed.
 
# ui

The `ui` module is a set of handy user interface widgets for interacting with the user is common ways. For example, alerting a user of a problem, asking for text input, or giving them a yes or no questions; and all of it done asynchronously with callbacks.

**ui.alert**(message, callback)

    ui.alert("Here's a nice little message.", function(){
      console.log("alert closed.");
    });

**ui.confirm**(question, callback)

    ui.confirm("Do you really want to do this?", function(confirmed){
      if(confirmed){
        console.log("yep, do it.");
      }else{
        console.log("nope. don't do it.");
      }
    });

**ui.prompt**(question, currentVal, placeholderVal, callback)

    ui.prompt("What is your name?", "", "Ms. Bojangles", function(answer){
      if(answer){
        console.log("Hello, "+answer);
      }else{
        console.log("No answer because dialog was "+((answer===null)?"closed":"blank"));
      }
    });

**ui.prompList**(question, arrayOfValsAndDescriptions, selectedVal, callback)

    ui.promptList("What is your favorite food?", [
        ["apples",   "Apples"],
        ["bananas",  "Bananas"],
        ["icecream", "Ice Cream"],
        ["lasagna",  "Lasagna"],
        ["munster",  "Munster Cheese"],
        ["pastries", "Pastries"],
        ["wine",     "Wine"]
      ], "pastries", function(answer){
      if(answer){
        console.log("Your new favorite is: "+answer);
      }else{
        console.log("No answer, dialog was closed");
      }
    });

***

**styling**

While the UI module will provide some simple defaults, changing the style of the dialog is super easy. 

Since CSS uses the most specific rule when applying style, you just need to give it a rule that is slightly more specific than what's in the default theme. So here all we need to do is start the rule with `div` and we'll be good to go.

For example, here's how you could **style the background color of the dialog**:

    div.ui_d_body {
      background: orange; 
    }

or **style the buttons to have rounded corners**:

    div.ui_d_body .btn {
      border-radius: 10px; 
    }

or **change the text color of the confirm dialog**:

    div.ui_d_body.confirm {
      color: #FF6;
    }




