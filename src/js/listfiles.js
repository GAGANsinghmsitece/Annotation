import $ from 'dom7';

import app from './app.js';
import store from './store.js';
import read from './read.js';
import virtualListWrapper from './virtuallist.js';


let listfiles={
	init:async function(page){
		var files=await read.init(cordova);
		store.dispatch('setFiles',files);
		$(page.el).find("#MainPagePreloader").css('display','none');
		if(files==undefined ||files.length===0){
			$(page.el).find("#MainPageMessage").css('display','block');
			return;
		}
		virtualListWrapper.create($(page.el).find('.virtual-list'),files);
	},
	CheckIfMatches:function (file,query){
  		query=query.toLowerCase();
  		if(file.name.toLowerCase().indexOf(query)>=0){
    		return true;
  		}else{
    		return false;
    	}
  	}
}

export default listfiles;