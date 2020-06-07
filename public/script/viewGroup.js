'use strict'

fetch('/splitgorithm/api/groups') // Returns a Promise for the GET request
  .then(function (response) {
    // Check if the request returned a valid code
    if (response.ok) return response.json() // Return the response parse as JSON if code is valid
    else { throw 'Failed to load grouplist: response code invalid!' }
  })
  .then(function (data) { // Display the JSON data appropriately
    const buttonG = document.getElementById('addButton2')
    const groupNames = document.getElementById('groupNames')
    buttonG.addEventListener('click', function () {
      data.forEach(function (group) {
        const li = document.createElement('LI')
        const liText = document.createTextNode(`${Object.keys(group)[1]} : `)
        li.appendChild(liText)
        const Members = document.createTextNode('Members -->')
        li.appendChild(Members)
        group.groupMembers.forEach(function (friends) {
          const text = document.createTextNode(`${friends.name}, `) // Create text node
          li.appendChild(text) // Append the text to <p>
        })
        groupNames.appendChild(li)
      })
    })
  })
  .catch(function (e) { // Process error for request
    alert(e)
  })
