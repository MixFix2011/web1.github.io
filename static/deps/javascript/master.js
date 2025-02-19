function loadClubDetails() {
	const urlParams = new URLSearchParams(window.location.search);
	const clubId = urlParams.get('id');

	const masters = JSON.parse(localStorage.getItem('masters')) || [];
	const master = masters[clubId];

	if (master) {
			document.getElementById('clubTitle').innerText = master.title;
			document.getElementById('clubImage').src = master.image;
			document.getElementById('clubDescription').innerText = master.description;
			document.getElementById('clubPrice').innerText = `Цена: ${master.price} руб.`;
			document.getElementById('clubDate').innerText = `Дата: ${master.date}`;
			document.getElementById('clubTime').innerText = `Время: ${master.time}`;
	}
}

document.getElementById('registerButton').addEventListener('click', function() {
	alert(`Вы записались на мастер-класс ${document.getElementById('clubTitle').innerText}.`);
});

// Загружаем детали мастер-класса при открытии страницы
loadClubDetails();
