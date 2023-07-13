import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "Scarpe" is now active!');

  let disposable = vscode.commands.registerCommand('Scarpee.runCurrent', () => {
    const activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor) {
      const filePath = activeTextEditor.document.uri.fsPath;
      const fileName = path.basename(filePath);
      const workspaceFolders = vscode.workspace.workspaceFolders;

      if (workspaceFolders && workspaceFolders.length > 0) {
        const folderPath = workspaceFolders[0].uri.fsPath;

        const command = `./exe/scarpe ${filePath} --dev`;

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
    } else {
      vscode.window.showWarningMessage('No file is currently open.');
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
