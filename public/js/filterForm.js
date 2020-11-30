const form = document.querySelector('form');
const error = document.querySelector('.error');

form.addEventListener('submit', e => {
  e.preventDefault();

  const id = {
    start: document.querySelector('form input[name="id-start"]').value,
    end: document.querySelector('form input[name="id-end"]').value
  };

  if (id.start && id.end && +id.start > +id.end) {
    error.innerText = 'Start id must be less than end id';
    return;
  }
  error.innerText = '';

  const date = {
    start: document.querySelector('form input[name="date-start"]').value,
    end: document.querySelector('form input[name="date-end"]').value
  };

  if (date.start && date.end && new Date(date.start) > new Date(date.end)) {
    error.innerText = 'Start date must be before end date';
    return;
  }
  error.innerText = '';

  const amount = {
    start: document.querySelector('form input[name="amount-start"]').value,
    end: document.querySelector('form input[name="amount-end"]').value
  };

  if (
    amount.start &&
    amount.end &&
    parseFloat(amount.start) > parseFloat(amount.end)
  ) {
    error.innerText = 'Start amount must be less than end amount';
    return;
  }
  error.innerText = '';

  e.target.submit();
});
