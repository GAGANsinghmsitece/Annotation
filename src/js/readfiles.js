import showfiles from './showfiles.js';
import Queue from './Queue.js';
import store from './store.js';
let readfiles={
	//This plugin will try to get pathnames of all the files in cordova
	'files':[],
	'init':function(cordova){
		readfiles.read(cordova.file.externalRootDirectory);
	},
	'readentries':function(entries){
		for(var i=0;i<entries.length;i++){
			
			if(entries[i].isDirectory===true && entries[i].name.startsWith(".")===false){
				readfiles.read(entries[i].nativeURL);
				
			}
			else{
				if(entries[i].nativeURL.endsWith(".pdf")===true){
					readfiles.files.push({
						"url":entries[i].nativeURL,
						"name":entries[i].name
					});
					store.dispatch('addFiles',{
						"url":entries[i].nativeURL,
						"name":entries[i].name,
					});
					showfiles.makerow({
						"url":entries[i].nativeURL,
						"name":entries[i].name,
					});
				}
			}
		}
	},
	'error':function(err){
		console.log(err);
	},
	'read':function(path){
		window.resolveLocalFileSystemURL(path,
			function (fileSystem) {
				var reader = fileSystem.createReader();
				reader.readEntries(
					function(entries){readfiles.readentries(entries)},
					function(err){console.log(err);}
				);
			},
			function(err){console.log(err);}
		);
	}
}
export default readfiles;