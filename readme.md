#code for this bookmarklet
Here is the [full javascript](https://pages.github.com/)

Here is the [minimized javascript](https://pages.github.com/)
, with the javascript: "protocol" not yet added.

##To minimize the code,
###I removed
* multi-line /* */ comments ,retaining any non-commentedcode on the first and final lines
* single-line /* */ comments with no code on the line
* single-line end-of-line // comments
* blank lines of any kind
* line breaks
###but retained:
* any single-line /* */ comments with code on the line (in current case, I don't think there are any)
* whitespace within lines, as-is (to be cautious)

The bookmarklet link and usage notes are on the [index page](https://pages.github.com/)