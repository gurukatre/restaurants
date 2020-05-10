export default (() => {
	const list = document.querySelector('#locationsList');

	function createImage(src, width, height, alt) {
		var x = document.createElement("IMG");
		x.setAttribute("src", src);
		x.setAttribute("width", width);
		x.setAttribute("height", height);
		x.setAttribute("alt", alt);
		return x;
	}

	function truncateString(str, num) {
		// replace new line with space
		if (str) {
			str = str.replace(/(?:\\r\\n|\\r|\\n)/g, ' ');
			if (str.length <= num) {
				return str;
			}
			// Return str truncated with '...' concatenated to the end of str.
			return str.slice(0, num) + '...'
		}
	}

	/**
	 * create elements and generate list
	 */
	function renderStocks(doc) {
		let li = document.createElement('li');
		let name = document.createElement('h3');
		let description = document.createElement('p');

		li.setAttribute('data-id', doc.id);
		name.textContent = doc.data().name;
		description.textContent = truncateString(doc.data().description, 100);

		li.appendChild(createImage(doc.data().logo));
		li.appendChild(name);
		li.appendChild(description);
		list.appendChild(li);
	}

	/**
	 * this function exposed when called it generate list 
	 * of restaurant
	 */
	function restoList() {
		db.collection('restoLocations').onSnapshot((snapshot) => {
			let changes = snapshot.docChanges();
			console.log(changes);
			changes.forEach(element => {
				renderStocks(element.doc);
			});
		});
	}
	return restoList;
})();


