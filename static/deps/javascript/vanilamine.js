function loadPaintingDetails() {
	const urlParams = new URLSearchParams(window.location.search);
	const vanilamineId = urlParams.get('id'); // Получаем ID картины из URL

	const vanilamines = JSON.parse(localStorage.getItem('vanilamines')) || [];
	const vanilamine = vanilamines[vanilamineId]; // Находим нужную картину

	if (vanilamine) {
			document.getElementById('vanilamineTitle').innerText = vanilamine.title;
			document.getElementById('vanilamineImage').src = vanilamine.image;
			document.getElementById('vanilamineDescription').innerText = vanilamine.description;
			document.getElementById('vanilaminePrice').innerText = `Цена: ${vanilamine.price} руб.`;
	}
}

// Загружаем детали картины при открытии страницы
loadPaintingDetails();