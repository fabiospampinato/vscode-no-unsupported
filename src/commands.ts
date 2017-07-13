
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

  await patch ( ORIGINAL_FIND, ORIGINAL_REPLACE );

  const needsReload = await vscode.window.showInformationMessage ( '[Unsupported] removed. Reload window to take effect.', { title: 'Reload' } );

  if ( !needsReload ) return;

  reload ();

}

async function restore () {

  await patch ( PATCHED_FIND, PATCHED_REPLACE );

  const needsReload = await vscode.window.showInformationMessage ( '[Unsupported] restored. Reload window to take effect.', { title: 'Reload' } );

  if ( !needsReload ) return;

  reload ();

}

/* EXPORT */

export {remove, restore};
