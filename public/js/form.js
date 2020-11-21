let timeout = null;

const messageStrings = {
  blank: 'Enter ID',
  searhing: 'Searching',
  notFound: 'Record not found'
};

const idInput = document.querySelector('.form__item input[name="id"]');
const record = document.querySelector('.record');
const message = document.querySelector('.message');
const submit = document.querySelector('.form button[type="submit"]');

function showRecord() {
  message.classList.add('display-hidden');
  record.classList.remove('visibility-hidden');

  submit.disabled = false;
}

function showMessage() {
  record.classList.add('visibility-hidden');
  message.classList.remove('display-hidden');

  submit.disabled = true;
}

function search(id, cb) {
  const record = {
    id: id,
    date: '2020-09-21',
    amount: 123,
    type: 'debit',
    tags: ['qwe', 'asd'],
    description: '123'
  };

  timeout = setTimeout(() => {
    if (parseInt(id, 10) % 2 !== 0) {
      cb(null);
    } else {
      cb(record);
    }
  }, 1 * 1000);
}

idInput.addEventListener('input', e => {
  const value = e.target.value;

  if (timeout) clearTimeout(timeout);

  if (value === '') {
    message.innerText = messageStrings.blank;
    showMessage();
  } else {
    message.innerText = messageStrings.searhing;
    showMessage();

    search(value, record => {
      if (record == null) {
        message.innerText = messageStrings.notFound;
      } else {
        showRecord();
      }
    });
  }
});
