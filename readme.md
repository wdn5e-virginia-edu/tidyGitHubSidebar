# tidyGitHubSidebar

See the [index page](https://wdn5e-virginia-edu.github.io/tidyGitHubSidebar/)
to bookmark the bookmarklet in your browser and for usage notes.

## code
- [full javascript](bookmarklet.js)
- code files are named *.js so text editors detect syntax
- they aren't intended for standalone use

## code minimization
- [minimized javascript](bookmarklet.min.js)
- replaces  with a single space
	- // line-ending comments
	- /* */ comments spanning multiple lines
	- line endings
- then reduces consecutive whitespace characters to a single space
- (would retain /* */ comments among code on a single line)

## how it works
### GitHub's HTML
- has an unlabeled list which contains a list item for each repo
- `wdn5e-virginia-edu/test1` is an example list item text label
- each list item text label ends with the repo name, and
- begins with the individual user name or with the name of the associated organization
- (a '/' slash separates these 2 parts of the text label)


#### there may also be a _&nbsp;Show more&nbsp;_ link beneath that
- clicking on that link adds more list items into a new unlabeled list
- using the _&nbsp;Find a repository...&nbsp;_ text entry also does this


### what this bookmarklet changes
- makes and labels n + 1 lists
	- for each of the n distinct organizations listed in your sidebar
	- and for you as an individual;
- groups list items into their corresponding list
	- alphabetically ordered,
- creating or removing lists to get the count right
- labels the lists with appropriate individual or organization name
- removes from each list item its individual or associated organization name
	- leaving list items labeled only with repo name

#### this bookmarklet can be rerun as needed
- a rerun is especially needed after clicking the _&nbsp;Show more&nbsp;_  link.
- the bookmarklet doesn't leave any code behind to listen and react to that click
or to other DOM events