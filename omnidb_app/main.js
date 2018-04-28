const electron = require('electron')
const child_process = require('child_process')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

var ipc = require('electron').ipcMain;
let django;
let callback_started = false;

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600, icon: path.join(__dirname, 'images/omnidb.png'), title: 'OmniDB'});
  mainWindow.setMenu(null);

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  ipc.on('invokeAction', function(event, data){
    callback_started = true;

    //Starting the server
    //django = child_process.spawn(path.join(__dirname, 'omnidb-server/omnidb-server'),['-A'],{detached: true});
    django = child_process.spawn('python3',['/home/rafaelthca/Repositories/github/rafaelthca/OmniDB/OmniDB/omnidb-server.py','-A'],{detached: true});

    django.stdout.on('data', (data) => {
      v_data_list = data.toString('utf8').split("\n");
      mainWindow.webContents.send('info' , v_data_list);
    });

  });

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  //if (process.platform !== 'darwin') {
  if (callback_started) {
    while (django==null)
      null;
    process.kill(django.pid);
  }
  app.quit();
  //}
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
