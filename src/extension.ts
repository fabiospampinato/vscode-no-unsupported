
/* IMPORT */

import * as vscode from 'vscode';
import Utils from './utils';

/* EXCEPTION */

process.on ( 'uncaughtException', err => {
  if ( !/ENOENT|EACCES|EPERM/.test ( err.code ) ) return;
  vscode.window.showInformationMessage ( 'Run Visual Studio Code with admin privileges so the changes can be applied.' );
});

/* ACTIVATE */

const activate = Utils.initCommands;

/* EXPORT */

export {activate};
