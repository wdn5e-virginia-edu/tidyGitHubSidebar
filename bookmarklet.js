(function organizeGithubSidebar() {
	'use strict';

	/*REMOVE ANY H2 FROM PREVIOUS BOOKMARKLET RUN*/
	for (let h2 of document.querySelectorAll('h2.github-sidecar-bookmarklet')) {
		h2.remove();
	}
	const ulQuerySelector = 'aside div.js-repos-container div.js-repos-container ul';
	const lisObject = { };
	const ulsObject = { };

	/*FIXUP EACH LI, DETERMINE WHICH ULS ARE NEEDED*/
	for (let li of document.querySelectorAll(ulQuerySelector + ' li')) {
		const liKey = li.dataset.liKey || li.innerText.trim();
		const parts = liKey.split('/');
		if (parts.length == 2) {
			const ulKey = parts[0];
			ulsObject[ulKey] = null; /*fill this empty slot below*/
			lisObject[liKey] = li;
			/*allow Find a repository... filter to continue to work over list items' full labels*/
			const a = li.querySelector('li div div a');
			const span = document.createElement('span');
			span.style.display = 'none';
			span.innerText = `${parts[0]}/`;
			while (a.firstChild) {
				a.removeChild(a.firstChild);
			}
			a.append(span, parts[1]);
			li.dataset.liKey = liKey;
		}
	}
	const ulKeys = Object.keys(ulsObject).sort();

	/*ADD ANY ADDITIONAL ULS NEEDED*/
	const uls0 = document.querySelector(ulQuerySelector);
	for (let i = document.querySelectorAll(ulQuerySelector).length; i < ulKeys.length; i += 1) {
		uls0.before(uls0.cloneNode());
	}
	const uls = document.querySelectorAll(ulQuerySelector);

	/*ASSIGN EACH UL A KEY IN ORDER*/
	for (let i = 0; i < ulKeys.length; i += 1) {
		ulsObject[ ulKeys[i] ] = uls[i]; /*fill empty slot made above*/
	}

	/*MOVE EACH LI TO ITS CORRESPONDING UL*/
	for (let liKey of Object.keys(lisObject).sort()) {
		const parts = liKey.split('/');
		if (parts.length == 2) {
			const ulKey = parts[0];
			const li = lisObject[liKey];
			const ul = ulsObject[ulKey];
			ul.append(li);
		}
	}

	/*REMOVE ANY UL WITH EMPTY LI; PREPEND LABELING H2*/
	const h2_template = document.querySelector('h2').cloneNode();
	h2_template.classList.add('github-sidecar-bookmarklet');
	h2_template.style.marginTop = '20px';
	for (let i = 0; i < uls.length; i += 1) {
		const ul = uls[i];
		const lis = ul.querySelectorAll('li');
		if (lis && lis.length > 0) {
			const ulKey = ulKeys[i];
			const h2 = h2_template.cloneNode();
			h2.innerText = ulKey;
			ul.before(h2);
		} else {
			const pES = ul.previousElementSibling;
			if (pES && pES.tagName.toUpperCase() == 'H2') {
				pES.remove();
			}
			ul.remove();
		}
	}
})();