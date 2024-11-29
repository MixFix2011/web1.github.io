document.getElementById('loginForm').addEventListener('submit', function (event) {
	event.preventDefault(); // Отменяем стандартное поведение формы

	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	const users = [
		{ username: 'admin', password: 'adminpass' },
		{ username: 'vova', password: '1234' }
		// Добавьте других пользователей по необходимости
	];

	const user = users.find(u => u.username === username && u.password === password);

	if (user) {
			// Если данные совпадают, создаем сессию admin и перенаправляем
			sessionStorage.setItem('role', 'admin');
			window.location.href = 'admin/main.html'; // Замените на нужный URL
	} else {
			alert('Неверный логин или пароль');
	}
});
// Выход из админ панели
const logoutButton = document.getElementById('logout');
if (logoutButton) {
    logoutButton.addEventListener('click', function() {
        sessionStorage.removeItem('role'); // удаляем сессию
        window.location.href = '/index.html';
    });
}
