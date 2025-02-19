

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

// Начальные данные о панелях
const initialVanilamines = [
	{ title: 'Картина 1', image: 'https://via.placeholder.com/200x300', description: 'Описание картины 1', price: 1000, orientation: 'vertical' },
	{ title: 'VanilaMine', image: 'static/deps/images/vanilamine.png', description: 'приватка', price: 10000000000, orientation: 'horizontal' }
];


if (!localStorage.getItem('vanilamines')) {
	localStorage.setItem('vanilamines', JSON.stringify(initialVanilamines));
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

// Сохранение изменений
document.getElementById('saveChanges').addEventListener('click', () => {
    renderAdminVanilamines();
});

// Загрузка данных при открытии админ-панели
renderAdminVanilamines();