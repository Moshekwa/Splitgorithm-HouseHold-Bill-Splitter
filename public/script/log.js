'use strict'

fetch('/splitgorithm/api/viewlog') // Returns a Promise for the GET request
    .then(function (response) {
        // Check if the request returned a valid code
        if (response.ok) return response.json() // Return the response parse as JSON if code is valid
        else { throw 'Failed to load grouplist: response code invalid!' }
    })
    .then(function (data) { // Display the JSON data appropriately
        const buttonG = document.getElementById('buttons7')
        const groupLog = document.getElementById('log')
        buttonG.addEventListener('click', function () {
            data.forEach(function (grouplog) {
                // Create a new list entry
                const li = document.createElement('LI')
                const liText = document.createTextNode(grouplog.description + ', at ' + grouplog.date)
                // Append list text to list item and list item to list
                li.appendChild(liText)
                groupLog.appendChild(li)
            })
        })
    })
    .catch(function (e) { // Process error for request
        alert(e)
    })
