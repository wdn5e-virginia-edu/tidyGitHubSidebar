# tidyGitHubSidebar
To bookmark the bookmarklet and for usage notes
see the [index page](https://pages.github.com/).

## view the code as
- [full javascript](https://pages.github.com/)
- [minimized javascript](https://pages.github.com/)
- named *.js so text editors detect syntax
- not intended for standalone use
## minimization
### removes
- /* */ comments
	- spanning multiple lines
	- filling one complete line
- // line-ending comments
- blank lines of any kind
- line breaks
### retains
- all else, specifically:
- /* */ comments
	- within one line
	- among code
	- (in current case, I don't think there are any of these)
- whitespace within lines
	- kept as-is to be cautious