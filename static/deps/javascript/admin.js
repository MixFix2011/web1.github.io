

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


// page content
// Начальные данные о картинах
const initialPaintings = [
	{ title: 'Картина 1', image: 'static/deps/images/404.png', description: 'Описание картины 1', price: 1000 },
	{ title: 'Картина 2', image: 'static/deps/images/404.png', description: 'Описание картины 2', price: 1500 }
];

// Начальные данные о кружках
const initialSchedule = [
	{ club: 'Рисование', price: 500, date: '2023-09-01', time: '16:00 - 18:00' },
	{ club: 'Графика', price: 400, date: '2023-09-03', time: '17:00 - 19:00' }
];

// Записываем начальные данные в localStorage, если они не установлены
if (!localStorage.getItem('paintings')) {
	localStorage.setItem('paintings', JSON.stringify(initialPaintings));
}

if (!localStorage.getItem('schedule')) {
	localStorage.setItem('schedule', JSON.stringify(initialSchedule));
}

// Функция для отображения картин в админ-панели
function renderAdminPaintings() {
  const adminPaintings = document.getElementById('adminPaintings');
  adminPaintings.innerHTML = ''; // Очистка
  const paintings = JSON.parse(localStorage.getItem('paintings')) || []; // Получаем картины

  paintings.forEach((painting, index) => {
      const item = document.createElement('div');
      item.innerHTML = `
          <h3>Картина ${index + 1}</h3>
          <input type="text" value="${painting.title}" onchange="updatePaintingTitle(${index}, this.value)">
          <input type="url" value="${painting.image}" onchange="updatePaintingImage(${index}, this.value)">
          <textarea onchange="updatePaintingDescription(${index}, this.value)">${painting.description}</textarea>
          <input type="number" value="${painting.price}" onchange="updatePaintingPrice(${index}, this.value)">
          <button onclick="deletePainting(${index})">Удалить</button>
      `;
      adminPaintings.appendChild(item);
  });
}

// Функция для добавления новой картины
document.getElementById('addPaintingButton').addEventListener('click', () => {
  const title = document.getElementById('newPaintingTitle').value;
  const image = document.getElementById('newPaintingImage').value;
  const description = document.getElementById('newPaintingDescription').value;
  const price = document.getElementById('newPaintingPrice').value;

  if (title && image && description && price) {
      const paintings = JSON.parse(localStorage.getItem('paintings')) || [];
      paintings.push({ title, image, description, price: Number(price) });
      localStorage.setItem('paintings', JSON.stringify(paintings));

      // Сбрасываем поля
      document.getElementById('newPaintingTitle').value = '';
      document.getElementById('newPaintingImage').value = '';
      document.getElementById('newPaintingDescription').value = '';
      document.getElementById('newPaintingPrice').value = '';

      renderAdminPaintings();
  } else {
      alert("Все поля должны быть заполнены!");
  }
});

// Загрузка данных при открытии админ-панели
renderAdminPaintings();


// Функция для отображения расписания кружков в админ-панели
function renderAdminSchedule() {
	const adminSchedule = document.getElementById('adminSchedule');
	adminSchedule.innerHTML = ''; // Очистка
	const schedule = JSON.parse(localStorage.getItem('schedule')); // Получаем расписание кружков

	schedule.forEach((item, index) => {
			const row = document.createElement('div');
			row.className = 'admin-item';
			row.innerHTML = `
					<h3>Кружок ${index + 1}</h3>
					<input type="text" value="${item.club}" onchange="updateScheduleClub(${index}, this.value)">
					<input type="number" value="${item.price}" onchange="updateSchedulePrice(${index}, this.value)">
					<input type="date" value="${item.date}" onchange="updateScheduleDate(${index}, this.value)">
					<input type="text" value="${item.time}" onchange="updateScheduleTime(${index}, this.value)">
			`;
			adminSchedule.appendChild(row);
	});
}

// Удаление картины
function deletePainting(index) {
  const paintings = JSON.parse(localStorage.getItem('paintings'));
  paintings.splice(index, 1);
  localStorage.setItem('paintings', JSON.stringify(paintings));
  renderAdminPaintings();
}
// Обновление данных картины
function updatePaintingTitle(index, title) {
	const paintings = JSON.parse(localStorage.getItem('paintings'));
	paintings[index].title = title;
	localStorage.setItem('paintings', JSON.stringify(paintings));
}

function updatePaintingImage(index, image) {
	const paintings = JSON.parse(localStorage.getItem('paintings'));
	paintings[index].image = image;
	localStorage.setItem('paintings', JSON.stringify(paintings));
}

function updatePaintingDescription(index, description) {
	const paintings = JSON.parse(localStorage.getItem('paintings'));
	paintings[index].description = description;
	localStorage.setItem('paintings', JSON.stringify(paintings));
}

function updatePaintingPrice(index, price) {
	const paintings = JSON.parse(localStorage.getItem('paintings'));
	paintings[index].price = price;
	localStorage.setItem('paintings', JSON.stringify(paintings));
}

// Обновление данных о кружках
function updateScheduleClub(index, club) {
	const schedule = JSON.parse(localStorage.getItem('schedule'));
	schedule[index].club = club;
	localStorage.setItem('schedule', JSON.stringify(schedule));
}

function updateSchedulePrice(index, price) {
	const schedule = JSON.parse(localStorage.getItem('schedule'));
	schedule[index].price = price;
	localStorage.setItem('schedule', JSON.stringify(schedule));
}

function updateScheduleDate(index, date) {
	const schedule = JSON.parse(localStorage.getItem('schedule'));
	schedule[index].date = date;
	localStorage.setItem('schedule', JSON.stringify(schedule));
}

function updateScheduleTime(index, time) {
	const schedule = JSON.parse(localStorage.getItem('schedule'));
	schedule[index].time = time;
	localStorage.setItem('schedule', JSON.stringify(schedule));
}

// Сохранение изменений
document.getElementById('saveChanges').addEventListener('click', () => {
	renderAdminPaintings();
	renderAdminSchedule();
});

// Загрузка данных при открытии админ-панели
renderAdminPaintings();
renderAdminSchedule();
