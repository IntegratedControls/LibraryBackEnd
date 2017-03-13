if [ ! -d frontend ];
then
    (
        git clone https://github.com/IntegratedControls/LibraryFrontEnd frontend;
        cd frontend || exit;
        npm install;
    )
else
    (
        cd frontend || exit;
        git checkout master;
        git pull;
        npm install;
    )
fi
