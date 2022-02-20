import Promise from 'bluebird';
import readfiles from './readfiles.js';
import app from './app.js';

let PermissionManager={
	'init':async function(){
		var permissions=cordova.plugins.permissions;
		var status= await PermissionManager.check(permissions,cordova,permissions.WRITE_EXTERNAL_STORAGE);
		if(status===false){
			status= await PermissionManager.request(permissions,cordova,permissions.WRITE_EXTERNAL_STORAGE);
		}
		return status;
	},
	'check':async function(permissions,cordova,p){
		return new Promise(function(resolve){
			permissions.checkPermission(p,
				function(status){
					if(status.hasPermission){
						resolve(true);
						//readfiles.init(cordova);
					}else{
						resolve(false);
						//PermissionManager.request(permissions,cordova,p);
					}
				},
				function(error){
					console.log(error);
				}
			);	
		});
		
	},
	'message':function(){
		app.toast.create({
			text: 'Permission to read files is not given',
			closeTimeout: 2000,
		}).open();
	},
	'startActivity':function(){
		console.log(window.plugins.intentShim.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
		console.log(window.plugins.intentShim);
		window.plugins.intentShim.startActivity(
			{
				action:window.plugins.intentShim.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION,
				uri:"me.sapora.pdfreader.pdf.reader" 
			},function(){

			},function(){
				alert('failed to open it');
			}
		);
	},
	'request':async function(permissions,cordova,p){
		return new Promise(function(resolve){
			/*app.dialog.create({
                        title:'Permission',
                        text:'We need access to the files to show the Pdf',
                        buttons:[{
                            text:'Cancel',
                            onClick:function(dialog,e){
                                dialog.close();
                                PermissionManager.message();
                                resolve(false);
                            }
                        },{
                            text:'Grant Permission',
                            onClick:function(dialog,e){
                            	PermissionManager.startActivity();
                            }
                        }
                ]
            }).open();*/
			permissions.requestPermission(p,
				function(status){
					if(status.hasPermission){
						resolve(true);
						//readfiles.init(cordova);
					}else{
						PermissionManager.message();
						resolve(false);
					}
				},function(error){
					PermissionManager.message();
				}
			);
		});
	}
}
export default PermissionManager;