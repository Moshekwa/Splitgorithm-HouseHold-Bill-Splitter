'use strict'
// current balance value
fetch('/splitgorithm/api/payments') // Returns a Promise for the GET request
  .then(function (response) {
    // Check if the request returned a valid code
    if (response.ok) { return response.json() } // Return the response parse as JSON if code is valid
    else { throw 'Failed to load classlist: response code invalid!' }
  })
  .then(function (data) {
    // Display the JSON data appropriately
    const button = document.getElementById('addBalance')
    const balance = document.getElementById('balance')
    const group = document.getElementById('group')

    // data.forEach(function (elem) {
    button.addEventListener('click', function () {
      // Create a new list entry

      const li = document.createElement('LI')
      const liText = document.createTextNode('You are owed: R' + data[1] + ', You owe: R' + data[2] + ', Current Balance: R' + data[3] + ', In Group: ' + data[4])
      // Append list text to list item and list item to list
      li.appendChild(liText)
      balance.appendChild(li)
    })
    // })
  })
  .catch(function (e) { // Process error for request
    alert(e) // Displays a browser alert with the error message.
    // This will be the string thrown in line 7 IF the
    // response code is the reason for jumping to this
    // catch() function.
  })
