function isFullScreen()
{
	if(document.fullscreenElement)
	{
		return true;
	}
	else if(document.webkitFullscreenElement)
	{
		return true;
	}
	else if(document.mozFullScreenElement)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function makeFullScreen(){
  if(isFullScreen())
  {
    return;
  }

  var el = document.getElementsByTagName('canvas')[0];
  var requestFullScreen = el.requestFullscreen || el.msRequestFullscreen || el.mozRequestFullScreen || el.webkitRequestFullscreen;

  if(requestFullScreen)
  {
    requestFullScreen.call(el);
  }
}
