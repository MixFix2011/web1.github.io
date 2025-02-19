

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

// Начальные данные о мероприятиях
const initialMasters = [
	{ title: 'Мастер-класс по рисованию', image: 'https://via.placeholder.com/200', description: 'Изучите техники живописи', price: 1500, date: '2023-09-01', time: '10:00' },
	{ title: 'Мастер-класс по графике', image: 'https://via.placeholder.com/200', description: 'Создайте свои собственные графические работы', price: 1200, date: '2023-09-03', time: '16:00' }
];

// Начальные данные о панелях
const initialVanilamines = [
	{ title: 'Картина 1', image: 'https://via.placeholder.com/200x300', description: 'Описание картины 1', price: 1000, orientation: 'vertical' },
	{ title: 'Картина 2', image: 'https://via.placeholder.com/300x200', description: 'Описание картины 2', price: 1500, orientation: 'horizontal' }
];

// Записываем начальные данные в localStorage, если они не установлены
if (!localStorage.getItem('paintings')) {
    localStorage.setItem('paintings', JSON.stringify(initialPaintings));
}

if (!localStorage.getItem('masters')) {
	localStorage.setItem('masters', JSON.stringify(initialMasters));
}

if (!localStorage.getItem('vanilamines')) {
	localStorage.setItem('vanilamines', JSON.stringify(initialVanilamines));
}

// Рендеринг картин в админ-панели
function renderAdminPaintings() {
    const adminPaintings = document.getElementById('adminPaintings');
    adminPaintings.innerHTML = ''; // Очистка
    const paintings = JSON.parse(localStorage.getItem('paintings')); // Получаем картины

    paintings.forEach((painting, index) => {
        const item = document.createElement('div');
        item.innerHTML = `
          <div class="admin-item">
              <h3>${painting.title}</h3>
              <input type="text" value="${painting.title}" onchange="updatePaintingTitle(${index}, this.value)">
              <input type="url" value="${painting.image}" onchange="updatePaintingImage(${index}, this.value)">
              <textarea onchange="updatePaintingDescription(${index}, this.value)">${painting.description}</textarea>
              <input type="number" value="${painting.price}" onchange="updatePaintingPrice(${index}, this.value)">
              <label>Ориентация:</label>
              <label>
                  <input type="radio" name="orientation${index}" value="vertical" ${painting.orientation === 'vertical' ? 'checked' : ''} onchange="updatePaintingOrientation(${index}, 'vertical')"> Вертикальная
              </label>
              <label>
                  <input type="radio" name="orientation${index}" value="horizontal" ${painting.orientation === 'horizontal' ? 'checked' : ''} onchange="updatePaintingOrientation(${index}, 'horizontal')"> Горизонтальная
              </label>
              <button onclick="deletePainting(${index})">Удалить</button>
          </div>
      `;
        adminPaintings.appendChild(item);
    });
}

// Обновляем ориентацию картинки
function updatePaintingOrientation(index, orientation) {
    const paintings = JSON.parse(localStorage.getItem('paintings'));
    paintings[index].orientation = orientation;
    localStorage.setItem('paintings', JSON.stringify(paintings));
}

// Добавление новой картины
document.getElementById('addPaintingButton').addEventListener('click', () => {
    const title = document.getElementById('newPaintingTitle').value;
    const image = document.getElementById('newPaintingImage').value;
    const description = document.getElementById('newPaintingDescription').value;
    const price = document.getElementById('newPaintingPrice').value;
    const orientation = document.getElementById('newPaintingOrientation').value;

    if (title && image && description && price) {
        const paintings = JSON.parse(localStorage.getItem('paintings')) || [];
        paintings.push({ title, image, description, price: Number(price), orientation });
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
// Удаление картины
function deletePainting(index) {
    const paintings = JSON.parse(localStorage.getItem('paintings'));
    paintings.splice(index, 1);
    localStorage.setItem('paintings', JSON.stringify(paintings));
    renderAdminPaintings();
}

// Рендеринг для отображения панелей в админ панели
function renderAdminVanilamines() {
	const adminVanilamines = document.getElementById('adminVanilamines');
	adminVanilamines.innerHTML = ''; // Очистка
	const vanilamines = JSON.parse(localStorage.getItem('vanilamines')); // Получаем картины

	vanilamines.forEach((vanilamine, index) => {
			const item = document.createElement('div');
			item.className = 'admin-item';
			item.innerHTML = `
					<h3>Панель ${index + 1}</h3>
					<input type="text" value="${vanilamine.title}" onchange="updateVanilamineTitle(${index}, this.value)">
					<input type="url" value="${vanilamine.image}" onchange="updateVanilamineImage(${index}, this.value)">
					<textarea onchange="updateVanilamineDescription(${index}, this.value)">${vanilamine.description}</textarea>
					<input type="number" value="${vanilamine.price}" onchange="updateVanilaminePrice(${index}, this.value)">
					<label>Ориентация:</label>
					<label><input type="radio" name="orientation${index}" value="vertical" ${vanilamine.orientation === 'vertical' ? 'checked' : ''} onchange="updateVanilamineOrientation(${index}, 'vertical')"> Вертикальная</label>
					<label><input type="radio" name="orientation${index}" value="horizontal" ${vanilamine.orientation === 'horizontal' ? 'checked' : ''} onchange="updateVanilamineOrientation(${index}, 'horizontal')"> Горизонтальная</label>
					<button onclick="deleteVanilamine(${index})">Удалить</button>
			`;
			adminVanilamines.appendChild(item);
	});
}
// Обновляем ориентацию панели
function updateVanilamineOrientation(index, orientation) {
    const vanilamines = JSON.parse(localStorage.getItem('vanilamines'));
    vanilamines[index].orientation = orientation;
    localStorage.setItem('vanilamines', JSON.stringify(vanilamines));
}
// Добавление новой панели
document.getElementById('addVanilamineButton').addEventListener('click', () => {
	const title = document.getElementById('newVanilamineTitle').value;
	const image = document.getElementById('newVanilamineImage').value;
	const description = document.getElementById('newVanilamineDescription').value;
	const price = document.getElementById('newVanilaminePrice').value;
	const orientation = document.querySelector('input[name="orientation"]:checked').value;

	if (title && image && description && price) {
			const vanilamines = JSON.parse(localStorage.getItem('vanilamines')) || [];
			vanilamines.push({ title, image, description, price: Number(price), orientation });
			localStorage.setItem('vanilamines', JSON.stringify(vanilamines));

			// Сбрасываем поля
			document.getElementById('newVanilamineTitle').value = '';
			document.getElementById('newVanilamineImage').value = '';
			document.getElementById('newVanilamineDescription').value = '';
			document.getElementById('newVanilaminePrice').value = '';

			renderAdminVanilamines();
	} else {
			alert("Все поля должны быть заполнены!");
	}
});
// Удаление панели
function deleteVanilamine(index) {
    const vanilamines = JSON.parse(localStorage.getItem('vanilamines'));
    vanilamines.splice(index, 1);
    localStorage.setItem('vanilamines', JSON.stringify(vanilamines));
    renderAdminVanilamines();
}


// Функция для отображения расписания кружков в админ-панели
function renderAdminMasters() {
	const adminMasters = document.getElementById('adminMasters');
	adminMasters.innerHTML = ''; // Очистка
	const masters = JSON.parse(localStorage.getItem('masters')); // Получаем мастер-классы

	masters.forEach((master, index) => {
			const item = document.createElement('div');
			item.className = 'admin-item';
			item.innerHTML = `
					<h3>${master.title}</h3>
					<input type="text" value="${master.title}" onchange="updateMasterTitle(${index}, this.value)">
					<input type="url" value="${master.image}" onchange="updateMasterImage(${index}, this.value)">
					<textarea onchange="updateMasterDescription(${index}, this.value)">${master.description}</textarea>
					<input type="number" value="${master.price}" onchange="updateMasterPrice(${index}, this.value)">
					<input type="date" value="${master.date}" onchange="updateMasterDate(${index}, this.value)">
					<input type="time" value="${master.time}" onchange="updateMasterTime(${index}, this.value)">
					<button onclick="deleteMaster(${index})">Удалить</button>
			`;
			adminMasters.appendChild(item);
	});
}

// Добавление нового мастер-класса
document.getElementById('addMasterButton').addEventListener('click', () => {
	const title = document.getElementById('newMasterTitle').value;
	const image = document.getElementById('newMasterImage').value;
	const description = document.getElementById('newMasterDescription').value;
	const price = document.getElementById('newMasterPrice').value;
	const date = document.getElementById('newMasterDate').value;
	const time = document.getElementById('newMasterTime').value;

	if (title && image && description && price && date && time) {
			const masters = JSON.parse(localStorage.getItem('masters')) || [];
			masters.push({ title, image, description, price: Number(price), date, time });
			localStorage.setItem('masters', JSON.stringify(masters));

			// Сбрасываем поля
			document.getElementById('newMasterTitle').value = '';
			document.getElementById('newMasterImage').value = '';
			document.getElementById('newMasterDescription').value = '';
			document.getElementById('newMasterPrice').value = '';
			document.getElementById('newMasterDate').value = '';
			document.getElementById('newMasterTime').value = '';

			renderAdminMasters();
	} else {
			alert("Все поля должны быть заполнены!");
	}
});
// Удаление мастер-класса
function deleteMaster(index) {
	const masters = JSON.parse(localStorage.getItem('masters'));
	masters.splice(index, 1);
	localStorage.setItem('masters', JSON.stringify(masters));
	renderAdminMasters();
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

// Обновление данных панелей
function updateVanilamineTitle(index, title) {
	const vanilamines = JSON.parse(localStorage.getItem('vanilamines'));
	vanilamines[index].title = title;
	localStorage.setItem('vanilamines', JSON.stringify(vanilamines));
}

function updateVanilamineImage(index, image) {
	const vanilamines = JSON.parse(localStorage.getItem('vanilamines'));
	vanilamines[index].image = image;
	localStorage.setItem('vanilamines', JSON.stringify(vanilamines));
}

function updateVanilamineDescription(index, description) {
	const vanilamines = JSON.parse(localStorage.getItem('vanilamines'));
	vanilamines[index].description = description;
	localStorage.setItem('vanilamines', JSON.stringify(vanilamines));
}

function updateVanilaminePrice(index, price) {
	const vanilamines = JSON.parse(localStorage.getItem('vanilamines'));
	vanilamines[index].price = price;
	localStorage.setItem('vanilamines', JSON.stringify(vanilamines));
}

// Обновление мастер-классов
function updateMasterTitle(index, title) {
	const masters = JSON.parse(localStorage.getItem('masters'));
	masters[index].title = title;
	localStorage.setItem('masters', JSON.stringify(masters));
}

function updateMasterImage(index, image) {
	const masters = JSON.parse(localStorage.getItem('masters'));
	masters[index].image = image;
	localStorage.setItem('masters', JSON.stringify(masters));
}

function updateMasterDescription(index, description) {
	const masters = JSON.parse(localStorage.getItem('masters'));
	masters[index].description = description;
	localStorage.setItem('masters', JSON.stringify(masters));
}

function updateMasterPrice(index, price) {
	const masters = JSON.parse(localStorage.getItem('masters'));
	masters[index].price = price;
	localStorage.setItem('masters', JSON.stringify(masters));
}

function updateMasterDate(index, date) {
	const masters = JSON.parse(localStorage.getItem('masters'));
	masters[index].date = date;
	localStorage.setItem('masters', JSON.stringify(masters));
}

function updateMasterTime(index, time) {
	const masters = JSON.parse(localStorage.getItem('masters'));
	masters[index].time = time;
	localStorage.setItem('masters', JSON.stringify(masters));
}

// Сохранение изменений
document.getElementById('saveChanges').addEventListener('click', () => {
    renderAdminPaintings();
    renderAdminVanilamines();
    renderAdminMasters();
});

// Загрузка данных при открытии админ-панели
renderAdminPaintings();
renderAdminVanilamines();
renderAdminMasters();