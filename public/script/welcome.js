'use strict'

const toggle = function (button) {
  const password = document.getElementById('password')
  if (password.type === 'password') {
    button.innerHTML = 'Hide'
    password.type = 'text'
  } else {
    button.innerHTML = 'Show'
    password.type = 'password'
  }
}
