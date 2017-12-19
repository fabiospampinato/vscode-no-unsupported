
/* IMPORT */

import * as vscode from 'vscode';
import patch from './patch'

/* VARIABLES */

const ORIGINAL_FIND = /this\.isPure\|\|\(([a-zA-Z])=([a-zA-Z])\+" "\+([a-zA-Z])\.NLS_UNSUPPORTED\)/,
      ORIGINAL_REPLACE = 'this.isPure||($1,$3,"__vscode-no-unsupported__")',
      PATCHED_FIND = /this\.isPure\|\|\(([a-zA-Z]),([a-zA-Z]),"__vscode-no-unsupported__"\)/,
      PATCHED_REPLACE = 'this.isPure||($1=$1+" "+$2.NLS_UNSUPPORTED)';

/* HELPERS */

function reload () {
  vscode.commands.executeCommand ( 'workbench.action.reloadWindow' );
}

/* COMMANDS */

async function remove () {

  const patched = await patch ( ORIGINAL_FIND, ORIGINAL_REPLACE );

  if ( patched === false ) return vscode.window.showErrorMessage ( 'Couldn\'t patch Visual Studio Code. Please open an issue about this' );

  const needsReload = await vscode.window.showInformationMessage ( '[Unsupported] removed. Reload window to take effect.', { title: 'Reload' } );

  if ( !needsReload ) return;

  reload ();

}

async function restore () {

  const patched = await patch ( PATCHED_FIND, PATCHED_REPLACE );

  if ( patched === false ) return vscode.window.showErrorMessage ( 'Couldn\'t patch Visual Studio Code. Please open an issue about this' );

  const needsReload = await vscode.window.showInformationMessage ( '[Unsupported] restored. Reload window to take effect.', { title: 'Reload' } );

  if ( !needsReload ) return;

  reload ();

}

/* EXPORT */

export {remove, restore};
