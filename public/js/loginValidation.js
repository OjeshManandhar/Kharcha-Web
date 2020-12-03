const form = document.querySelector('form');
const error = document.querySelector('.error');
const username = document.querySelector('form input[name="username"]');
const password = document.querySelector('form input[name="password"]');
const confirmPassword = document.querySelector(
  'form input[name="confirm-password"]'
);

form.addEventListener('submit', e => {
  e.preventDefault();

  if (username && username.value.indexOf('') > -1) {
    error.innerText = 'Username cannot contain space.';
    return;
  }

  const pass = password.value;
  const confirmPass = confirmPassword.value;

  if (pass === confirmPass) e.target.submit();
});
