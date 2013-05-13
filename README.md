
# The Chaos Collective Library for the the Browser

Rapid Prototyping library for javascript in the browser.

Our focus is on building a simple base library that enables ideas to be quickly realized and experienced. 

# CORE

As a foundation for quickly building prototypes, all apps should first include a small set of core javascript files:

* jQuery: DOM manipulation.
* Less: CSS with lots tons of helpers.
* Init_browser: Polyfill to make life easier as browsers add new features and change over time (+ a few key functions we wish existed in the browser).

Once the core is loaded, we load the final exlicity javascript call to RequireJS; this sets the app in motion and recursively resolve dependencies in subsequence modules to run everything.

* RequireJS: Simple and powerful way to manage lots of little packages and resolve dependecies on the fly.

# MODULES

## community

Simple integration with the community. Discussions via Disqus, and simple links for sharing on Twitter, Facebook, and Google+.

    settings.community = {
      disqus_shortname: 'YOUR_SITE_SHORTNAME'
    };

## readme

    settings.readme    = {
      project_base_url: "http://example.com/?Project=" // projectID gets appended to this
    } 

## lessadder






