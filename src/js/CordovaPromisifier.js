import Promise from 'bluebird';

function CordovaPromisifier(fn){
	return function(){
		var args= [].slice.call(arguments);
		var self=this;
		return new Promise(function(resolve,reject){
			args.push(function(result){
				if(result!=null){
					new resolve(result);
				}else{
					reject(new Error("cordova error"));
				}
			});
			fn.apply(self,args);
		});
	}
}
export default CordovaPromisifier;