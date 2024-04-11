const main = document.getElementsByTagName('main')[0];

const head = document.createElement('h1');
head.textContent = 'We Decided For You';

const backgroundForArtist = document.createElement('div');
backgroundForArtist.className = 'background-for-artist';
backgroundForArtist.textContent = "";

const mainBox = document.createElement('section');

let arrayOfAudio1 = [], arrayOfAudio2 = [], say = 0, newsArrayForOnly1 = [], newsArrayForOnly2 = [];
const musicListen = (arr) => {
    arr.forEach((m) => {
        if (!(newsArrayForOnly1.includes(m.music))) {
            newsArrayForOnly1.push(m.music);
            newsArrayForOnly2.push(m)
        }
    })

    //arr = newsArrayForOnly2;

    let randomForAllMusic = Math.floor(Math.random() * arr.length),
        listOfRandomForAllMusic = [randomForAllMusic];
    arr.forEach((element1) => {
        const mainBoxChild = document.createElement('div');
        const mainBoxChildPhotoBox = document.createElement('div')
        const mainBoxChildPhoto = document.createElement('img');
        mainBoxChildPhoto.setAttribute('src', arr[randomForAllMusic].coverOfMusic);
        mainBoxChildPhotoBox.append(mainBoxChildPhoto)
        if (arr[randomForAllMusic].eurovision && !arr[randomForAllMusic].winner) {
            mainBoxChildPhotoBox.className = 'eurovision-music';
        }
        else if (arr[randomForAllMusic].winner) {
            mainBoxChildPhotoBox.className = 'winner';
        }
        const mainBoxChildNameOfArtist = document.createElement('a');
        mainBoxChildNameOfArtist.textContent = arr[randomForAllMusic].artist;
        mainBoxChildNameOfArtist.className = 'mainBoxChildNameOfArtist'
        const mainBoxChildNameOfMusic = document.createElement('a');
        mainBoxChildNameOfMusic.textContent = arr[randomForAllMusic].music;
        mainBoxChildNameOfMusic.className = "mainBoxChildNameOfMusic";
        const playMusic = document.createElement('i');
        playMusic.className = 'bx bx-play';

        let audioElementsForSeconds = document.createElement('audio');
        audioElementsForSeconds.className = 'audio';
        audioElementsForSeconds.setAttribute('src', arr[randomForAllMusic].linkOfMusic);

        while (listOfRandomForAllMusic.includes(randomForAllMusic)) {
            randomForAllMusic = Math.floor(Math.random() * arr.length);
            if (listOfRandomForAllMusic.length >= arr.length) {
                break;
            }
        }
        listOfRandomForAllMusic.push(randomForAllMusic);

        mainBoxChild.append(mainBoxChildPhotoBox, playMusic, mainBoxChildNameOfMusic, mainBoxChildNameOfArtist);
        mainBox.append(mainBoxChild);

        arrayOfAudio1.push(audioElementsForSeconds);


        playMusic.addEventListener('click', (e) => {
            let audioLength = audioElementsForSeconds.duration;


            for (let i in arrayOfAudio1) {
                if (say === 0) {
                    arrayOfAudio2.push(arrayOfAudio1[i].duration);
                }
            }

            say++;

            arr.forEach((f) => {
                if (f.music === e.target.nextElementSibling.textContent) {
                    leftFunc(arr, 'bx bx-pause', f.coverOfMusic, f.music, f.artist, f.linkOfMusic, arrayOfAudio2, arrayOfAudio2[arrayOfAudio2.indexOf(audioLength)], f.coverOfArtist, f.year, f.country, f.gender, listOfRandomForAllMusic);
                }
                searchMainElement.innerHTML = "";
                searchMainElement.style.height = "0";
            });
        });
    });
}



musicListen(arrayOfMusic);

header.addEventListener('click', (e) => {
    if (e.target.textContent === 'by Country') {
        e.target.nextElementSibling.classList.toggle('showThem');
        e.target.parentElement.nextElementSibling.children[1].classList.remove('showThem');
    }
    else if (e.target.textContent === 'by Year') {
        e.target.nextElementSibling.classList.toggle('showThem');
        e.target.parentElement.previousElementSibling.children[1].classList.remove('showThem');
    }
    else if (e.target.textContent === 'by Winner') {
        let byWinner = [];
        head.textContent = `Winners of the Eurovision Song Contest`;
        arrayOfMusic.forEach((newListElement) => {
            if (newListElement.winner) {
                byWinner.push(newListElement);
            }
        });
        mainBox.innerHTML = "";
        musicListen(byWinner);
        mainBox.classList.remove('for-artist');
        backgroundForArtist.style.display = 'none';
    }
    else if (e.target.textContent === 'All') {
        mainBox.innerHTML = "";
        head.textContent = `We Decided For You`;
        musicListen(arrayOfMusic)
        mainBox.classList.remove('for-artist');
        backgroundForArtist.style.display = 'none';
    }
});

headerChooseElementsCountryList.addEventListener('click', (e) => {
    let byCountry = [];
    head.textContent = `${e.target.textContent} at the Eurovision Song Contest`;
    arrayOfMusic.forEach((newListElement) => {
        if (newListElement.country === e.target.textContent && newListElement.eurovision) {
            byCountry.push(newListElement);
        }
    });
    mainBox.innerHTML = "";
    musicListen(byCountry);
    e.target.parentElement.classList.remove('showThem');
    e.target.parentElement.parentElement.nextElementSibling.children[1].classList.remove('showThem');
    mainBox.classList.remove('for-artist');
    backgroundForArtist.style.display = 'none';
});

headerChooseElementsYearsList.addEventListener('click', (e) => {
    let byYears = [];
    head.textContent = `Eurovision Song Contest ${e.target.textContent}`;
    arrayOfMusic.forEach((newListElement) => {
        if (newListElement.year == e.target.textContent && newListElement.eurovision) {
            byYears.push(newListElement);
        }
    });
    mainBox.innerHTML = "";
    musicListen(byYears);
    e.target.parentElement.classList.remove('showThem');
    e.target.parentElement.parentElement.previousElementSibling.children[1].classList.remove('showThem');
    mainBox.classList.remove('for-artist');
    backgroundForArtist.style.display = 'none';
});


const callArtist = (e) => {
    let c = 0;
    arrayOfMusic.forEach((yoxla) => {
        if (e.target.textContent === yoxla.artist) {
            c++;
        }
    })
    if (c !== 0) {
        let bySinger = [];
        head.textContent = `Artist: ${e.target.textContent}`;
        backgroundForArtist.textContent = e.target.textContent;
        backgroundForArtist.style.display = 'flex';
        arrayOfMusic.forEach((newListElement) => {
            if (e.target.textContent === newListElement.artist) {
                backgroundForArtist.style.backgroundImage = `url(${newListElement.coverOfArtist})`;
                bySinger.push(newListElement);
            }
        });
        mainBox.innerHTML = "";
        musicListen(bySinger);
        mainBox.classList.add('for-artist');
    }
}

// A R T I S T S

boxOfDecided.addEventListener('click', (e) => {
    callArtist(e);


    let newList = [];
    JSON.parse(localStorage.getItem('arrayOfnameOfPlayList')).forEach((f, index) => {
        if (e.target.textContent === f) {
            head.textContent = `Your Playlist: ${e.target.textContent}`;
            JSON.parse(localStorage.getItem('arrayOfPlayList'))[index].forEach((m) => {
                arrayOfMusic.forEach((n) => {
                    if (m === n.music) {
                        newList.push(n);
                    }
                });
            });

            backgroundForArtist.style.display = 'none';
            mainBox.innerHTML = "";
            musicListen(newList);
            mainBox.classList.add('for-artist');
        }
    });




    arrayOfMusic.forEach((f) => {
        if (e.target.textContent === f.artist) {
            if (showAllArtists.textContent === 'Show Less') {
                showAllArtists.textContent = 'Show all';
                header.style.height = '232px';
                if (window.innerWidth < 700) {
                    header.style.height = '180px';
                }
                showCount++;
            }
        }
    })
});


musicForLeft.addEventListener('click', (e) => {
    callArtist(e);
});


mainBox.addEventListener('click', (e) => {
    callArtist(e);
});









searchBox.addEventListener('click', () => {
    searchMusicArtist.style.display = 'block';
});

let arrayOfSearch = [];
const searchMainElement = document.getElementById('searchMainElement');
searchMusicArtist.addEventListener('keydown', () => {
    arrayOfSearch = [];
    searchMainElement.innerHTML = "";
    let countOfMusic = 0;
    arrayOfMusic.forEach((e) => {
        searchMainElement.style.height = "500px";
        searchMainElement.style.overflow = "auto";
        if (e.artist.toUpperCase().includes(searchMusicArtist.value.toUpperCase().trim()) && !arrayOfSearch.includes(e.artist)) {
            const searchElements = document.createElement('div');
            searchElements.style.position = 'relative';
            const searchElementsCover = document.createElement('img');
            searchElementsCover.setAttribute('src', e.coverOfArtist);
            const searchElementsName = document.createElement('span');
            searchElementsName.textContent = e.artist;
            searchElementsName.style.height = '165px';
            searchElements.append(searchElementsCover, searchElementsName);
            searchMainElement.append(searchElements);

            arrayOfSearch.push(e.artist);
        }
        else if (e.music.toUpperCase().includes(searchMusicArtist.value.toUpperCase().trim()) && !arrayOfSearch.includes(e.artist)) {
            const searchElements = document.createElement('div');
            searchElements.style.position = 'relative';
            const searchElementsCover = document.createElement('img');
            searchElementsCover.setAttribute('src', e.coverOfMusic);
            const searchElementsName = document.createElement('span');
            searchElementsName.textContent = e.artist;
            searchElementsName.style.fontSize = '.9rem';
            searchElementsName.style.fontWeight = '400';

            const searchElementsNameMusic = document.createElement('span');
            searchElementsNameMusic.setAttribute('class', 'name-music');
            searchElementsNameMusic.textContent = e.music;

            searchElements.append(searchElementsCover, searchElementsNameMusic, searchElementsName);
            searchMainElement.append(searchElements);

            arrayOfSearch.push(e.music);
        }
        else if (searchMusicArtist.value === "") {
            searchMainElement.innerHTML = "";
        }
        else {
            countOfMusic++;
        }
    });

    if (countOfMusic >= arrayOfMusic.length) {
        searchMainElement.innerHTML = '<span style="color: red; font-weight: 900; padding: 10px; width: 100%; text-align: center;">No Reasult</span>'
    }
});

searchMainElement.addEventListener('click', (e) => {
    callArtist(e);
    searchMainElement.innerHTML = "";
    searchMainElement.style.height = "0";
    searchMusicArtist.style.display = "none";
    arrayOfSearch = [];

    leftFixed.classList.remove('music-mobile');
    removeMobile.style.display = 'none';
});



musicForLeft.addEventListener('click', (e) => {
    if (window.innerWidth < 700 && !e.target.className.includes('bx')) {
        musicForLeft.append(removeMobile);
        removeMobile.style.display = 'block';
        leftFixed.classList.add('music-mobile');
    }

    arrayOfMusic.forEach((f) => {
        if (e.target.textContent === f.artist) {
            callArtist(e);
            leftFixed.classList.remove('music-mobile');
            removeMobile.style.display = 'none';
        }
    });
});

removeMobile.addEventListener('click', () => {
    leftFixed.classList.remove('music-mobile');
    removeMobile.style.display = 'none';
});

main.append(head, backgroundForArtist, mainBox);
