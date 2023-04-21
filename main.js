async function getVideos() {
	var xmlHttp = new XMLHttpRequest();
	let theUrl = 'https://pipedapi.adminforge.de/trending?region=US';
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
	let response = JSON.parse(xmlHttp.responseText);
	let videoId = response[0].url.split("=");

	theUrl = 'https://pipedapi.adminforge.de/streams/' + videoId[1];
	xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
	response = JSON.parse(xmlHttp.responseText);

	let video = document.createElement('video-js');
	video.className = 'video-js';
	video.id = 'my-video';
	video.setAttribute('controls', true);
	video.setAttribute('preload', 'auto');
	video.setAttribute('data-setup', '{}');

	let source = document.createElement('source');
	source.src = response.hls;
	source.type = 'application/x-mpegURL';
	video.appendChild(source);

	let title = document.createElement('p');
	title.innerText = JSON.stringify(response.title);

	let main = document.querySelector('#main');
	main.innerHTML = "";
	main.appendChild(title)
	main.appendChild(video);

	videojs.log.level('all');
	videojs(video);
}

window.addEventListener("DOMContentLoaded", () => {
	getVideos();
})
