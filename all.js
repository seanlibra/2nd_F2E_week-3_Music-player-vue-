
const app = new Vue ({
    el:"#Music_player",
    data:{
        isplaying :false,
        current_index:0,
        current:{},
        loop:false,
        shuffle:false,
        mute:false,
        currentTime:'',
        nowPlaying_bar:'',
        volume:0.5,
        page:'all',
        songs_list :[
            {
                title:'Glass Bead',
                artist:'GFRIEND',
                second:223,
                cover:'./assets/cover/Glass Bead.jpg',
                src:"./assets/audios/GFRIEND - Glass Bead.mp3"
            },{
                title:'NAVILLERA',
                artist:'GFRIEND',
                second:213,
                cover:'./assets/cover/Navillera.jpg',
                src:"./assets/audios/GFRIEND - NAVILLERA.mp3"
            },{
                title:'Rough',
                artist:'GFRIEND',
                second:286,
                cover:'./assets/cover/Rough.jpg',
                src:"./assets/audios/GFRIEND - Rough.mp3"
            },{
                title:'Sunny Summer',
                artist:'GFRIEND',
                second:206,
                cover:'./assets/cover/Sunny Summer.jpg',
                src:"./assets/audios/GFRIEND - Sunny Summer.mp3"
            },{
                title:'Water Flower',
                artist:'GFRIEND',
                second:221,
                cover:'./assets/cover/Water Flower.jpg',
                src:"./assets/audios/GFRIEND - Water Flower.mp3"
            },
            
        ],
        player:new Audio()
    },
    computed:{
       CompVolume(){
           return this.volume.toFixed(1)
       }
    },
    methods:{
       listenrSongTime(){
        var vm = this
        this.player.addEventListener("timeupdate",function(){       
        var original_time = vm.player.currentTime;
        vm.currentTime = Math.round(original_time)
        vm.nowPlaying_bar =  Math.floor(vm.currentTime / vm.current.second * 1000) / 10
        });
        this.player.addEventListener("ended",function(){
            if (vm.current_index == vm.songs_list.length - 1 && vm.loop == false){
                this.pause();
                vm.isplaying = false;
            }
            else {
                vm.next();  
            }
        });
       },
        play(song){
            if (typeof song.src !== "undefined") {
                this.isplaying = false;
                this.current = song;
                this.current_index = this.songs_list.indexOf(this.current); 
                this.player.src = this.current.src;
                this.player.play();
                this.isplaying = true;
               
              }
            else{
                this.player.play();
                this.isplaying = true;
            }  
        },
        prev(){
            if (this.isplaying == true){
                this.player.pause()
                this.current_index--;
                if (this.current_index < 0 ){
                    this.current_index = this.songs_list.length -1
                }
                this.setCurrentSong();
                this.player.play();
            }
            else {
             this.current_index--;
             if (this.current_index < 0 ){
                this.current_index = this.songs_list.length -1
             }
             this.setCurrentSong();
            }
        },
        next(){
           if (this.isplaying == true){
               this.player.pause()
               this.current_index++;

               if (this.current_index > this.songs_list.length -1){
                   this.current_index = 0;
               }
               this.setCurrentSong();
               this.player.play();
           }
           else {
            this.current_index++;
            if (this.current_index > this.songs_list.length -1){
                this.current_index = 0;
            }
            this.setCurrentSong();
           }
        },
        pause(){
            this.isplaying = false;
            this.player.pause();
        },
        setCurrentSong(){
          this.current = this.songs_list[this.current_index];
          this.player.src = this.current.src
        },
        setSecond(secs){
            var hr = Math.floor(secs / 3600);
            var min = Math.floor((secs - (hr * 3600)) / 60);
            var sec = parseInt( secs - (hr * 3600) - (min * 60));
            if (sec < 10){
                sec = '0' + sec
            }
            if (hr) hr += ':';
            return hr + min + ':' + sec;
        },
        seek(e){
           
                if (typeof(e) === "number" ){
                    const seekPos = e / 960;
                    this.player.currentTime = parseInt(this.player.duration * seekPos);
                    
                }
                else {
                    const el = e.target.getBoundingClientRect();
                    const seekPos = (e.clientX - el.left) / el.width;
                    this.player.currentTime = parseInt(this.player.duration * seekPos);
                }
            
        },
        inner_seek(e){
            const el = e.target.getBoundingClientRect();
            const seekPos = e.clientX - el.left
            this.seek(seekPos)
        },
        setVolume(e){
            const el = e.target.getBoundingClientRect();
            const volume = (e.clientX - el.left) / el.width;
            console.log(volume)
            this.volume = volume
            this.player.volume = this.CompVolume
        },
        inner_setVolume(e){
            const el = e.target.getBoundingClientRect();
            const volume =  (e.clientX - el.left) / 92;
            console.log(volume)
            this.volume = volume
            this.player.volume = this.CompVolume
        },
        setMute(){
            this.player.muted = true;
            this.mute = true;
        },
        cancelMute(){
            this.player.muted = false;
            this.mute = false;
        }
    },
    mounted(){
        this.setCurrentSong();
        this.listenrSongTime();
        this.player.volume = this.volume;
    }
})

