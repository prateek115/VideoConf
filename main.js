let client = AgoraRTC.createClient({mode:'rtc', 'codec':"vp8"})

let config = {
	appid:'5296eca5afaa44bba52d0052a8c13f93',
	token:'0065296eca5afaa44bba52d0052a8c13f93IAB86DJyA4F1HAlHgSrBNhzfqzfiTBZijaQxouijDSdKPyzax3wAAAAAEACiqr7MM2/BYgEAAQAzb8Fi',
	uid:null,
	channel:'video' 
}

let localTracks = {
	audio:null,
	video:null
}

let remoteTracks = {}


document.getElementById('join-btn').addEventListener('click', async ()=> {
	console.log("User join stream")
	await joinStream()
})


let joinStream = async() => {

	[config.uid, localTracks.audio,localTracks.video] = await Promise.all([
		client.join(config.appid,config.channel,config.token), AgoraRTC.createMicrophoneAudioTrack(), AgoraRTC.createCameraVideoTrack()
		])


	let videoPlayer = `<div class ="video-container" id="video-wrapper-${config.uid}">
						<p class="user-uid">${config.uid}</p>
						<div class="video-player player" id="stream-${config.uid}"></div>
						</div>`

	document.getElementById("user-stream").insertAdjacentHTML('beforeend', videoPlayer)
	localTracks.video.play(`stream-${config.uid}`)

	await client.publish([localTracks.video,localTracks.audio])
 }
