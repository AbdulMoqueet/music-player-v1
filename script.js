/*
* Design Inspired By:
* https://in.pinterest.com/pin/586171707737215905/
*
* Date of posting: 16-Feb-2020
* Created by: Abdul Moqueet 
*
*
*/

var songs = [
    {
        name:"Sing Me To Sleep",
        singer:"Alan Walker",
        duration:"03:11",
        url:"songs/Sing_Me_To_Sleep.mp3",
        albumArt:"images/Sing_Me_To_Sleep.jpg"
    },

    {
        name:"Lily",
        singer:"Alan Walker",
        duration:"03:16",
        url:"songs/Lily.mp3",
        albumArt:"images/Lily.jpg"
    },

    {
        name:"Faded",
        singer:"Alan Walker",
        duration:"03:32",
        url:"songs/Faded.mp3",
        albumArt:"images/Faded.jpg"
    },

    {
        name:"Keep Holding On",
        singer:"Avril Lavigne",
        duration:"04:12",
        url:"songs/Keep_Holding_On.mp3",
        albumArt:"images/Keep_Holding_On.jpg"
    },

    {
        name:"Give your heart a break",
        singer:"Demi Lovato",
        duration:"03:28",
        url:"songs/Give_Your_Heart_a_Break.mp3",
        albumArt:"images/Give_Your_Heart_a_Break.jpg"
    },

    {
        name:"You are not alone",
        singer:"Michael Jackson",
        duration:"05:35",
        url:"songs/You_Are_Not_Alone.mp3",
        albumArt:"images/You_Are_Not_Alone.jpg"
    },

    {
        name:"Skyscraper",
        singer:"Demi Lovato",
        duration:"03:11",
        url:"songs/Skyscraper.mp3",
        albumArt:"images/Skyscraper.jpg"
    },

    {
        name:"Innocence",
        singer:"Avril Lavigne",
        duration:"03:50",
        url:"songs/Innocence.mp3",
        albumArt:"images/Keep_Holding_On.jpg"
    },

    {
        name:"Wish you were here",
        singer:"Avril Lavigne",
        duration:"03:50",
        url:"songs/Wish_You_Were_Here.mp3",
        albumArt:"images/Wish_You_Were_Here.jpg"
    },

    {
        name:"Heart Attack",
        singer:"Demi Lovato",
        duration:"03:29",
        url:"songs/Heart_Attack.mp3",
        albumArt:"images/Heart_Attack.jpg"
    },

    {
        name:"On My Way",
        singer:"Alan Walker",
        duration:"03:13",
        url:"songs/On_My_Way.mp3",
        albumArt:"images/On_My_Way.jpg"
    },

    {
        name:"",
        singer:"",
        duration:"",
        url:"",
        albumArt:""
    }
];

var mediaPlayer,
    audioSource,
    playBtn,
    bar,
    timeDuration,
    seekBar,
    isPlaying=false,
    bottomSongName,
    bottomSingerName,
    songListDuration,
    toast,
    currentSong=0,
    accentColor,
    bufferingStatus,
    isReady = false,
    songCards;

document.addEventListener("DOMContentLoaded", function(){   
    var cards = "";

    for(var i=0; i<songs.length; i++){

        cards = cards+`<div class="top__card-holder__card" onclick="playSong(`+i+`);" style="background-image: url(`+
            songs[i].albumArt
            +`)">
<div class="top__card-holder__card__song-info">
<div class="top__card-holder__card__song-artist-title">
<div class="top__card-holder__card__song-info__name">
`+songs[i].name+`
</div>

<div class="top__card-holder__card__song-info__singer">
`+songs[i].singer+`
</div>
</div>

</div>
</div>`;

    }


    var cardsHolder = document.getElementById("cards-holder");
    cardsHolder.innerHTML = cards;

    var listElements="";

    for(var i=0; i<songs.length-1; i++){
        listElements += `<div class="middle__song-list" onclick="playSong(`+i+`)"; >
<div class="song-list__warpper">
<img class="song-list__dp" src="`+songs[i].albumArt+`">
<div class="song-list__info">
<div class="song-list__name">`+songs[i].name+`</div>
<div class="song-list__playedtime">`+songs[i].singer+`</div>
</div>
</div>
<div class="song-list__duration">`+songs[i].duration+`</div>
</div>`;
    }

    var songList = document.getElementById("songs-list");
    songList.innerHTML = listElements;




    /*implementing custom media player refference from: 
    https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Cross-browser_audio_basics#Creating_your_own_custom_audio_player*/

    mediaPlayer = document.getElementById('media-player');
    playBtn = document.getElementById('play-btn');
    bar = document.getElementById('bar');
    timeDuration = document.getElementById('time-duration');
    seekBar = document.getElementById('progress');
    audioSource = document.getElementById('audio-source');
    bottomSongName = document.getElementById('bottom-song-name');
    bottomSingerName = document.getElementById('bottom-singer-name');
    songListDuration = document.getElementsByClassName('song-list__duration');
    songCards = document.getElementsByClassName("top__card-holder__card");
    bufferingStatus = document.getElementById('bufferingStatus');
    toast = document.getElementById("toast");
    var myStyle = getComputedStyle(document.body);
    accentColor = myStyle.getPropertyValue('--top-bg-color');

    playBtn.addEventListener('click', function() {
        isReady=true;
        if(isPlaying){
            mediaPlayer.pause();
            playBtn.innerHTML = "play_arrow";
            isPlaying=false;
        }else{
            mediaPlayer.play();
            songListDuration[currentSong].style.color = accentColor;
            songCards[currentSong].style.color = accentColor;
            playBtn.innerHTML = "pause";
            isPlaying=true;
        }
    });

    mediaPlayer.addEventListener('timeupdate', function() {
        writeProgressAndDuration();
        bufferingStatus.style.opacity=0;
    });

    mediaPlayer.addEventListener("progress", function() {
        if(isReady)
            bufferingStatus.style.opacity=1;
    });

    mediaPlayer.addEventListener("canplay", function() {
        writeProgressAndDuration();
    });

    seekBar.addEventListener('click', function(e) {

        var clickPosition = (e.pageX  - this.offsetLeft) / this.offsetWidth;
        var jumpTime = clickPosition * mediaPlayer.duration;

        mediaPlayer.currentTime = jumpTime;

    });

    mediaPlayer.addEventListener("ended", function() {
        mediaPlayer.pause();
        playBtn.innerHTML = "replay";
        isPlaying=false;
    });
    
    toast.addEventListener("webkitAnimationEnd", function(){
        toast.style.animation="none";
    });

    function writeProgressAndDuration(){
        var time = parseInt(mediaPlayer.currentTime, 10),
            songDuration = parseInt(mediaPlayer.duration, 10);

        bar.style.width = parseInt(((time / songDuration) * 100), 10) + "%";

        var minutes = Math.floor(time / 60),
            seconds = time - minutes * 60,
            songDurationMinutes = Math.floor(songDuration / 60),
            songDurationSeconds = Math.floor(songDuration - songDurationMinutes * 60);

        timeDuration.textContent = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2)+' / '+str_pad_left(songDurationMinutes,'0',2)+':'+str_pad_left(songDurationSeconds,'0',2);

        songListDuration[currentSong].textContent = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);

        function str_pad_left(string,pad,length) {
            return (new Array(length+1).join(pad)+string).slice(-length);
        }
    }

});

window.onload = function(){
    var loader = document.getElementById("loading");
    loader.style.display="none";
}

function showToast(){
    toast.style.animation = "fade 2s";
    toast.style.anmationFillMode = "forwards";
    
}

function playSong(songId){
    isReady = true;
    
    if(songId == songs.length-1)
        return;
    
    if(currentSong == songId){
        if(isPlaying){
            mediaPlayer.pause();
            isPlaying = false;
            playBtn.innerHTML = "play_arrow";
        }else{
            mediaPlayer.play();
            isPlaying = true;
            playBtn.innerHTML = "pause";
        }
        return;
    }

    audioSource.src = songs[songId].url;
    mediaPlayer.load();
    songListDuration[currentSong].textContent = songs[currentSong].duration;
    songListDuration[currentSong].style.color = "#717171";
    songCards[currentSong].style.color = "#fff";
    songListDuration[songId].style.color = accentColor;
    songCards[songId].style.color = accentColor;
    currentSong = songId;
    playBtn.innerHTML = "pause";
    isPlaying=true;
    bottomSongName.textContent = songs[songId].name;
    bottomSingerName.textContent = songs[songId].singer;
    mediaPlayer.play();
}