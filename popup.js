document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const url = tabs[0].url;
        const problemTitle = url.split('/').pop(); // Extract problem title from URL

        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${problemTitle} solution&key=YOUR_YOUTUBE_API_KEY`)
            .then(response => response.json())
            .then(data => {
                const videoList = document.getElementById('videoList');
                data.items.forEach(item => {
                    const videoId = item.id.videoId;
                    const videoElement = document.createElement('div');
                    videoElement.className = 'video';
                    videoElement.innerHTML = `<a href="#" onclick="playVideo('${videoId}')">${item.snippet.title}</a>`;
                    videoList.appendChild(videoElement);
                });
            });
    });
});

function playVideo(videoId) {
    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    const videoFrame = document.createElement('iframe');
    videoFrame.src = videoUrl;
    videoFrame.width = "300";
    videoFrame.height = "200";
    videoFrame.allowFullscreen = true;
    document.body.innerHTML = ''; // Clear previous content
    document.body.appendChild(videoFrame);
}
