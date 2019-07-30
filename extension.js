// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const ftp = require('./assets/js/Ftp'); 
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let conf = vscode.workspace.getConfiguration('ftpfilesync');
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ftpfilesync" is now active!');


	let init = vscode.workspace.onDidSaveTextDocument((e) => {
		if (conf.enabled){
			ftp.put(e).then(function(){
				vscode.window.showInformationMessage('File  ' + e.fileName + ' successfully sync with ftp');
			}, function(error){
				if (error !== 'ignore'){
					vscode.window.showErrorMessage('Error with FTP file sync : ' + error);
				}
			});
		}
	});

	context.subscriptions.push(init);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
