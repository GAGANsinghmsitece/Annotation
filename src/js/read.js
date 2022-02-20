import Promise from 'bluebird';

import CordovaPromisifier from './CordovaPromisifier';
import Queue from './queue.js';
import PermissionManager from './permissions.js';

let read={
	init:async function(cordova){
		var check_permission=await PermissionManager.init();
		console.log(check_permission);
		if(check_permission===false){
			return;
		}
		var q=new Queue();//used to insert stack
		q.enqueue(cordova.file.externalRootDirectory);
		var files=[];
		while(!q.isEmpty()){
			var current_directory=q.dequeue();
			var entries=await read.getentries(current_directory);
			var str="";
			for(var i=0;i<entries.length;i++){
				if(entries[i].isDirectory===true && entries[i].name.startsWith(".")===false){
					q.enqueue(entries[i].nativeURL);
				}else if(entries[i].nativeURL.endsWith(".pdf")===true){
					files.push({
						"url":entries[i].nativeURL,
						"name":entries[i].name
					});
				}
			}
		}
		return files;
	},
	getentries:async function(path){
		return new Promise(function(resolve){
			window.resolveLocalFileSystemURL(path,function(fileSystem){
				var reader=fileSystem.createReader();
				reader.readEntries(
					function(entries){
						resolve(entries);
					}
				);
			});
		});
	}
};

export default read;