const electron = require('electron')
const app = electron.app

module.exports = {
handleSquirrelEvent: function() {
 if (process.argv.length === 1) {
 return false;
 }

 const ChildProcess = require('child_process');
 const path = require('path');
 const regedit = require('regedit')

 const appFolder = path.resolve(process.execPath, '..');
 const rootAtomFolder = path.resolve(appFolder, '..');
 const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
 const exeName = path.basename(process.execPath);
 const spawn = function(command, args) {
 let spawnedProcess, error;

 var regKeys = ['HKCR\\*\\shell\\MakeWorking','HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\CommandStore\\shell\\AddWorking','HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\CommandStore\\shell\\AddWorking\\command','HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\CommandStore\\shell\\RemoveWorking','HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\CommandStore\\shell\\RemoveWorking\\command']

 var valuesToPut = {
    'HKCR\\*\\shell\\MakeWorking': {
        'Icon': {
            value: process.execPath,
            type: 'REG_SZ'
        },
        'MUIVerb': {
            value: 'Make Working',
            type: 'REG_SZ'
        },
        'SubCommands': {
            value: 'AddWorking;RemoveWorking;',
            type: 'REG_SZ'
        }
    },
    'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\CommandStore\\shell\\AddWorking': {
        '(Default)': {
            value: 'Add to working',
            type: 'REG_DEFAULT'
        }
    },
    'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\CommandStore\\shell\\AddWorking\\command': {
        '(Default)': {
            value: process.execPath + ' %1',
            type: 'REG_DEFAULT'
        }
    },
    'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\CommandStore\\shell\\RemoveWorking': {
        '(Default)': {
            value: 'Remove from working',
            type: 'REG_DEFAULT'
        }
    },
    'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\CommandStore\\shell\\RemoveWorking\\command': {
        '(Default)': {
            value: process.execPath + ' %1',
            type: 'REG_DEFAULT'
        }
    }
}
console.log("IM HERE");
 try {
 spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
 } catch (error) {}

 return spawnedProcess;
 };

 const spawnUpdate = function(args) {
 return spawn(updateDotExe, args);
 };

 const squirrelEvent = process.argv[1];
switch (squirrelEvent) {
 case '--squirrel-install':
 case '--squirrel-updated':
 // Optionally do things such as:
 // - Add your .exe to the PATH
 // - Write to the registry for things like file associations and
 // explorer context menus

 // Install desktop and start menu shortcuts
 spawnUpdate(['--createShortcut', exeName]);
 
    regedit.createKey(regKeys, function(err) {
        if (err) console.log(err);
        regedit.putValue(valuesToPut, function(err) {
            if (err) console.log(err);
        })  
    })

 setTimeout(app.quit, 1000);
 return true;

 case '--squirrel-uninstall':
 // Undo anything you did in the --squirrel-install and
 // --squirrel-updated handlers

 // Remove desktop and start menu shortcuts
 spawnUpdate(['--removeShortcut', exeName]);

 regedit.deleteKey(regKeys, function(err) {
    if (err) console.log(err);
 });

 setTimeout(app.quit, 1000);
 return true;

 case '--squirrel-obsolete':
 // This is called on the outgoing version of your app before
 // we update to the new version - it's the opposite of
 // --squirrel-updated

 app.quit();
 return true;
}
}
}