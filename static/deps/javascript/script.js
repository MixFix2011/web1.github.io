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
function loadPaintings() {
		const paintings = JSON.parse(localStorage.getItem('paintings')) || [];
		const verticalPaintingList = document.getElementById('verticalPaintingList');
		const horizontalPaintingList = document.getElementById('horizontalPaintingList');

		verticalPaintingList.innerHTML = ''; // Очищаем вертикальную секцию
		horizontalPaintingList.innerHTML = ''; // Очищаем горизонтальную секцию

		paintings.forEach((painting) => {
				const item = document.createElement('div');
				item.className = 'painting-item';
				item.innerHTML = `
						<h3>${painting.title}</h3>
						<img src="${painting.image}" alt="${painting.title}" class=" ${painting.orientation === 'horizontal' ? 'horizontal' : 'vertical'}">
						<p>${painting.description}</p>
						<p class:"price">Цена: ${painting.price} руб.</p>
						<button onclick="location.href='painting.html?id=${paintings.indexOf(painting)}'">Купить</button>
				`;

				if (painting.orientation === 'vertical') {
						verticalPaintingList.appendChild(item); // Добавление в секцию вертикальных картин
				} else {
						horizontalPaintingList.appendChild(item); // Добавление в секцию горизонтальных картин
				}
		});
}

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

function loadMasters() {
	const masters = JSON.parse(localStorage.getItem('masters')) || [];
	const mastersList = document.getElementById('mastersList');
	mastersList.innerHTML = '';

	masters.forEach((item, index) => {
			const card = document.createElement('div');
			card.className = 'schedule-card';
			card.innerHTML = `
					<h3>${item.title}</h3>
					<p>Цена: ${item.price} руб.</p>
					<p>Дата: ${item.date}</p>
					<p>Время: ${item.time}</p>
					<button onclick="location.href='club.html?id=${index}'">Записаться</button>
			`;
			mastersList.appendChild(card);
	});
}

// Загружается при открытии страницы
loadPaintings();
loadVanilamines();
loadMasters();



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
