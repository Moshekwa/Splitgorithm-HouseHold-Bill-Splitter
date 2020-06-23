'use strict'

fetch('/splitgorithm/api/viewHouseExpenses') // Returns a Promise for the GET request
  .then(function (response) {
    // Check if the request returned a valid code
    if (response.ok) { return response.json() } // Return the response parse as JSON if code is valid
    else { throw 'Failed to load household: response code invalid!' }
  })
  .then(function (data) {
    const button = document.getElementById('viewOurExpenses')
    const expenseList = document.getElementById('contributionList')
    const contribution = data[1] + 'Contribution'
    const owedTo = data[1] + 'OwedTo'
    // Iterate through all housemembers
    button.addEventListener('click', function () {
      data[0].forEach(function (household) {
        const li = document.createElement('LI')
        const liText = document.createTextNode('Username : ' + household.memberUserName + '- Role: ' + household.role +
        '- Expense Contribution: R' + household[contribution] + '-Expense Owed to: ' + household[owedTo])
        li.appendChild(liText)
        expenseList.appendChild(li)
      })
    })
  })
  .catch(function (e) {
    alert(e)
  })
