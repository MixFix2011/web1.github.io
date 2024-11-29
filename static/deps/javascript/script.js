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
	const paintingList = document.getElementById('paintingList');
	paintingList.innerHTML = '';

	paintings.forEach((painting) => {
			const item = document.createElement('div');
			item.className = 'painting-item';
			item.innerHTML = `
					<h3>${painting.title}</h3>
					<img src="${painting.image}" alt="${painting.title}">
					<p>${painting.description}</p>
					<p class="price">Цена: <span class="number">${painting.price}</span> руб.</p>
			`;
			paintingList.appendChild(item);
	});
}


function loadSchedule() {
	const schedule = JSON.parse(localStorage.getItem('schedule')) || [];
	const scheduleList = document.getElementById('scheduleList');
	scheduleList.innerHTML = '';

	schedule.forEach((item) => {
			const row = document.createElement('tr');
			row.innerHTML = `
					<td>${item.club}</td>
					<td>${item.price}</td>
					<td>${item.date}</td>
					<td>${item.time}</td>
			`;
			scheduleList.appendChild(row);
	});
}

// Загружается при открытии страницы
loadPaintings();
loadSchedule();

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
