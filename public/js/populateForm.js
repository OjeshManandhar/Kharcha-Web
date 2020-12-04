let timeout = null;

const messageStrings = Object.freeze({
  blank: 'Enter ID',
  searhing: 'Searching',
  notFound: 'Record not found'
});

const ERequestStatus = Object.freeze({
  notSent: 0,
  sent: 1
});

const idInput = document.querySelector('.form__item input[name="id"]');
const record = document.querySelector('.record');
const message = document.querySelector('.block__message');
const submit = document.querySelector('.form button[type="submit"]');
const autoPopulateElem = document.querySelector('.auto-populate');

// For aborting search request
let requestStatus = ERequestStatus.notSent;
const controller = new AbortController();
const signal = controller.signal;

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

function populateFields(record) {
  const tagName = autoPopulateElem.tagName;

  if (tagName === 'DIV') {
    document.querySelector(
      '.auto-populate div[auto-populate-data="date"]'
    ).innerText = record.date;

    document.querySelector(
      '.auto-populate div[auto-populate-data="id"]'
    ).innerText = record.id;

    document.querySelector(
      '.auto-populate div[auto-populate-data="amount"]'
    ).innerText = 'Rs. ' + record.amount;

    document.querySelector(
      '.auto-populate div[auto-populate-data="type"]'
    ).innerText = record.type;

    document.querySelector(
      '.auto-populate div[auto-populate-data="tags"]'
    ).innerText = record.tags.join(', ');

    document.querySelector(
      '.auto-populate div[auto-populate-data="description"]'
    ).innerText = record.description;
  }

  if (tagName === 'FORM') {
    document.querySelector('.auto-populate input[name="date"]').value =
      record.date;

    document.querySelector('.auto-populate input[name="amount"]').value =
      record.amount;

    document.querySelector(
      `.auto-populate input[name="type"][value="${record.type.toLowerCase()}"]`
    ).checked = true;

    document.querySelector(
      '.auto-populate input[name="tags"]'
    ).value = record.tags.join(', ');

    document.querySelector(
      '.auto-populate textarea[name="description"]'
    ).innerHTML = record.description;
  }
}

function search(recordId, cb) {
  // Abort previous request
  if (requestStatus === ERequestStatus.sent) {
    controller.abort();
    console.log('Abort request');
  }

  // Send new request
  requestStatus = ERequestStatus.sent;
  console.log('Send request');
  fetch(
    window.location.protocol + '//' + window.location.host + '/records/detail',
    {
      method: 'POST',
      signal: signal,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: recordId
      })
    }
  )
    .then(response => {
      requestStatus = ERequestStatus.notSent;

      if (response.ok) return response.json();

      return undefined;
    })
    .then(response => {
      if (Object.entries(response).length === 0) {
        cb(null);
      } else {
        cb(response);
      }
    })
    .catch(err => {
      requestStatus = ERequestStatus.notSent;
      console.log('Fetch error:', err);
      cb(null);
    });
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
        populateFields(record);
      }
    });
  }
});
