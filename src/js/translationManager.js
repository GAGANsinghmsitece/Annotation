import $ from 'dom7';
import languages from './languages';

let TranslationManager={
	'home':function(code,page){
		let title=languages[code]['title'];
		$(page.el).find("#home_title").html(title);
		$(page.el).find("#home_title1").html(title);
	},
	'search':function(code,page){
		$(page.el).find("#title").html(languages[code].search.title);
		$(page.el).find("#search_input").attr('placeholder',languages[code].search.placeholder);
		$(page.el).find("#search_placeholder").html(languages[code].search.initial);
		$(page.el).find("#noresults").html(languages[code].search.noresults);
	},
	'viewer':function(page){
		var code=localStorage.getItem("languageCode");
		$(page.el).find("#viewer_rotate").html(languages[code]['rotate']);
		$(page.el).find("#viewer_vscroll").html(languages[code]['vscroll']);
		$(page.el).find("#viewer_hscroll").html(languages[code]['hscroll']);
		$(page.el).find("#viewer_fpage").html(languages[code]['fpage']);
		$(page.el).find("#viewer_lpage").html(languages[code]['lpage']);
		$(page.el).find("#viewer_details").html(languages[code]['detail']);
		$(page.el).find("#viewer_title").html(languages[code]['title']);
		$(page.el).find("#passwordText").html(languages[code]["password_text"]);
		$(page.el).find("#password").attr("placeholder",languages[code]["password"]);
		$(page.el).find("#passwordCancel").html(languages[code]['cancel']);
		$(page.el).find("#passwordSubmit").html(languages[code]["ok"]);
		$(page.el).find("#document_properties_file_name").html(languages[code]["file_name"]);
		$(page.el).find("#document_properties_file_size").html(languages[code]["file_size"]);
		$(page.el).find("#document_properties_title").html(languages[code]["file_title"]);
		$(page.el).find("#document_properties_author").html(languages[code]["file_author"]);
		$(page.el).find("#document_properties_subject").html(languages[code]["file_subject"]);
		$(page.el).find("#document_properties_keywords").html(languages[code]["file_keyword"]);
		$(page.el).find("#document_properties_creation_date").html(languages[code]["file_creation"]);
		$(page.el).find("#document_properties_modification_date").html(languages[code]["file_modification"]);
		$(page.el).find("#document_properties_creator").html(languages[code]["file_creator"]);
		$(page.el).find("#document_properties_producer").html(languages[code]["file_producer"]);
		$(page.el).find("#document_properties_version").html(languages[code]["file_version"]);
		$(page.el).find("#document_properties_page_count").html(languages[code]["file_pagecount"]);
		$(page.el).find("#document_properties_page_size").html(languages[code]["file_pagesize"]);
		$(page.el).find("#documentPropertiesClose").html(languages[code]["close"]);
		$(page.el).find("#file_information").html(languages[code]["file_information"]);
	}
}
export default TranslationManager;