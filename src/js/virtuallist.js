import $ from 'dom7';

import app from './app.js';

let virtualListWrapper={
	create:function(htmlelement,data){
		//creates virtualist and return it.
		let virtuallist=app.virtualList.create({
			el:htmlelement,
            items:data,
            renderItem:function(item){
              return '<li class="FileEntry" url="'+item.url+'"><div class="item-content"><div class="item-media"><i class="f7-icons color_red">doc_fill</i></div><div class="item-inner"><div class="item-title">'+item.name+'</div><div class="item-after"></div></div></div></li>'
            },
        });
        return virtuallist;
	},
	destroy:function(htmlelement){
		//it detaches all events from list and then we clear the container using element pass element as $(pege.el).find('#something')
		app.virtualList.destroy(htmlelement);
		htmlelement.empty();
	}
}

export default virtualListWrapper;