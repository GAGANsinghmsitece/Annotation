import ViewerPage from '../pages/viewer.f7';
import HomePage from '../pages/home.f7';
import SearchPage from '../pages/search.f7';
import CViewer from '../pages/viewer_implementation.f7';
import DViewer from '../pages/viewer3.f7';

var transitons={
  circle:'f7-circle',
  cover:'f7-cover',
  vertical_cover:'f7-cover-v',
  dive:'f7-dive',
  fade:'f7-fade',
  flip:'f7-flip',
  parallax:'f7-parallax',
  push:'f7-push',
}
var routes = [
  {
    path: '/',
    component:CViewer,
    //component: HomePage,
    keepAlive:true,
  },{
    path:'/viewer',
    component:CViewer,
    /*options:{
      transition:transitons.vertical_cover,
    }*/
  },{
    path:'/search',
    component:SearchPage,
    options:{
      transiton:transitons.parallax,
    }
  }
];

export default routes;
