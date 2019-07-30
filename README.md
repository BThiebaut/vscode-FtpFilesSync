# ftpfilesync README

Auto save project files with FTP server when saving a file.  
Only the saved file will be send.


## Extension Settings

Settings can be put en global settings, but user settings.json file inside the .vscode folder is better.

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

* `ftpfilesync.enabled` : Enable or disable ftpFileSync for this workspace. Workspace need to be reloaded to take effect.
* `ftpfilesync.host` : Ftp host
* `ftpfilesync.user` : Ftp user
* `ftpfilesync.password` : Ftp password
* `ftpfilesync.port` : Ftp port
* `ftpfilesync.rootPath` : Path to the root of the project, from the FTP root folder without trailing slash (exemple : "www/site")
* `ftpfilesync.ignorePath` : Array of paths to ignore (use Regex) (exemple : ["my\/ignored\/folder", "my\/ignored\/file\.txt"])

## Known Issues

For some reason, ftp.put need to be called twice or it could ignore the put command. So file can be send 2 time in a row.  
No unit test. I'm bored and maybe I will do them later.