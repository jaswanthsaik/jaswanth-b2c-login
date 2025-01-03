document.addEventListener('DOMContentLoaded', function () {
  updateFormUI();
});

function updateFormUI() {
  updateInputPlaceholders();
  updateLabels();
  updateErrorMessages();
  updateForgotPasswordLink();
  addFormValidationListener();
}

function updateInputPlaceholders() {
  setInputPlaceholder('signInName', 'email address');
  setInputPlaceholder('password', 'password');
}

function updateLabels() {
  setLabelInnerHTML('label[for="signInName"]', 'Email<span class="required-asterisk">*</span>');
  setLabelInnerHTML('label[for="password"]', 'Password<span class="required-asterisk">*</span>');
  setCheckboxLabel('label[for="rememberMe"]', 'Keep me logged in');
}
function setCheckboxLabel(selector, text) {
  var label = document.querySelector(selector);
  if (label) {
    label.textContent = text;
  }
}

function updateErrorMessages() {
  setErrorMessagesText('The email address was not found. Please try again or contact your system administrator.', 'Please enter your Email Address');
  setErrorMessagesText('Incorrect Password. Please, try again or click on Forgot Password.', 'Please enter your password');
}

function updateForgotPasswordLink() {
  var forgotPasswordLink = document.getElementById('ForgotPasswordExchange');
  if (forgotPasswordLink) {
    forgotPasswordLink.textContent = 'Forgot password?';
  }
}

function setInputPlaceholder(id, placeholder) {
  var input = document.getElementById(id);
  if (input) {
    input.placeholder = placeholder;
  }
}

function setLabelInnerHTML(selector, innerHTML) {
  var label = document.querySelector(selector);
  if (label) {
    label.innerHTML = innerHTML;
  }
}

function setErrorMessagesText(newText, searchText) {
  var errorMessages = document.querySelectorAll('.entry-item .error.itemLevel p');
  errorMessages.forEach(function (message) {
    if (message.textContent.includes(searchText)) {
      message.textContent = newText;
    }
  });
}

function addFormValidationListener() {
  var form = document.getElementById('localAccountForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      validateForm(event, form);
    });
  }
}

function validateForm(event, form) {
  var email = form.querySelector('#signInName');
  var password = form.querySelector('#password');
  var isValid = true;

  isValid &= validateInput(signInName, 'The email address was not found. Please try again or contact your system administrator.');
  isValid &= validateInput(password, 'Incorrect Password. Please, try again or click on Forgot Password.');

  if (!isValid) {
    event.preventDefault();
  }
}

function validateInput(input, errorMessage) {
  if (!input.value.trim()) {
    input.style.border = '1px solid #FF8887';
    showError(input, errorMessage);
    return false;
  } else {
    input.style.border = '';
    hideError(input);
    return true;
  }
}

function showError(input, message) {
  var error = input.nextElementSibling;
  if (error && error.classList.contains('error')) {
    error.textContent = message;
    error.style.display = 'block';
  }
}

function hideError(input) {
  var error = input.nextElementSibling;
  if (error && error.classList.contains('error')) {
    error.style.display = 'none';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateFormUI);
} else {
  updateFormUI();
}
