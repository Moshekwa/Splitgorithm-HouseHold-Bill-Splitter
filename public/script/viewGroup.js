'use strict'

fetch('/splitgorithm/api/groups') // Returns a Promise for the GET request
  .then(function (response) {
    // Check if the request returned a valid code
    if (response.ok) return response.json() // Return the response parse as JSON if code is valid
    else { throw 'Failed to load grouplist: response code invalid!' }
  })
  .then(function (data) { // Display the JSON data appropriately
    const buttonG = document.getElementById('buttons4')
    const groupNames = document.getElementById('groupNames')
    buttonG.addEventListener('click', function () {
      data.forEach(function (group) {
          // Create a new list entry
          const li = document.createElement('LI')
         li.innerHTML = group.memberUserName
          // Append list text to list item and list item to list
        //   li.appendChild(liText)
          groupNames.appendChild(li)
      })
    })
  })
  .catch(function (e) { // Process error for request
    alert(e)
  })
