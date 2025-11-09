# Dev_Tinder

dev_tinder api's

# authrouter

-Post /signup
-post /login
-post /logout

# profilerouter

-patch /profile/edit
-get /profile/view
-patch /profile/password --forgot password

-

status =ignore , interested , accepted, rejected

# connectionrequestrouter

-post /request/send/interested/:userId
-post /request/send/ignore/:userId
-post /request/review/accepted/:userId
-post /request/review/rejected/:userId

# userrouter

-get /user/connections/
-get /requests/
-get /feed - gets u the feed of users on the platform ++28 in tinder
