import initMap, {addMarkers, addInfo} from './map';
export default (() => {
	const list = document.querySelector('#locationsList');

	/** nice to have search by name feature */
	const Search = document.querySelector('#Search');
	Search.addEventListener('keyup', filter);

	function filter() {
		// Declare variables
		var h3, i, txtValue;
		let input = document.getElementById('Search');
		let filter = input.value.toUpperCase();
		let ul = document.getElementById("locationsList");
		let li = ul.getElementsByTagName('li');

		// Loop through all list items, and hide those who don't match the search query
		let liLength = li.length;
		for (i = 0; i < liLength; i++) {
			h3 = li[i].getElementsByTagName("h3")[0];
			txtValue = h3.textContent || h3.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				li[i].style.display = "";
			} else {
				li[i].style.display = "none";
			}
		}
	}

	function createImage(src) {
		var x = document.createElement("IMG");
		x.setAttribute("src", src);
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

		const marker = addMarkers(name.textContent, doc.data().location.lat, doc.data().location.long);

		li.appendChild(createImage(doc.data().logo));
		li.appendChild(name);
		li.appendChild(description);
		li.onclick = addInfo.bind(this, name.textContent, marker[0], marker[1]);
		list.appendChild(li);
	}

	/**
	 * this function exposed when called it generate list 
	 * of restaurant
	 */
	function restoList() {
		initMap();
		db.collection('restoLocations').onSnapshot((snapshot) => {
			let changes = snapshot.docChanges();
			changes.forEach(element => {
				renderStocks(element.doc);
			});
		});
	}
	return restoList;
})();


