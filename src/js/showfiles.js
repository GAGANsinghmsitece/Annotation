import $ from 'dom7';
let showfiles={

	'showfiles':function(targetfiles,page){
		$(page.el).find('#MainPagePreloader').css('display','none');
		if(targetfiles.length!==0){
			$(page.el).find('#MainPageListContainer').css('display','block');
			for(var i=0;i<targetfiles.length;i++){
				var html='<li class="FileEntry" url="'+targetfiles[i].url+'"><div class="item-content"><div class="item-media"><i class="f7-icons color_red">doc_fill</i></div><div class="item-inner"><div class="item-title">'+targetfiles[i].name+'</div><div class="item-after"></div></div></div></li>';
				$(page.el).find('#MainPageList').append(html);
			}
		}else{
			$(page.el).find('#MainPageMessage').css('display','block');
		}
	},
	'makerow':function(data){
		$('#MainPagePreloader').css('display','none');
		$('#MainPageListContainer').css('display','block');
		var html='<li class="FileEntry" url="'+data.url+'"><div class="item-content"><div class="item-media"><i class="f7-icons color_red">doc_fill</i></div><div class="item-inner"><div class="item-title">'+data.name+'</div><div class="item-after"></div></div></div></li>';
		$('#MainPageList').append(html);
	}
}
export default showfiles;