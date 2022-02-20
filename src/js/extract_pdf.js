import {PDFViewer} from './pdf_js/web/pdf_viewer.js';
import $ from 'dom7';

let extractpdf={
	init:function(pdfjsLib,page){
		var pdf=new PDFViewer({
			container:$(page.el).find('.page-content')[0],
			viewer:$(page.el).find('#viewer')[0],
		});		
		console.log(page);
	}
}
export default extractpdf;