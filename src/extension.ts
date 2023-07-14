import * as vscode from 'vscode';
import * as path from 'path';

function runScarpeCommand(filePath: string, command: string) {
  const fileName = path.basename(filePath);
  const workspaceFolders = vscode.workspace.workspaceFolders;

  if (workspaceFolders && workspaceFolders.length > 0) {
    const folderPath = workspaceFolders[0].uri.fsPath;

    const terminal = vscode.window.createTerminal({
      name: 'Scarpe Terminal',
      cwd: folderPath,
    });

    terminal.sendText(command);
    terminal.show();

    vscode.window.showInformationMessage(`Running ${fileName} with Scarpe.`);
  } else {
    vscode.window.showWarningMessage('No workspace is currently open.');
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "Scarpe" is now active!');

  let runCurrentDisposable = vscode.commands.registerCommand('Scarpee.runCurrent', () => {
    const activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor) {
      const filePath = activeTextEditor.document.uri.fsPath;
      const command = `./exe/scarpe ${filePath} --dev`;
      runScarpeCommand(filePath, command);
    } else {
      vscode.window.showWarningMessage('No file is currently open.');
    }
  });

  let debugDisposable = vscode.commands.registerCommand('Scarpee.debug', () => {
    const activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor) {
      const filePath = activeTextEditor.document.uri.fsPath;
      const command = `./exe/scarpe ${filePath} --dev --debug`;
      runScarpeCommand(filePath, command);
    } else {
      vscode.window.showWarningMessage('No file is currently open.');
    }
  });

  let productionDisposable = vscode.commands.registerCommand('Scarpee.production', () => {
    const activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor) {
      const filePath = activeTextEditor.document.uri.fsPath;
      const command = `scarpe ${filePath}`;
      runScarpeCommand(filePath, command);
    } else {
      vscode.window.showWarningMessage('No file is currently open.');
    }
  });

  context.subscriptions.push(runCurrentDisposable);
  context.subscriptions.push(debugDisposable);
  context.subscriptions.push(productionDisposable);
}

export function deactivate() {}
