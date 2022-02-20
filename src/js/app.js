import $ from 'dom7';
import * as pdfjsLib from 'pdfjs-dist';
//import Viewer from './viewer.js';
import Framework7, { getDevice } from 'framework7/bundle';
// Import F7 Styles
import 'framework7/framework7-bundle.css';
import readfiles from './readfiles.js';
// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';
//import PDFViewerApplicationOptions from './viewer.js';
// Import Routes
import routes from './routes.js';
// Import Store
import store from './store.js';
// Import main app component
import App from '../app.f7';
import zoom from './zoom.js';
import PermissionManager from './permissions.js';
import showfiles from './showfiles.js';
import TranslationManager from './translationManager.js';
import readfiles1 from './read.js';
import checkFilePermission from './checkpermission.js';
import listfiles from './listfiles.js';
import virtualListWrapper from './virtuallist.js';
import pdfWrapper from './pdfWrapper.js';
import extractpdf from './extract_pdf';
const CMAP_URL="../../node_modules/pdfjs-dist/cmaps/";

var isBrowser=true;

var device = getDevice();
var app = new Framework7({
  name: 'Pdf', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element
  component: App, // App main component
  id: 'me.sapora.pdfreader.pdf.reader', // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,
  theme:'auto',
  stackPages:true,
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
    androidBackgroundColor:'#f7f7f8',
    androidTextColor:'black'
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});

//home -page 
$(document).on("page:init",".page[data-name='home']",function(e,page){
  console.log('home page');

  if(isBrowser==true){
    var dummy_data=[
    {"name":"Pdf File 1","url":"here's url"},
    {"name":"Pdf File 2","url":"here's url"},
    {"name":"Pdf File 3","url":"here's url"},
    {"name":"Pdf File 4","url":"here's url"},
    {"name":"Pdf File 5","url":"here's url"},
    {"name":"Pdf File 6","url":"here's url"},
    {"name":"Pdf File 7","url":"here's url"},
    {"name":"Pdf File 8","url":"here's url"},
    {"name":"Pdf File 9","url":"here's url"},
    {"name":"Pdf File 10","url":"here's url"},
    {"name":"Pdf File 11","url":"here's url"},
    {"name":"Pdf File 12","url":"here's url"},
    {"name":"Pdf File 13","url":"here's url"},
    ];
    for(var i=0;i<dummy_data.length;i++){
      showfiles.makerow(dummy_data[i]);
      store.dispatch('addFiles',{
        "url":dummy_data[i].url,
        "name":dummy_data[i].name,
      });
    }
  }else{
    listfiles.init(page);
  }
  var navbar=app.navbar.getElByPage(page);

  $(navbar).on("navbar:collapse",function(){
    $(page.el).find("#icons_right").show();
  });

  $(navbar).on("navbar:expand",function(){
    $(page.el).find("#icons_right").hide();
  });


  //after click set url on storage and open that pdf by navigating to pdf_url
  page.$el.on("click",".FileEntry",function(e){
    localStorage.setItem("pdf_url",$(this).attr("url"));
    app.views.main.router.navigate('/viewer');
  });

  //if user has not set their language preference, this will set the language for them 
  $(page.el).find(".languagecontainer").on("click",function(e){
    var cc=$(this).attr('attr');
    localStorage.setItem("languageCode",cc);
    app.popup.close();
    TranslationManager.home(cc,page);
  });

});


//changes before home page
$(document).on("page:beforein",".page[data-name='home']",function(e,page){
  app.statusbar.setBackgroundColor('#f7f7f8');
  app.statusbar.setTextColor('black');

  //checking if it's direct or using normal app opening
  //need to change it in future
  if(localStorage.getItem('direct')==='true' || localStorage.getItem('direct')===true){
    localStorage.setItem('direct',undefined);
    app.views.main.router.navigate('/viewer');
  }

  //checking user's language preference
  const code=localStorage.getItem("languageCode");
  if(code===null || code===undefined){
    app.popup.open('.language-popup',true);
  }else{
    //translating language
    TranslationManager.home(code,page);
  }

});


//changes before pdf viewer
$(document).on("page:beforein",".page[data-name='viewer'",function(e,page){
  TranslationManager.viewer(page);
});

//viewer page
$(document).on("page:init",".page[data-name='viewer']",function(e,page){

  //setting appbar
  app.statusbar.setBackgroundColor('#000000');
  app.statusbar.setTextColor('white');

  //zoom functionality(need to change it in future)
  zoom.init();

  //to detect user search event
  $(page.el).find("#search_switch").on("click",function(e){
    $(page.el).find("#navbar_1").addClass("hidden");
    $(page.el).find("#navbar_2").removeClass("hidden");
    $(page.el).find("#prevnext").removeClass("hidden");
  });

  //detect document property
  $(page.el).find("#documentProperties").on("click",function(e){
    app.popover.close();
  });

  //detect close search tap
  $(page.el).find("#hide_search").on("click",function(e){
    $(page.el).find("#navbar_2").addClass("hidden");
    $(page.el).find("#prevnext").addClass("hidden");
    $(page.el).find("#navbar_1").removeClass("hidden");
  });

});
function CheckIfMatches(file,query){
  query=query.toLowerCase();
  if(file.name.toLowerCase().indexOf(query)>=0){
    return true;
  }else{
    return false;
  }
}

$(document).on('page:beforein','.page[data-name="search"]',function(e,page){

  const code=localStorage.getItem("languageCode");
  if(code===null || code===undefined){
    app.popup.open('.language-popup',true);
  }else{
    //translating language
    TranslationManager.search(code,page);
  }
});
$(document).on('page:init','.page[data-name="dviewer"]',function(e,page){
  pdfjsLib.GlobalWorkerOptions.workerSrc='pdf.worker.js';
  var pdf_url;
  if(isBrowser==true){
    pdf_url='static/test1.pdf';
    //pdf_url='http://www.pdfill.com/example/pdf_commenting_new.pdf';
  }else{
    pdf_url=localStorage.getItem('pdf_url');
  }
  var loadingTask=pdfjsLib.getDocument({
    url:pdf_url,
    cMapUrl: CMAP_URL,
  cMapPacked: true,
  enableXfa: true,});
  extractpdf.init(pdfjsLib,page);
});
$(document).on('page:init','.page[data-name="cviewer"]',function(e,page){
  pdfjsLib.GlobalWorkerOptions.workerSrc='pdf.worker.js';
  var pdf_url;
  if(isBrowser==true){
    pdf_url='static/test1.pdf';
    //pdf_url='http://www.pdfill.com/example/pdf_commenting_new.pdf';
  }else{
    pdf_url=localStorage.getItem('pdf_url');
  }
  var loadingTask=pdfjsLib.getDocument({
    url:pdf_url,
    cMapUrl: CMAP_URL,
  cMapPacked: true,
  enableXfa: true,});


  loadingTask.promise.then(function(doc){
    //load the first page
    console.log(doc);
    pdfWrapper.loadPage(
      pdfjsLib,
      1,
      doc,
      $(page.el).find('#pdf-container'),
      $(page.el).find('#text-layer'),
      $(page.el).find('#annotation-layer')
    );

    //initialising range
    if(doc._pdfInfo.numPages>1){
      var page_range=app.range.create({
        min:1,
        max:doc._pdfInfo.numPages,
        value:0,
        step:1,
        label:true,
        el:'#page-slider',
        on:{
          changed:function(range,value){
            pdfWrapper.loadPage(pdfjsLib,value,doc,$(page.el).find('#pdf-container'),$(page.el).find('#text-layer'),$(page.el).find('#annotation-layer'));
          }
        }
      });
    }else{
      $(page.el).find(".toolbar").hide();
    }
  });
});
$(document).on('page:init','.page[data-name="search"]',function(e,page){
  var files=store.getters.getfiles.value;
  var searchbar=app.searchbar.create({el:'.searchbar',
    inputEl:'#search_input',
    customSearch:true,
    on:{
      search:function(s,query,prevQuery){
        if(query!==prevQuery && query.length>2){
          var finalquery=query.trim();
          var results=files.filter((file)=>CheckIfMatches(file,finalquery));
          var list_container=$(page.el).find('#MainPageListContainer');
          if(results.length===0){
            $(page.el).find('.searchbar-not-found').css("display","block");
            virtualListWrapper.destroy(list_container);
            return;
          }
          $(page.el).find('.searchbar-not-found').css("display","none");
          $(page.el).find(".searchbar-backdrop").removeClass("searchbar-backdrop-in");
          //showfiles.showfiles(results,page);
          virtualListWrapper.create(list_container,results);
        }
      },
      disable:function(e){
        $(page.el).find("#MainPageList").empty();
        $(page.el).find('#search_placeholder').show();
      },
      enable:function(e){
        $(page.el).find("#search_placeholder").hide();
      }
    }
  });

  page.$el.on("click",".FileEntry",function(e){
    localStorage.setItem("pdf_url",$(this).attr("url"));
    app.views.main.router.navigate('/viewer');
  });

});


//device ready event
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  isBrowser=false;

  //checking action
  window.plugins.intentShim.getIntent(function(intent) {
    if(intent.action==="android.intent.action.VIEW"){
      localStorage.setItem("pdf_url",intent.data);
      localStorage.setItem("direct",true);
    }
  },function(){
    console.log("error getting launch intent");
  });

 // checkFilePermission();
}

//handling back button
document.addEventListener('backbutton',function(){
  if(app.views.main.history.length===1){
    navigator.app.exitApp();
  }else{
    app.views.main.router.back();
  }
},false);
export default app;

/*
Sapora Pdf Reader update ideas:-

1)Add option to delete Pdf file in viewer as well as main page
2)Add search in main page.
3)black navbar(in viewer) is stuck on top, make it unsticky, so that there is more
  area for pdf
4)Use some external js for detecting zoom as current implementation is not perfect.
5)Give detail a native feeling as well as check it's scrolling in landscape mode.
6)password help string is not localised
7)Open link in external browser
8)read pdf from sdcard(not so imporatant)
9)Add currentpage/totalpage label in viewer 
10) "It looks like you do not have..." message is not internationalized.
line 1843 is responsible for viewer.js in android, comment it in viewer.js and 
uncomment 1844 to test it in browser.

*/