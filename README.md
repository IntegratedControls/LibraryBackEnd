# CST Library Back end
[![CircleCI](https://circleci.com/gh/IntegratedControls/LibraryBackEnd.svg?style=svg)](https://circleci.com/gh/IntegratedControls/LibraryBackEnd)

#Install
- npm run cleaninstall
- Request a copy of the .env file from from Integrated.Controls.adm@gmail.com. This includes credentials to development mLab and to connect to the Google Auth Service.<br><br>

#Run the server
<b>npm start</b> starts the express server at the PORT specified in the .env file<br>
<br>
<b>npm run debug</b> also starts the node debugger, which allows you to use Chrome browser to debug. You should also install the NIM add-on to Chrome and set it to automatic mode.

#Authorization
The .env contains a variable that points to the localhost of the front end.
change this to be either the development or production server port for localhost, depending on which on your are running.

#test
<b>npm test</b><br>
runs the tests and generates a coverage report. This report folder should remain outside of the test folder so that Mocha does not confuse the files inside coverage with files that it should be testing.<br><br>
<b>npm run test:debug</b><br>
runs the tests and allows debugging within a Chrome browser. If you install the NIM chrome extension, and set it to automatic mode, then Chrome will open automatically after you run this command.

#Test and Build for production
After merging the new master branch from the front end, run the following commands to rebuild the front end dist folder (which is now inside the back end app)
<b>yarn install</b><br>
<b>npm run build:prod</b><br>
Restart the server (npm start). Open localhost in the PORT specified in the .env file.
