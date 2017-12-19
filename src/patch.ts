
/* IMPORT */

import * as fs from 'fs';
import * as path from 'path';
import * as pify from 'pify';
import * as vscode from 'vscode';
import Utils from './utils';

/* VARIABLES */

const isWin = /^win/.test ( process.platform ),
      appDir = path.dirname ( require.main.filename ),
      filepath = path.join ( appDir, 'vs', 'workbench', 'workbench.main.js' );

/* PATCH */

async function patch ( find, replace ) {

  let content = await Utils.file.read ( filepath );

  if ( !content ) {

    vscode.window.showErrorMessage ( `File not found: "${filepath}"` );

    return false;

  } else {

    content = content.replace ( find, replace );

    return await Utils.file.write ( filepath, content );

  }

}

/* EXPORT */

export default patch;
