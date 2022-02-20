import $ from 'dom7';
import DownloadManager from './pdf_js/web/download_manager.js';
import {PDFLinkService,SimpleLinkService} from './pdf_js/web/pdf_link_service.js';
import {PDFViewer} from './pdf_js/web/pdf_viewer.js';

let pdfWrapper={
	DownloadManager:new DownloadManager(),
	loadPage:function(lib,pageNum,pdf,canvas,textlayer,annotationlayer){
		pdf.getPage(pageNum).then(function(page){

			textlayer.empty();

			var scale=1.5;
			var viewport=page.getViewport({scale:scale});

			var new_scale=Math.round(window.innerWidth*scale/viewport.width);
			viewport=page.getViewport({scale:new_scale});


	
			var context = canvas[0].getContext('2d');
			canvas[0].height=viewport.height;
			canvas[0].width=viewport.width;

			var renderContext={
				canvasContext:context,
				viewport:viewport
			};

			var renderTask=page.render(renderContext);
			renderTask.promise.then(function(){
				page.getAnnotations().then(function(annotationData){
					pdfWrapper.showAnnotation(annotationlayer,canvas);
					
					lib.externalLinkTarget=lib.LinkTarget.BLANK;
					lib.AnnotationLayer.render({
        				viewport: viewport.clone({ dontFlip: true }),
        				div: annotationlayer[0],
        				annotations: annotationData,
        				page: page,
        				downloadManager:DownloadManager,
        				linkService:new PDFLinkService({
        					externalLinkTarget:lib.LinkTarget.BLANK
        				}),
        				imageResourcesPath: '/static/images/',
    				});
				});
				
				page.getTextContent().then(function(textcontent){
					pdfWrapper.showText(textlayer,canvas);
 
					lib.renderTextLayer({
						textContent:textcontent,
						container:textlayer[0],
						viewport:viewport,
						textDivs:[],
						enhanceTextSelection:true
					});
				});
			});
		});
	},
	showText:function(textlayer,canvas){
		var canvas_offset=canvas.offset();
		var canvas_width=canvas[0].width;
		var canvas_height=canvas[0].height;

		textlayer.css({
			left: canvas_offset.left + 'px',
			top: canvas_offset.top + 'px',
			height: canvas_height + 'px',
			width: canvas_width + 'px' 
		});
	},
	showAnnotation:function(annotationLayer,canvas){
		var canvas_offset=canvas.offset();
		var canvas_width=canvas[0].width;
		var canvas_height=canvas[0].height;

		annotationLayer.css({
			left: canvas_offset.left + 'px',
			top: canvas_offset.top + 'px',
			height: canvas_height + 'px',
			width: canvas_width + 'px'
		});
	}
}
export default pdfWrapper;