$ =document.querySelector.bind(document)
$$ =document.querySelectorAll.bind(document)


const app = {
    currentIndex: 0,
    isPlaying: true,
    songs :[
        {
            id:0,
            name: 'Lemon Tree',
            singer: 'Fools Garden',
            path: './asset/mp3/song1.mp3',
            image: './asset/img/song1.jpg'
        },
        {
            id:1,
            name: 'Thế giới thật tươi đẹp khi ôm em vào lòng',
            singer: 'Bách Tùng',
            path: './asset/mp3/song2.mp3',
            image: './asset/img/song2.jpg'
        },
        {
            id:2,
            name: 'Always with me',
            singer: 'Ghbili',
            path: './asset/mp3/song3.mp3',
            image: './asset/img/song3.jpg'
        },
        {
            id:3,
            name: 'Cuối tuần',
            singer: 'Nguyên Hà',
            path: './asset/mp3/song4.mp3',
            image: './asset/img/song4.jpg'
        },
        {
            id:4,
            name: 'Way Back Home',
            singer: 'HQ',
            path: './asset/mp3/song5.mp3',
            image: './asset/img/song5.jpg'
        },
        {
            id:5,
            name: 'My Love',
            singer: 'Weslife',
            path: './asset/mp3/song6.mp3',
            image: './asset/img/song6.jpg'
        },
        {
            id:6,
            name: 'Ký ức của gió',
            singer: 'Anri Kumaki',
            path: './asset/mp3/song7.mp3',
            image: './asset/img/song7.png'
        },
        {
            id:7,
            name: 'Phi Điểu Và Ve Sầu',
            singer: 'Nhậm Nhiêni',
            path: './asset/mp3/song8.mp3',
            image: './asset/img/song8.jpg'
        },
    ],
    defineProperties() {
        Object.defineProperty(this,'currentSong',{
            get() {
                return this.songs[this.currentIndex]
            } 
        })
    },
    render() {
        var render = app.songs.map(function(item) {
            return `
            <div class="song">
            <div class="thumb" style="background-image: url('${item.image}')">
            </div>
            <div class="body">
              <h3 class="title">${item.name}</h3>
              <p class="author">${item.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>`
        }).join('')
        $('.playlist').innerHTML = render
    },
    handleEvent() {
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth
        $('.playlist').onscroll = () => {
            const scrollTop =  $('.playlist').scrollTop
            const newCdWidth = cdWidth - scrollTop

            if(newCdWidth < 0) {
                cd.style.width = 0
            } else {
                cd.style.width = newCdWidth + 'px'
            }
        }
        //xử lí sự kiện play
        $('.btn-toggle-play').onclick = function() {
            if(app.isPlaying) {
                $('#audio').play()
            }
          else {
              $('#audio').pause()
             }
        }
        $('#audio').onplay = function() {
            console.log('dang chạy')
            app.isPlaying = false
            $('.btn-toggle-play').classList.add('playing')
        }
        $('#audio').onpause = function() {
            console.log('đang dừng')
            app.isPlaying = true
            $('.btn-toggle-play').classList.remove('playing')
        }
        //xử lí nút next và back
        const next = $('.btn-next')
        const back = $('.btn-prev')
        next.onclick = function() {
            app.isPlaying = true
            if(app.currentIndex<app.songs.length-1) {
                app.currentIndex+=1
            } else {
                app.currentIndex = 0
            }
            app.loadCurrentSong()
            $('.btn-toggle-play').classList.remove('playing')
        }
        back.onclick = function() {
            $('.btn-toggle-play').classList.remove('playing')
            app.isPlaying = true
            if(app.currentIndex>0) {
                app.currentIndex-=1
            } else {
                app.currentIndex = app.songs.length -1
            }
        app.loadCurrentSong()
        }
        // XỬ LÝ CLICK DANH BÀI HÁT
        $$('.song').forEach(function (item, index) {
            item.onclick = function () {
                $('.btn-toggle-play').classList.remove('playing')
                app.isPlaying = true
                app.currentIndex = index
                app.loadCurrentSong()
            }
        })
        //XỬ LÝ TUA NHẠC
        isBolean = true;
        $('input').oninput = function(e) {
                $('#audio').currentTime = (e.target.value/100)*$('#audio').duration
                isBolean = false
        }
        $('#audio').ontimeupdate = function() {
            if(isBolean) {
                if($('#audio').currentTime/ $('#audio').duration) {
                    $('input').value = ($('#audio').currentTime/ $('#audio').duration)*100 
                } else {
                    $('input').value= 0
                }
            }
        }
        $('#audio').onseeked = function() {
           isBolean = true
        }
        // XỬ LÍ VÒNG LẶP
        $('.btn-repeat').onclick = function() {
            $('.btn-repeat').classList.toggle('active')
            if($('.btn-repeat').classList.contains('active')) {
                $('#audio').loop = true
            } else {
                $('#audio').loop = false
            }
        }
        //Xử lí random và tự chuyển bài
        $('#audio').onended =function() {
            random = Math.random()
            if( $('.btn-random').classList.contains('active')) {
                app.isPlaying = true
                if(Math.abs(5-Math.floor(random*10)) != app.currentIndex && Math.abs(5-Math.floor(random*10)) != app.currentIndex -1) {
                    app.currentIndex = Math.abs(5-Math.floor(random*10))
                } else {
                    app.currentIndex+=1
                }
                app.loadCurrentSong()
                // $('.btn-toggle-play').classList.add('playing')
                setTimeout(function() {
                $('.btn-toggle-play').classList.remove('playing')
                $('#audio').play()
                },750)
            } else {
                app.isPlaying = true
            if(app.currentIndex<app.songs.length-1) {
                app.currentIndex+=1
            } else {
                app.currentIndex = 0
            }
            app.loadCurrentSong()
            setTimeout(function() {
            $('.btn-toggle-play').classList.remove('playing')
            $('#audio').play()
            },750)
            }
        }
        $('.btn-random').onclick = function() {
            $('.btn-random').classList.toggle('active')
        }
    },
    loadCurrentSong() {
        $('#audio').src = this.currentSong.path
        $('header h2').innerHTML = this.currentSong.name
        $('.cd-thumb').style.backgroundImage = `url('${this.currentSong.image}')`
    },
    start() {
        this.render()
        this.defineProperties()
        this.loadCurrentSong()
        this.handleEvent()
    }
}

app.start()



