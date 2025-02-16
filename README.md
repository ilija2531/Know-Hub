# Know-Hub
KnowHub LMS Platform

Tools used for the project and that you need to have installed on your computer:
-Microsoft Visual Studio Code - for writing and testing the code
-Microsoft Visual Studio - for the backend part of the project
-SQL Server and SQL Management Studio - for storing the database
-.NET SDKs for Visual Studio, which you can download from this link https://dotnet.microsoft.com/en-us/download/visual-studio-sdks

Languages and frameworks used for the project:
-React Js - for the frontend part
-.NET Framework and C# - for the backend part

How to start the project:
-Frontend: Go to Visual Studio Code an do the following instructions:
 1.Using the terminal go to the project directory where you have saved the project ex. cd desktop/Know-Hub
 2.Then using cd go to KnowHubApp.client ex. cd KnowHubApp.client
 3.Type npm install- this installs all the necessary files and tools needed for the frontend
 4.Type npm install react-router-dom - this makes sure that the routes you define are working
 5.Type npm run dev - this starts the page in your browser

 -Backend:
 1.Open up Visual Studio 
 2.Open project or solution
 3.Choose the KnowHubApp.server in the KnowHub directory and choose the KnowHubApp.Server.sln file
 4.Once loaded, open the appsettings.json and appsettingsdevelopment.json files and in the connection strings, change the server with the name of your desktop in both files, you can find it by running the hostname command in command prompt
 5.Go to view in menu bar and choose the terminal
 6.If you are directly navigated to the KnowHubApp.server file proceed with the next instructions, if not type cd KnowHubApp.server
 7.Then type dotnet tool install --global dotnet-ef
 8.Then type dotnet ef database update, and after that type the following commands one by one: dotnet build and dotnet watch run
 9.After executing the dotnet watch run command you should the swagger ui with all the endpoints

 SQL Server- do this before the backend part:
 1.Open SQL Management Studio
 2.Connect
 3.Once connected, create a database
 4.Name it KnowHub_App_Db

 Purpose of the project:
 The purpose of the project was to create a LMS that would allow for people to be able to watch courses on the platform and with it learn new skills and recommend them to their friends and relatives. This project was done for the purpose of the subject E-Learning in 4th year of studies at the Faculty of Information and Communication Technologies in Bitola and was mentored by Prof.Natasa Blazeska Tabakovska. The project itself consists of a MyProfile section where the users can see and change their user data, MyCourses section where the users can see the courses they have created and manage them, and a standard home page where all the courses are displayed. The project took around 3 months to make, and it was a great experience that would for sure be valuable for the future of our careers.

 Students:
 Kristina Tanevska
 Petar Zhigikj
 Stefan Ristevski
 Filip Risteski
 Mihail Trajkovski
 Ilija Bogdanovski
