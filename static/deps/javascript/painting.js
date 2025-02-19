function loadPaintingDetails() {
	const urlParams = new URLSearchParams(window.location.search);
	const paintingId = urlParams.get('id'); // Получаем ID картины из URL

	const paintings = JSON.parse(localStorage.getItem('paintings')) || [];
	const painting = paintings[paintingId]; // Находим нужную картину

	if (painting) {
			document.getElementById('paintingTitle').innerText = painting.title;
			document.getElementById('paintingImage').src = painting.image;
			document.getElementById('paintingDescription').innerText = painting.description;
			document.getElementById('paintingPrice').innerText = `Цена: ${painting.price} руб.`;
	}
}

// Загружаем детали картины при открытии страницы
loadPaintingDetails();
