The following user stories were initially intended for implementation as chosen from the product backlog. They are listed below along with their respective Sprint Values, estimated durations and acceptance tests.
1.As a developer, I need to create a welcome page in order to welcome users to the website.
Estimated duration (1 day). Sprint Value: 2.
Acceptance Tests:
A user is able to see a welcome page open visiting the website.
The welcome page has options for either signing up or logging in.
 
2.As a developer, I need to implement an option for signing up users so that they can have an account.
Estimated duration (3 days). Sprint Value: 4.
Acceptance Tests:
Users are presented with a form that requires them to fill in their details to sign up.
After signing up, the details of the users are stored in a database (local variables, for now, i.e. an array).
 
3. As a developer, I need to implement an option for logging in users so that they can access their accounts.
Estimated duration (2 days). Sprint Value: 3
Acceptance Tests:
Users are able to access the homepage after inserting their credentials.
 Users stay on the welcome page if they insert incorrect credentials.
 
4. As a developer, I need to implement a functionality that allows a user to create a group for the other household members.
Estimated duration (2 days). Sprint Value: 3
Acceptance Tests:
A user is able to successfully create a group with a name of their choice.
 A maximum of three users are able to join a group created by the first member of their household.
 
5. As a developer, I need to create a homepage so that users can see options available on the website.
Estimated duration (1 day). Sprint Value: 3
Acceptance Tests:
Users can access the homepage.
 The Homepage consists of different options for the user to choose from.
 
6. As a developer, I need to implement a list that defines the shared expenses in the household.
Estimated duration (2 days). Sprint Value: 3
Acceptance Tests:
A list defining the expenses which users can share using the app, exists.

7. As a developer, I need to implement functionality that allows a user to see other members of their shared household.
Estimated duration (2 days). Sprint Value: 3
Acceptance Tests:
A user can see other members of their household.
 
8. As a developer, I need to implement functionality that allows users to post expenses so that the app can divide them equally amongst members.
Estimated duration (3 days). Sprint Value: 4
Acceptance Tests:
A user is able to pay for a particular expense.
 
9. As a developer, I need to implement a functionality that allows users to change their credentials so that they can update their details.
Estimated duration (2 days). Sprint Value: 3.
Acceptance Tests:
A user is able to change their credentials.
A user is able to log in successfully with their new credentials.
 
10. As a developer, I need to implement a feature that sends email to users after they have signed up.
Estimated duration (4 days). Sprint Value: 5
Acceptance Tests:
A user is notified with an email upon a successful sign-up.
 
 
The above stories were selected with an aim to achieve basic functionality. The aim was to do this such that the stories capture vertical slicing. And hence give the user a wholistic idea of the functionality that they can expect at the end. Some stories proved difficult to implement due to their complexity and time constraints that the development team faced during the week long sprint.  As a result these stories were moved back to the product backlog, they are as follows:
10. As a developer, I need to implement a feature that sends email to users after they have signed up.
 As a developer, I need to implement a functionality that allows users to change their credentials so that they can update their details.
8. As a developer, I need to implement functionality that allows users to post expenses so that the app can divide them equally amongst members.
The next section summarises what the development team did well, what went wrong and the improvements going into the next Sprint.
 
Positives
The team was able to establish a well-defined architecture such that there is a clear separation between front-end and back-end web development.
The web application runs properly on node and express.
Travis CI was successfully set up on master and tests everything that is committed on master before deploying to Azure.
 
Problems 
The Daily Scrum was inconsistent during the first Sprint, as a result there was insufficient flow of information between the team members. This resulted in a decreased level of productivity.
The underestimation of the implementation of all user stories set out to be achieved. 
Numerous stories required the development team to do some research before actually carrying out the implementation of these stories.
The understanding of the languages being used in the project varied across the team members.
At this point Coveralls is not being used to indicate testing coverage. 
 
Improvements
Establish consistent Daily Scrum to improve communication flow.
Fully automate Scrum Board.
Polish pages to create a better user-interface.
Start testing Front-end pages using frameworks like Puppeteer or Cyprus.
Start using persistent databases like SQL or Mongo DB.

The actual times taken to complete the stories implemented are as follows:
1.As a developer, I need to create a welcome page in order to welcome users to the website.(1 day)
2.As a developer, I need to implement an option for signing up users so that they can have an account. (2 days)
3.As a developer, I need to implement an option for logging in users so that they can access their accounts. (2 days)
4.As a developer, I need to implement a functionality that allows a user to create a group for the other household members. (3 days)
5.As a developer, I need to create a homepage so that users can see options available on the website. (1 days)
6.. As a developer, I need to implement a list that defines the shared expenses in the household. (2 days)
7.As a developer, I need to implement functionality that allows a user to see other members of their shared household. (3 days)
 
The sprint velocity achieved for this Sprint is : 2+4+3+3+3+3+3 =21  out of a possible 33.
