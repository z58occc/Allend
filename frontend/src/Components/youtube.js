import React from 'react';


function YouTubeEmbed({ url }) {
    const videoIdIndex = url.indexOf('v=');
    let embedUrl = '';
    if (videoIdIndex !== -1) {
        const videoId = url.substring(videoIdIndex + 2); // 加2是为了跳过 'v='
        // 如果视频 ID 后面还有其他参数，截取到第一个 '&' 符号
        const ampersandIndex = videoId.indexOf('&');
        if (ampersandIndex !== -1) {
            embedUrl = `https://www.youtube.com/embed/${videoId.substring(0, ampersandIndex)}`;
        } else {
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
    }

    return (
        <div className="video-responsive">
            <iframe
                style={{width: '100%', height: 200}}
                src={embedUrl} 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
            />
        </div>
    );
}

export default YouTubeEmbed;
