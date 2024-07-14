# finance-tracker_14_07_24
A version of finance tracker that match with the 14_7_24 milestones report
In case you interested start working with this one can proceed. 

Before running ionic serve
Make sure install these elements by running these command in the project directory
npm install @capacitor/camera
npm install @ionic/pwa-elements


Database name: expensedb

Table name: transactions <br>
CREATE TABLE `transactions` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `amount` int(11) NOT NULL,
 `category` varchar(255) DEFAULT NULL,
 `date` datetime NOT NULL,
 `notes` varchar(255) DEFAULT NULL,
 `location` varchar(255) DEFAULT NULL,
 `user_id` int(11) NOT NULL,
 PRIMARY KEY (`id`),
 KEY `user_id` (`user_id`)
)

Table name: users <br>
CREATE TABLE `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `username` varchar(100) NOT NULL,
 `password` varchar(255) NOT NULL,
 `secretnum` int(4) NOT NULL,
 PRIMARY KEY (`id`)
) 

Table name:user_profile <br>
CREATE TABLE `user_profile` (
 `user_id` int(11) NOT NULL,
 `profile_image` longblob DEFAULT NULL,
 PRIMARY KEY (`user_id`)
) 
