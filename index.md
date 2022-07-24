# tidyGitHubSidebar
This bookmarklet makes it easier to read and use
GitHub's web interface on Sign in.
Specifically, it sorts and groups _Recent Repositories_ in the left sidebar.

A bookmarklet is javascript encoded as a bookmark.
Bookmarks usually replace a web page with another web page.
But a bookmarklet generally changes the current page — without going to another web page.

See the [readme page](https://github.com/wdn5e-virginia-edu/tidyGitHubSidebar/readme)
for code and notes.
	# store the bookmarklet as a browser bookmark
- bookmark <a href="javascript:(function organizeGitHubSidebar() { 'use strict'; /*REMOVE ANY H2 FROM PREVIOUS BKMKLET RUN*/ for (let h2 of document.querySelectorAll('h2.github-sidecar-bkmklet')) { h2.remove(); } const ulQuerySelector = 'aside div.js-repos-container div.js-repos-container ul'; const lisObject = { }; const ulsObject = { }; /*FIXUP EACH LI, DETERMINE WHICH ULS ARE NEEDED*/ for (let li of document.querySelectorAll(ulQuerySelector + ' li')) { const liKey = li.dataset.liKey || li.innerText.trim(); const parts = liKey.split('/'); if (parts.length == 2) { const ulKey = parts[0]; ulsObject[ulKey] = null; /*make empty slot to fill below*/ lisObject[liKey] = li; li.querySelector('li div div a').innerText = parts[1]; li.dataset.liKey = liKey; } } const ulKeys = Object.keys(ulsObject).sort(); /*ADD ANY ADDITIONAL ULS NEEDED*/ const uls0 = document.querySelector(ulQuerySelector); for (let i = document.querySelectorAll(ulQuerySelector).length; i < ulKeys.length; i += 1) { uls0.before(uls0.cloneNode()); } const uls = document.querySelectorAll(ulQuerySelector); /*ASSIGN EACH UL A KEY IN ORDER*/ for (let i = 0; i < ulKeys.length; i += 1) { ulsObject[ ulKeys[i] ] = uls[i]; /*fill empty slot made above*/ } /*MOVE EACH LI TO ITS CORRESPONDING UL*/ for (let liKey of Object.keys(lisObject).sort()) { const parts = liKey.split('/'); if (parts.length == 2) { const ulKey = parts[0]; const li = lisObject[liKey]; const ul = ulsObject[ulKey]; ul.append(li); } } /*REMOVE ANY UL WITH EMPTY LI; PREPEND LABELING H2*/ const h2_template = document.querySelector('h2').cloneNode(); h2_template.classList.add('github-sidecar-bkmklet'); h2_template.style.marginTop = '20px'; for (let i = 0; i < uls.length; i += 1) { const ul = uls[i]; const lis = ul.querySelectorAll('li'); if (lis && lis.length > 0) { const ulKey = ulKeys[i]; const h2 = h2_template.cloneNode(); h2.innerText = ulKey; ul.before(h2); } else { const pES = ul.previousElementSibling; if (pES && pES.tagName.toUpperCase() == 'H2') { pES.remove(); } ul.remove(); } } })();">&nbsp;this link&nbsp;</a>
	- as you would any link on a web page
	- don't simply click as if you're using it to go to a different web page
	- the bookmarklet code is "behind" that link
	- store its bookmark where you want among the other bookmarks stored in your browser
	- you only need to do this once
- if your browser supports doing this with a context menu (Chrome doesn't):
	- right-click _&nbsp;this link&nbsp;_ above
		- this may be _&nbsp;control + click&nbsp;_ on your mouse, trackpad, etc.
	- a context menu will pop up
	- select _&nbsp;Bookmark Link&nbsp;_ from that context menu
		- this may be _&nbsp;Add Link to Bookmarks...&nbsp;_ or other wording
	# click the bookmarklet to tidy the GitHub sidebar
- open [GitHub](https://github.com/) and sign in if needed
- click on your browser's bookmarklet bookmark
	- this time it's a normal click, *not a right-click*
- your browser will remain on the GitHub page
- but that page's left sidebar will be tidied by the bookmarklet


		# you may need to click the bookmarklet again
- if you reload the GitHub page
- or the sidebar contents change, especially from your using
	- the _&nbsp;Find a repository...&nbsp;_ filter
	- the _&nbsp;Show more&nbsp;_ link