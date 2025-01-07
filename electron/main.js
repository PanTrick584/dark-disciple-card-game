const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Optional
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    // Load Vite's development server during development
    win.loadURL('http://localhost:5173'); // Vite's default dev server
    // if (process.env.NODE_ENV === 'development') {
    // } else {
    //     // Load the Vite build output for production
    //     win.loadFile(path.join(__dirname, '../dist/index.html'));
    // }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
