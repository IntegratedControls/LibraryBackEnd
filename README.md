# CST Library Back end
[![CircleCI](https://circleci.com/gh/IntegratedControls/LibraryBackEnd.svg?style=svg)](https://circleci.com/gh/IntegratedControls/LibraryBackEnd)

<b>Install</b><br>
<a>- npm install -g yarn</a><br>
<a>- yarn install</a><br><br>
Request a copy of the <b>.env</b> file, which includes credentials to the development mLab and to connect to the Google Auth Service, from Integrated.Controls.adm@gmail.com. You will need to copy the <b>.env</b> file into the root of the BackEnd folder and also inside of BackEnd/frontend so that you can test the production build from the local backend.<br><br>
<b><i>Note</i></b> There may be times when you need to <b>npm run cleaninstall</b>. This eliminates any conflicts with existing node modules and new ones being used. If you do this then you will need to copy the <b>.env</b> file again into the BackEnd/frontend folder because the folder will get deleted and recreated from the GitHub FrontEnd master repository.

<b>Run the Server</b><br>
<b>npm start</b> starts the express server at the <b>PORT</b> specified in the <b>.env</b> file<br>
<b>npm run debug</b> also starts the node debugger, which allows you to use Chrome browser to debug. You should also install the NIM add-on to Chrome and set it to automatic mode.

<b>Authorization</b><br>
The <b>.env</b> file contains a variable that points to the localhost of the frontend; change this to be either the <i>development</i> or <i>production</i> server port for localhost, depending on which on your are running.

<b>Test</b><br>
<b>npm test</b> runs the tests and generates a coverage report.<br>
This report folder should remain outside of the test folder so that Mocha does not confuse the files inside coverage with files that it should be testing.<br>
<b>npm run test:debug</b> runs the tests and allows debugging within a Chrome browser.<br>
If you install the NIM chrome extension, and set it to automatic mode, then Chrome will open automatically after you run this command.

<b>Test and Build for Production</b><br>
After merging the new master branch from the FrontEnd, run the following commands to rebuild the frontend dist folder (which is BackEnd/frontend):
<b>yarn install</b><br>
<b>npm run build:prod</b><br>
Restart the server: <b>npm start</b><br>
Open localhost in the PORT specified in the <b>.env</b> file<br>

<b>Git</b><br>
To get the latest version of code, <b>git pull origin dev</b> and switch to your own branch.<br>
Please do not push your changes directly to the dev branch, rather push to your own branch and then submit a pull request to the dev branch.
