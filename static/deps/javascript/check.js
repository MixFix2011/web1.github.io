// Проверяем наличие сессии при загрузке админ страницы
if (window.location.pathname.endsWith('admin.html')) {
	if (sessionStorage.getItem('role') !== 'admin') {
			window.location.href = 'index.html';
	}
}
const logoutButton = document.getElementById('logout');
if (logoutButton) {
    logoutButton.addEventListener('click', function() {
        sessionStorage.removeItem('role'); // удаляем сессию
        window.location.href = 'index.html';
    });
}