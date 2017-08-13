
/* IMPORT */

import * as fs from 'fs';
import * as path from 'path';
import * as pify from 'pify';
import Utils from './utils';

/* VARIABLES */

const isWin = /^win/.test ( process.platform ),
      appDir = path.dirname ( require.main.filename ),
      filepath = appDir + ( isWin ? '\\vs\\workbench\\workbench.main.js' : '/vs/workbench/workbench.main.js' );

/* PATCH */

async function patch ( find, replace ) {

  let content = await Utils.file.read ( filepath );

  if ( !content ) return;

  content = content.replace ( find, replace );

  return Utils.file.write ( filepath, content );

}

/* EXPORT */

export default patch;
