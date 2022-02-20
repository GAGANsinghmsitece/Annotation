import Promise from 'bluebird';
import app from './app.js';

const checkFilePermission = () => {
    return new Promise((resolve, reject) => {
        let permissions = cordova.plugins.permissions;
        permissions.checkPermission(permissions.MANAGE_EXTERNAL_STORAGE, function (status) {
            console.log('success checking permission');
            console.log('HAS MANAGE_EXTERNAL_STORAGE:'+ status.hasPermission);
            // console.warn(status.hasPermission);
            if (!status.hasPermission) {
                app.dialog.create({
                        title:'Permission',
                        text:'We need access to the files to show the Pdf',
                        buttons:[{
                            text:'Grant Permission',
                            onClick:function(dialog,e){

                            }
                        },{
                            text:'Cancel',
                            onClick:function(dialog,e){
                                dialog.close();
                            }
                        }]
                    });
                permissions.requestPermission(permissions.MANAGE_EXTERNAL_STORAGE, function (status) {
                     console.log('success requesting MANAGE_EXTERNAL_STORAGEN permission');
                     console.log('HAS MANAGE_EXTERNAL_STORAGE:', status.hasPermission);
                    return resolve(true)
                }, function (err) {
                    console.log('failed to set permission');
                    return reject(err)
                });
            } else {
                return resolve(true)
            }
        }, function (err) {
            console.log(err);
            return reject(err)
        });
    });
}

export default checkFilePermission;