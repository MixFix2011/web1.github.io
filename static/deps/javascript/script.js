// Спойлер
let hide = document.querySelector(".hide");
function dots() {
  let dot = document.createElement("div");
  dot.className = "dot";
  dot.style.top = hide.offsetHeight * Math.random() + "px";
  dot.style.left = hide.offsetWidth * Math.random() + "px";
  let size = Math.random() * 0.5;
  dot.style.height = size + "mm";
  dot.style.width = size + "mm";
  hide.appendChild(dot);
}

// Загрузка экрана
window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 500);
}
// page

function loadVanilamines() {
	const vanilamines = JSON.parse(localStorage.getItem('vanilamines')) || [];
	const vanilamineList = document.getElementById('vanilamineList');
	vanilamineList.innerHTML = '';

	vanilamines.forEach((vanilamine, index) => {
			const item = document.createElement('div');
			item.className = 'vanilamine-item';
			item.innerHTML = `
					<h3>${vanilamine.title}</h3>
					<img src="${vanilamine.image}" alt="${vanilamine.title}">
					<p>${vanilamine.description}</p>
					<p>Цена: ${vanilamine.price} руб.</p>
					<button onclick="location.href='vanilamine.html?id=${index}'">Купить</button>
			`;
			vanilamineList.appendChild(item);
	});
}

// Загружается при открытии страницы
loadVanilamines();



// выпадающее меня
function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {

	var dropdowns = document.getElementsByClassName("dropdown-content");
	var i;
	for (i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
		}
	}
}
}


// строка поиска
document.getElementById('searchButton').addEventListener('click', function() {
	const keyword = document.getElementById('search').value.toLowerCase();
	const filteredPaintings = paintings.filter(painting => 
			painting.title.toLowerCase().includes(keyword) || 
			painting.description.toLowerCase().includes(keyword)
	);

	renderPaintings(filteredPaintings);
});

document.getElementById('search').addEventListener('keypress', function(e) {
	if (e.key === 'Enter') {
			document.getElementById('searchButton').click();
	}
});
