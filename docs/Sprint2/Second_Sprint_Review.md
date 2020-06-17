Second Sprint Retrospective
The following user stories were initially intended for implementation as chosen from the product backlog. They are listed below along with their respective Sprint Values, estimated durations and acceptance tests.

As a developer, I need to implement password hashing so that the user details are protected.  Estimated duration: 4 days, Sprint Value:5
Acceptance Tests:
The passwords of users are encrypted using Bcrypt.
The encrypted passwords are stored in an SQL database.
It would be even better to update the existing functionality of signing up and signing to work with the encrypted passwords.
Additionally, the passwords of users are hidden using asterisks.

As a developer, I need to implement a feature that sends email to users after they have signed up.  Estimated duration: 4 days, Sprint Value:5
Acceptance Tests:
A user is notified with an email upon a successful sign-up.

As a developer, I need to implement functionality that allows users to post expenses so that they can be captured on an expenses table.  Estimated duration: 3 days, Sprint Value:4
Acceptance Tests:
A user is able to pay for a particular expense.
The expense is successfully posted in an expenses table on the database.

As a developer, I need to implement a functionality that enables users to see what other users have paid for a particular expense. Estimated duration: 2 days, Sprint Value:4
Acceptance Tests:
Users are able to view expenses on the web application.
 Each expense is shown along with its cost and payer.
 
As a developer, I need to implement functionality that sends an email with a reset password verification code so that users can reset their password. Estimated duration: 3 days, Sprint Value:5
Acceptance Tests:
An email is sent with a unique verification code to the user that wants to reset their password.
The password is successfully changed, hashed, and stored in the database.
 
As a developer, I need to implement a functionality that allows users to change their credentials so that  their details can stay up to date.  Estimated duration: 4 days, Sprint Value:3
Acceptance Tests:
A user is able to change their email and their username.
A user is able to log in successfully with their new username.
 
As a developer, I need to implement a functionality that allows users to see what others are owing for a particular expense.  Estimated duration: 2 days, Sprint Value:4
Acceptance Tests:
All members of the household can see the balances of each member.
As a developer, I need to implement a functionality that splits the expenses equally so that users can see their debts. Estimated duration: 2 days, Sprint Value:4
Acceptance Tests:
Each expense is split equally between household members upon being posted.
 
As a developer, I need to implement a feature that notifies other users that a particular user has posted an expense.  Estimated duration: 3 days, Sprint Value:4
Acceptance Tests:
All members of a household receive an email notification when one member has paid for a particular expense.
 
As a developer, I need to implement functionality to allow users to view debts  so that they can make payments.   Estimated duration: 3 days, Sprint Value:4
Acceptance Tests:
All members of the household can see their debts on the web app.
 
As a developer, I need to create a payment option so that users can settle their expenses.  Estimated duration: 3 days, Sprint Value:3
           Acceptance Tests:
  Users can settle their expenses on the web app.

During the second Sprint the team had to improve a lot of functionality on the website. This meant using numerous new APIs. One of these is the SQL database. The team started using a SQL database in order  to be able to store user data on a server and not locally. The team struggled to understand SQL well enough to be able to make queries.  This was a problem as many stories planned for the Sprint relied heavily on making queries to the database. The team also started using Bcrypt to implement password hashing, this proved to be time consuming as well, as the team has no past experience with Bcrypt. Nodemailer was also used to implement email notifications, luckily it had good documentation and hence did not prove to be too difficult. 

Moreover, the development team had also planned to start using express-session to implement user sessions during the week long Sprint.  This proved to be very tricky as we could not find good documentation on the express-session API. We also noticed that the last Sprint retrospective did not inform the second Sprint very well. This is noted from how members had to implement functionality like adding the database to the website as a part of their stories with no story specifically covering that.  Another big issue was internet connectivity, some members do not have a stable internet connection. This made it difficult to have a good fruitful Scrum. All the challenges faced resulted in the Sprint being more than a week (9 days). As a result of the difficulties faced, some stories were moved back to the last Sprint. These stories are listed below. 

As a developer, I need to implement a functionality that allows users to see what others are owing for a particular expense.  Estimated duration: 2 days, Sprint Value:4
As a developer, I need to implement a functionality that splits the expenses equally so that users can see their debts. Estimated duration: 2 days, Sprint Value:4
 
As a developer, I need to implement a feature that notifies other users that a particular user has posted an expense.  Estimated duration: 3 days, Sprint Value:4
As a developer, I need to implement functionality to allow users to view debts  so that they can make payments.   Estimated duration: 3 days, Sprint Value:4
As a developer, I need to create a payment option so that users can settle their expenses.  Estimated duration: 3 days, Sprint Value:3
       
The next section summarises what the development team did well, what went wrong and the improvements going into the next Sprint.
 
Positives
The web app is now using a persistent database (SQL).
Nodemailer is being used for email notifications.
A consistent Daily Scrum was implemented.
 
Problems
The team struggled to implement user sessions. This is a serious issue since several user stories depend on it going forward.
The team struggled with using the SQL database, making it difficult to carry out some stories.
 
Improvements
Start using Coveralls to indicate testing coverage.
Implement more unit testing using Jest.
Start testing Front-end pages using Cyprus or Puppeteer.
Ensure that user sessions are implemented successfully using express-sessions or any other relevant API.
Ensure that all basic functionality is implemented.
 
The actual times taken to implement the user stories that were successfully delivered, are given below.
 
As a developer, I need to implement password hashing so that the user details are protected. (3 days)
As a developer, I need to implement a feature that sends email to users after they have signed up. (3 days)
As a developer, I need to implement functionality that allows users to post expenses so that they can be captured on an expenses table. (4 days)
As a developer, I need to implement a functionality that enables users to see what other users have paid for a particular expense. (2 days)
As a developer, I need to implement functionality that sends an email with a reset password verification code so that users can reset their password. (5 days)
As a developer, I need to implement a functionality that allows users to change their credentials so that  their details can stay up to date. (5 days)

The Sprint velocity achieved for this Sprint is 5+5+4+4+3+5=26 out of a possible 45.
