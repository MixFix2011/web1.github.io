document.getElementById('loginForm').addEventListener('submit', function (event) {
	event.preventDefault();

	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	const users = [
		{ username: 'Turbik01', password: '1234' },
		{ username: 'MixFix', password: '1234' }
	];

	const user = users.find(u => u.username === username && u.password === password);

	if (user) {
			sessionStorage.setItem('role', 'admin');
			window.location.href = 'admin/main.html';
	} else {
			alert('Неверный логин или пароль');
	}
});

const logoutButton = document.getElementById('logout');
if (logoutButton) {
    logoutButton.addEventListener('click', function() {
        sessionStorage.removeItem('role');
        window.location.href = '/index.html';
    });
}
