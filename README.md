# CST Library Back end
[![CircleCI](https://circleci.com/gh/IntegratedControls/CSTLibraryBackend.svg?style=svg)](https://circleci.com/gh/IntegratedControls/CSTLibraryBackend)

#Install
- npm install
- Request a copy of the .env file, which includes credentials to development mLab and to connect to the Google Auth Service<br><br>
<i>Note</i> there is an <b>example.env</b> file for you to use. Copy it, paste it as <b>.env</b>, then request the missing credentials from Integrated.Controls.adm@gmail.com.

#Run the server
<b>npm start</b> starts the express server at localhost:7000<br>
<br>
<b>npm run debug</b> also starts the node debugger, which allows you to use Chrome browser to debug. You should also install the NIM add-on to Chrome and set it to automatic mode.

#Authorization
The .env contains a variable that points to the localhost of the front end.
change this to be either the development or production server port for locahhost, depending on which on your are running.

#test
<b>npm test</b><br>
runs the tests and generates a coverage report. This report folder should remain outside of the test folder so that Mocha does not confuse the files inside coverage with files that it should be testing.<br><br>
<b>npm run test:debug</b><br>
runs the tests and allows debugging within a Chrome browser. If you install the NIM chrome extension, and set it to automatic mode, then Chrome will open automatically after you run this command.
