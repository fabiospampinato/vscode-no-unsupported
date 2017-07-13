
/* IMPORT */

import * as vscode from 'vscode';
import patch from './patch'

/* VARIABLES */

const ORIGINAL = 'this.isPure||(e=e+" "+t.NLS_UNSUPPORTED)',
      PATCHED = 'this.isPure||(e=e)';

/* HELPERS */

function reload () {
  vscode.commands.executeCommand ( 'workbench.action.reloadWindow' );
}

/* COMMANDS */

async function remove () {

  await patch ( ORIGINAL, PATCHED );

  const needsReload = await vscode.window.showInformationMessage ( '[Unsupported] removed. Reload window to take effect.', { title: 'Reload' } );

  if ( !needsReload ) return;

  reload ();

}

async function restore () {

  await patch ( PATCHED, ORIGINAL );

  const needsReload = await vscode.window.showInformationMessage ( '[Unsupported] restored. Reload window to take effect.', { title: 'Reload' } );

  if ( !needsReload ) return;

  reload ();

}

/* EXPORT */

export {remove, restore};
