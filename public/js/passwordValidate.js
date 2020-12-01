const form = document.querySelector('form');
const password = document.querySelector('form input[name="password"]');
const confirmPassword = document.querySelector(
  'form input[name="confirm-password"]'
);

form.addEventListener('submit', e => {
  e.preventDefault();

  const pass = password.value;
  const confirmPass = confirmPassword.value;

  if (pass === confirmPass) e.target.submit();
});
