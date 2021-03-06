const vscode = require('vscode');
var PromiseFtp = require('promise-ftp');
var ftp = null;
var oConnection = null;
var self = this;

this.getExcludePath = function(){
    let conf          = vscode.workspace.getConfiguration('ftpfilesync');
    let defaultExlude = ['\\.vscode'];
    let customExlude = conf.ignorePath;
    return defaultExlude.concat(customExlude);
}

this.put = function(file){
    return new Promise(function(resolve, reject) {
        let conf     = vscode.workspace.getConfiguration('ftpfilesync');
        
        oConnection = {
            host     : conf.host,
            user     : conf.user,
            password : conf.password,
            port     : conf.port,
        }
        
        if (ftp === null){
            ftp = new PromiseFtp();
        }

        let ftpRoot = conf.ftpRootPath;
        let localRoot = conf.localRootPath; // TODO
        let wkPath = vscode.workspace.rootPath;
        let fsPath = file.uri.fsPath.replace(wkPath, '').replace(/\\/g, '/');
        let remotePath = './' + ftpRoot + fsPath;
        var skip = false;

        self.getExcludePath().forEach(element => {
            if (file.uri.path.match(element) !== null){
                console.log('Ignore element : ' + element);
                reject('ignore');
                skip = true;
            }
        });
        if (skip){
            return;
        }

        try {
            ftp.connect(oConnection)
            .then(serverMessage => {
              console.log('PUT : ', file.uri.fsPath, remotePath);
              ftp.put(file.uri.fsPath, remotePath); // Need to be called twice to work... why ?
              ftp.put(file.uri.fsPath, remotePath);
            }, errorMsg => {
                console.log(errorMsg);
                reject(errorMsg);
            }).then(() => {
              ftp.end();
              resolve(file);
            });
        }catch(e){
            reject(e);
        }
    });
}
