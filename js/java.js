let currentMusic= 0;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const nombreMusica = document.querySelector('.nombre-musica');
const nombreArtista = document.querySelector('.nombre-artista');
const disk= document.querySelector('.disk');
const currentTime= document.querySelector('.tiempo-actual');
const duracionCancion= document.querySelector('.duracion-cancion');
const playBtn= document.querySelector('.play-btn');
const forwardBtn= document.querySelector('.forward-btn');
const backwardBtn= document.querySelector('.backward-btn');

playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause')){
        music.play();
    } else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play')
})

//Musica

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    nombreMusica.innerHTML = song.name;
    nombreArtista.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        duracionCancion.innerHTML = formatTime(music.duration);
    }, 300); 
}

setMusic(0);

// formatiando tiempo en minutos y segundos

const formatTime = (time) =>{
    let min = Math.floor(time/ 60);
    if(min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

// seek bar
setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        forwardBtn.click();
    }

}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}

//forward and Backward botones
forwardBtn.addEventListener('click', () =>{
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    } else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})

backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    } else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})