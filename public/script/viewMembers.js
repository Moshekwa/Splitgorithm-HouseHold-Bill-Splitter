'use strict'
// members in a house hold
fetch('/splitgorithm/api/list') // Returns a Promise for the GET request
  .then(function (response) {
    // Check if the request returned a valid code
    if (response.ok) { return response.json() } // Return the response parse as JSON if code is valid
    else { throw 'Failed to load classlist: response code invalid!' }
  })
  .then(function (data) {
    // Display the JSON data appropriately
    // Retrieve the Members List outer element
    const button = document.getElementById('addButton1')
    const membersList = document.getElementById('membersList')
    // Iterate through all housemembers
    button.addEventListener('click', function () {
      data.forEach(function (housemate) {
      // Create a new list entry
        const li = document.createElement('LI')
        const liText = document.createTextNode(housemate.name)
        // Append list text to list item and list item to list
        li.appendChild(liText)
        membersList.appendChild(li)
      })
    })
  })
  .catch(function (e) { // Process error for request
    alert(e) // Displays a browser alert with the error message.
    // This will be the string thrown in line 7 IF the
    // response code is the reason for jumping to this
    // catch() function.
  })
