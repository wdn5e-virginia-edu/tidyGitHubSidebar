# tidyGitHubSidebar
This bookmarklet makes it easier to read and use
GitHub's web interface — specifically its left sidebar.

It works only on github.com

A bookmarklet is javascript encoded as a bookmark.
Bookmarks usually replace a web page with another web page.
But a bookmarklet generally changes the current page without going to another web page.

right-click <a href="javascript:(function organizeGitHubSidebar() { 'use strict'; /*REMOVE ANY H2 FROM PREVIOUS BKMKLET RUN*/ for (let h2 of document.querySelectorAll('h2.github-sidecar-bkmklet')) { h2.remove(); } const ulQuerySelector = 'aside div.js-repos-container div.js-repos-container ul'; const lisObject = { }; const ulsObject = { }; /*FIXUP EACH LI, DETERMINE WHICH ULS ARE NEEDED*/ for (let li of document.querySelectorAll(ulQuerySelector + ' li')) { const liKey = li.dataset.liKey || li.innerText.trim(); const parts = liKey.split('/'); if (parts.length == 2) { const ulKey = parts[0]; ulsObject[ulKey] = null; /*make empty slot to fill below*/ lisObject[liKey] = li; li.querySelector('li div div a').innerText = parts[1]; li.dataset.liKey = liKey; } } const ulKeys = Object.keys(ulsObject).sort(); /*ADD ANY ADDITIONAL ULS NEEDED*/ const uls0 = document.querySelector(ulQuerySelector); for (let i = document.querySelectorAll(ulQuerySelector).length; i < ulKeys.length; i += 1) { uls0.before(uls0.cloneNode()); } const uls = document.querySelectorAll(ulQuerySelector); /*ASSIGN EACH UL A KEY IN ORDER*/ for (let i = 0; i < ulKeys.length; i += 1) { ulsObject[ ulKeys[i] ] = uls[i]; /*fill empty slot made above*/ } /*MOVE EACH LI TO ITS CORRESPONDING UL*/ for (let liKey of Object.keys(lisObject).sort()) { const parts = liKey.split('/'); if (parts.length == 2) { const ulKey = parts[0]; const li = lisObject[liKey]; const ul = ulsObject[ulKey]; ul.append(li); } } /*REMOVE ANY UL WITH EMPTY LI; PREPEND LABELING H2*/ const h2_template = document.querySelector('h2').cloneNode(); h2_template.classList.add('github-sidecar-bkmklet'); h2_template.style.marginTop = '20px'; for (let i = 0; i < uls.length; i += 1) { const ul = uls[i]; const lis = ul.querySelectorAll('li'); if (lis && lis.length > 0) { const ulKey = ulKeys[i]; const h2 = h2_template.cloneNode(); h2.innerText = ulKey; ul.before(h2); } else { const pES = ul.previousElementSibling; if (pES && pES.tagName.toUpperCase() == 'H2') { pES.remove(); } ul.remove(); } } })();">&nbsp;here&nbsp;</a> to bookmark the bookmarklet in your browser


## how to use it
### store the bookmarklet as a browser bookmark
- right-click <a href="javascript:(function organizeGitHubSidebar() { 'use strict'; /*REMOVE ANY H2 FROM PREVIOUS BKMKLET RUN*/ for (let h2 of document.querySelectorAll('h2.github-sidecar-bkmklet')) { h2.remove(); } const ulQuerySelector = 'aside div.js-repos-container div.js-repos-container ul'; const lisObject = { }; const ulsObject = { }; /*FIXUP EACH LI, DETERMINE WHICH ULS ARE NEEDED*/ for (let li of document.querySelectorAll(ulQuerySelector + ' li')) { const liKey = li.dataset.liKey || li.innerText.trim(); const parts = liKey.split('/'); if (parts.length == 2) { const ulKey = parts[0]; ulsObject[ulKey] = null; /*make empty slot to fill below*/ lisObject[liKey] = li; li.querySelector('li div div a').innerText = parts[1]; li.dataset.liKey = liKey; } } const ulKeys = Object.keys(ulsObject).sort(); /*ADD ANY ADDITIONAL ULS NEEDED*/ const uls0 = document.querySelector(ulQuerySelector); for (let i = document.querySelectorAll(ulQuerySelector).length; i < ulKeys.length; i += 1) { uls0.before(uls0.cloneNode()); } const uls = document.querySelectorAll(ulQuerySelector); /*ASSIGN EACH UL A KEY IN ORDER*/ for (let i = 0; i < ulKeys.length; i += 1) { ulsObject[ ulKeys[i] ] = uls[i]; /*fill empty slot made above*/ } /*MOVE EACH LI TO ITS CORRESPONDING UL*/ for (let liKey of Object.keys(lisObject).sort()) { const parts = liKey.split('/'); if (parts.length == 2) { const ulKey = parts[0]; const li = lisObject[liKey]; const ul = ulsObject[ulKey]; ul.append(li); } } /*REMOVE ANY UL WITH EMPTY LI; PREPEND LABELING H2*/ const h2_template = document.querySelector('h2').cloneNode(); h2_template.classList.add('github-sidecar-bkmklet'); h2_template.style.marginTop = '20px'; for (let i = 0; i < uls.length; i += 1) { const ul = uls[i]; const lis = ul.querySelectorAll('li'); if (lis && lis.length > 0) { const ulKey = ulKeys[i]; const h2 = h2_template.cloneNode(); h2.innerText = ulKey; ul.before(h2); } else { const pES = ul.previousElementSibling; if (pES && pES.tagName.toUpperCase() == 'H2') { pES.remove(); } ul.remove(); } } })();">&nbsp;here&nbsp;</a> to bookmark the bookmarklet in your browser
	- this may be _&nbsp;control + click&nbsp;_ on your mouse, trackpad, etc.
	- the bookmarklet code is "behind" the _&nbsp;here&nbsp;_ link
- a context menu will pop up
- select _&nbsp;Bookmark Link&nbsp;_ from that context menu
	- your browser may word that menu item differently
	- Add Link to Bookmarks... (s)
- add the bookmarklet as you would any bookmark,
placing it among the bookmarks stored in your browser.


### click the bookmarklet to tidy the GitHub sidebar
####once the bookmarklet is a bookmark in your browser:
- open [GitHub](https://github.com/) and sign in, if needed
- click on your browser's bookmarklet bookmark
	- this is a normal click, *not a right-click*
- your browser will remain on the GitHub page
- but that page's left sidebar will be changed by the bookmarklet


#### you may need to click the bookmarklet again
- if you reload the GitHub page
- or the sidebar contents change

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