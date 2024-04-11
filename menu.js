const header = document.getElementsByTagName('header')[0];

const headerChoose = document.createElement('div');
headerChoose.className = "headarChoose";
const headerChooseElements = document.createElement('div');
const headerChooseElementsAllBox = document.createElement('div');
const headerChooseElementsAll = document.createElement('button');
headerChooseElementsAll.textContent = "All";
headerChooseElementsAllBox.append(headerChooseElementsAll);

const headerChooseElementsCountryBox = document.createElement('div');
const headerChooseElementsCountry = document.createElement('button');
headerChooseElementsCountry.textContent = "by Country";
const headerChooseElementsCountryListBox = document.createElement('div');
const headerChooseElementsCountryList = document.createElement('ul');

let countryRepeat = [];
arrayOfMusic.forEach((countries) => {
    if (!countryRepeat.includes(countries.country) && countries.eurovision) {
        const orderCountry = document.createElement('li');
        orderCountry.textContent = countries.country;
        headerChooseElementsCountryList.append(orderCountry);
        countryRepeat.push(countries.country);
    }
});

headerChooseElementsCountryListBox.append(headerChooseElementsCountryList);
headerChooseElementsCountryBox.append(headerChooseElementsCountry, headerChooseElementsCountryListBox);

const headerChooseElementsYearsBox = document.createElement('div');
const headerChooseElementsYears = document.createElement('button');
headerChooseElementsYears.textContent = "by Year";
const headerChooseElementsYearsListBox = document.createElement('div');
const headerChooseElementsYearsList = document.createElement('ul');
let yearsRepeat = [];
arrayOfMusic.forEach((years) => {
    if (!yearsRepeat.includes(years.year) && years.eurovision) {
        const orderYears = document.createElement('li');
        orderYears.textContent = years.year;
        headerChooseElementsYearsList.append(orderYears);
        yearsRepeat.push(years.year);
    }
});

headerChooseElementsYearsListBox.append(headerChooseElementsYearsList);
headerChooseElementsYearsBox.append(headerChooseElementsYears, headerChooseElementsYearsListBox);

const headerChooseElementsWinnerBox = document.createElement('div');
const headerChooseElementsWinner = document.createElement('button');
headerChooseElementsWinner.textContent = "by Winner";
headerChooseElementsWinnerBox.append(headerChooseElementsWinner);

headerChooseElements.append(headerChooseElementsAll, headerChooseElementsCountryBox, headerChooseElementsYearsBox, headerChooseElementsWinnerBox);

const headerChooseCreate = document.createElement('div');
const headerChooseCreateIcon = document.createElement('i');
headerChooseCreateIcon.className = "bx bx-plus-medical";
const headerChooseCreatePhrase = document.createElement('span');
headerChooseCreatePhrase.textContent = "create your playlist";
headerChooseCreate.append(headerChooseCreateIcon, headerChooseCreatePhrase);

headerChoose.append(headerChooseElements, headerChooseCreate);




// CREATE PLAYLIST

let arrayOfPlayList = [], childArrayOfPlayList = [], arrayOfnameOfPlayList = [];

headerChooseCreatePhrase.addEventListener('click', (e) => {
    //e.preventDefault();

    childArrayOfPlayList = []
    const playListBack = document.createElement('div');
    playListBack.className = 'play-list-back';
    const playList = document.createElement('div');
    playList.className = 'play-list'
    arrayOfMusic.forEach((f) => {
        const playListChild = document.createElement('div');
        const playListChildCover = document.createElement('img');
        playListChildCover.setAttribute('src', f.coverOfMusic);
        const playListChildName = document.createElement('span');
        playListChildName.textContent = f.music;

        playListChild.append(playListChildCover, playListChildName);
        playList.append(playListChild);

        playListChild.addEventListener('click', (n) => {
            //n.preventDefault();
            playListChild.classList.toggle('choosen');
            if (!childArrayOfPlayList.includes(f.music)) {
                childArrayOfPlayList.push(f.music)
            }
            else {
                childArrayOfPlayList.splice(childArrayOfPlayList.indexOf(f.music), 1);
            }
        });
    });

    const forAdd = document.createElement('div');
    forAdd.className = 'for-add';
    const addButton = document.createElement('button');
    addButton.textContent = 'Create';
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';

    forAdd.append(addButton, cancelButton);

    playList.append(forAdd);
    playListBack.append(playList);
    document.getElementsByClassName('for-play-list')[0].append(playListBack);

    addButton.addEventListener('click', (m) => {
        console.log(childArrayOfPlayList);

        if (childArrayOfPlayList.length === 0) {
            alert('add something please')
            return;
        }

        m.preventDefault();
        let nameOfPlayList = prompt('enter a name for playlist');
        nameOfPlayList = nameOfPlayList.toUpperCase();

        if (nameOfPlayList !== '') {
            document.getElementsByClassName('for-play-list')[0].innerHTML = '';
            boxOfDecidedElements.innerHTML = '';
            arrayOfnameOfPlayList.push(nameOfPlayList)
            localStorage.setItem('arrayOfnameOfPlayList', JSON.stringify(arrayOfnameOfPlayList));
            arrayOfPlayList.push(childArrayOfPlayList);
            localStorage.setItem('arrayOfPlayList', JSON.stringify(arrayOfPlayList));
            callName();
            callAll()
        }
        else {
            alert('enter name');
            boxOfDecidedElements.innerHTML = '';
        }
    })

    cancelButton.addEventListener('click', () => {
        document.getElementsByClassName('for-play-list')[0].innerHTML = '';
    })
})

let arrayForElement = [];
arrayOfMusic.forEach((e) => {
    let countOfSameName = 0
    for (let i of e.artist.split(', ')) {
        if (arrayForElement.includes(i)) {
            countOfSameName++;
        }
    }
    if (!arrayForElement.includes(e.artist) && countOfSameName === 0) {
        arrayForElement.push(e.artist);
    }
});

const boxOfDecided = document.createElement('div');
boxOfDecided.className = "boxOfDecided";
const boxOfDecidedHead = document.createElement('h1');
boxOfDecidedHead.innerHTML = 'All Artists' + '<span id = "showAllArtists">Show all</span>';
const boxOfDecidedElements = document.createElement('div');


const callName = () => {

    if (!JSON.parse(localStorage.getItem('arrayOfnameOfPlayList'))) return;

    arrayOfnameOfPlayList = JSON.parse(localStorage.getItem('arrayOfnameOfPlayList'));
    arrayOfPlayList = JSON.parse(localStorage.getItem('arrayOfPlayList'));

    JSON.parse(localStorage.getItem('arrayOfnameOfPlayList')).forEach((l, index) => {
        const element = document.createElement('div');
        const coverOfArtist = document.createElement('img');
        coverOfArtist.setAttribute('src', 'image/Your Playlist.png');
        const nameOfArtist = document.createElement('a');
        nameOfArtist.textContent = l;
        const jobOfMusican = document.createElement('span');
        jobOfMusican.textContent = 'playList';

        const forNameAndJob = document.createElement('div');

        const iconForDelete = document.createElement('i');
        iconForDelete.className = 'bx bx-x'
        forNameAndJob.append(nameOfArtist, jobOfMusican);
        element.append(coverOfArtist, forNameAndJob, iconForDelete);
        boxOfDecidedElements.append(element);

        iconForDelete.addEventListener('click', () => {
            const quastion = confirm("Are you sure?");

            if (quastion) {
                arrayOfnameOfPlayList.splice(index, 1);
                arrayOfPlayList.splice(index, 1);
                localStorage.setItem('arrayOfnameOfPlayList', JSON.stringify(arrayOfnameOfPlayList));
                localStorage.setItem('arrayOfPlayList', JSON.stringify(arrayOfPlayList));
                boxOfDecidedElements.innerHTML = '';
                callName();
                callAll();
            }
        })
    })
}

callName();




const callAll = () => {
    let randomIndexOfElement = Math.floor(Math.random() * arrayForElement.length),
        listOfRandomIndexOfElement = [randomIndexOfElement];

    for (let i = 0; i < arrayForElement.length; i++) {
        let artistCover;
        arrayOfMusic.forEach((e) => {
            if (arrayForElement[randomIndexOfElement] === e.artist) {
                artistCover = e.coverOfArtist;
            }
        })
        const element = document.createElement('div');
        const coverOfArtist = document.createElement('img');
        coverOfArtist.setAttribute('src', artistCover);
        const nameOfArtist = document.createElement('a');
        nameOfArtist.textContent = arrayForElement[randomIndexOfElement];
        const jobOfMusican = document.createElement('span');
        jobOfMusican.textContent = 'Artist';

        const forNameAndJob = document.createElement('div');
        forNameAndJob.append(nameOfArtist, jobOfMusican)
        element.append(coverOfArtist, forNameAndJob);
        boxOfDecidedElements.append(element);

        while (listOfRandomIndexOfElement.includes(randomIndexOfElement)) {
            randomIndexOfElement = Math.floor(Math.random() * arrayForElement.length);
            if (listOfRandomIndexOfElement.length == arrayForElement.length) {
                break;
            }
        }
        listOfRandomIndexOfElement.push(randomIndexOfElement);
    }
}

callAll();

boxOfDecided.append(boxOfDecidedHead, boxOfDecidedElements);

header.append(headerChoose, boxOfDecided);


const musicForLeft = document.getElementsByClassName('music')[0];
const musicForLeftBefore = document.createElement('p');
musicForLeftBefore.style = "height: 100vh; color: white; font-size: 300%; font-weight: 900; display: flex; justify-content: center; padding-top: 100px; width: 100%; text-align: center;";
musicForLeftBefore.textContent = "Your playList";
musicForLeft.append(musicForLeftBefore);

let randomForAllMusic1 = 1;

const leftFunc = (arr, playPausa, photoOfMusic, nameOfMusic, nameOfArtist, linkOfAudio, arrayOfAudio2, audioLength, photoOfArtist, year, country, gender, listOfRandomForAllMusic1) => {


    musicForLeft.innerHTML = "";
    musicForLeft.style.height = "auto";



    // let c = 0
    // let autoPlayT = setInterval(autoPlay, audioLength * 1000);
    // function autoPlay() {
    //     c++
    //     console.log(c);
    //     randomForAllMusic1++;
    //     if (randomForAllMusic1 === listOfRandomForAllMusic1.length - 1) {
    //         randomForAllMusic1 = 0;
    //     }
    //     audioLength = arrayOfAudio2[randomForAllMusic1];
    //     leftFunc(arr, 'bx bx-pause', arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].coverOfMusic, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].music, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].artist, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].linkOfMusic, arrayOfAudio2, audioLength,
    //         arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].coverOfArtist, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].year, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].country, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].gender, listOfRandomForAllMusic1);
    // }




    const musicForLeftImageBox = document.createElement('div');
    musicForLeftImageBox.className = 'music-box-for-image'
    const musicForLeftImage = document.createElement('img');
    musicForLeftImage.setAttribute('src', photoOfMusic);

    const musicReact = document.createElement('div');
    musicReact.className = 'music-react'

    const musicReactEvent = document.createElement('div');
    musicReactEvent.className = 'music-react-event';
    const musicReactToLeft = document.createElement('i');
    musicReactToLeft.className = 'bx bxs-left-arrow';
    const musicReactToRight = document.createElement('i');
    musicReactToRight.className = 'bx bxs-right-arrow';
    const musicReactPlayPausa = document.createElement('i');
    musicReactPlayPausa.className = playPausa;

    musicReactEvent.append(musicReactToLeft, musicReactPlayPausa, musicReactToRight)


    const musicReactTimeWayBack = document.createElement('span');
    musicReactTimeWayBack.className = 'way-back';
    const musicReactTimeWayFront = document.createElement('span');
    musicReactTimeWayBack.append(musicReactTimeWayFront);

    const musicReactWay = document.createElement('div');
    musicReactWay.className = 'music-react-way';

    const musicReactTimeStart = document.createElement('span');
    musicReactTimeStart.textContent = '0:00';

    const musicReactTimeEnd = document.createElement('span');


    let secondTime;
    audioLength = Math.floor(audioLength);
    if (audioLength % 60 < 10) {
        secondTime = "0" + (audioLength % 60);
    }
    else {
        secondTime = audioLength % 60;
    }
    musicReactTimeEnd.textContent = `${Math.floor(audioLength / 60)}:${secondTime}`;



    let startInterval, wayFront1 = 0, wayFront2 = 0, wayFront = 0;

    musicReactPlayPausa.addEventListener('click', () => {
        if (musicReactPlayPausa.className === 'bx bx-pause') {
            musicReactPlayPausa.className = 'bx bx-play';
            audioTag.pause();
            clearInterval(startInterval);
        }
        else {
            musicReactPlayPausa.className = 'bx bx-pause';
            audioTag.play();
            moveMe();
        }
    });


    const moveMe = () => {
        startInterval = setInterval(timeForSecondEnd, 1000);
        function timeForSecondEnd() {
            wayFront++;
            wayFront1++;
            musicReactTimeWayFront.style.width = Math.floor((wayFront / audioLength) * 100) + '%';
            if (wayFront <= audioLength) {
                if (wayFront1 < 60) {
                    if (wayFront1 < 10) {
                        musicReactTimeStart.textContent = `${wayFront2}:0${wayFront1}`;
                    }
                    else {
                        musicReactTimeStart.textContent = `${wayFront2}:${wayFront1}`;
                    }
                }
                else {
                    wayFront1 = 0
                    wayFront2++;
                }
            }
            else {
                musicReactTimeStart.textContent = '0:00';
                musicReactTimeWayFront.style.width = 0 + '%';

                wayFront = 0;
                wayFront1 = 0;
                wayFront2 = 0;
                musicReactPlayPausa.className = 'bx bx-play';
                clearInterval(startInterval);

                randomForAllMusic1++;
                if (randomForAllMusic1 === listOfRandomForAllMusic1.length - 1) {
                    randomForAllMusic1 = 0;
                }
                audioLength = arrayOfAudio2[randomForAllMusic1];
                leftFunc(arr, 'bx bx-pause', arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].coverOfMusic, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].music, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].artist, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].linkOfMusic, arrayOfAudio2, audioLength,
                    arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].coverOfArtist, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].year, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].country, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].gender, listOfRandomForAllMusic1);

            }
        }
    }

    let audioTag = document.getElementsByClassName('audio')[0];
    audioTag.setAttribute('src', linkOfAudio);

    audioTag.setAttribute('autoplay', "");
    moveMe();

    musicReactWay.append(musicReactTimeStart, musicReactTimeWayBack, musicReactTimeEnd);

    musicReact.append(musicReactEvent, musicReactWay);

    musicForLeftImageBox.append(musicForLeftImage, musicReact);

    const musicForLeftNameMusic = document.createElement('a');
    musicForLeftNameMusic.setAttribute('href', '#');
    musicForLeftNameMusic.textContent = nameOfMusic;
    musicForLeftNameMusic.className = 'name-of-music';

    const musicForLeftNameArtists = document.createElement('div');
    const musicForLeftNameArtist = document.createElement('a');
    musicForLeftNameArtist.setAttribute('href', '#');
    musicForLeftNameArtist.textContent = nameOfArtist;

    musicForLeftNameArtists.append(musicForLeftNameArtist);
    musicForLeftNameArtists.className = 'name-of-artists';
    arrayOfMusic.forEach((l) => {
        if (nameOfMusic === l.music && nameOfArtist !== l.artist) {
            const musicForLeftNameArtistOder = document.createElement('a');
            musicForLeftNameArtistOder.setAttribute('href', '#');
            musicForLeftNameArtistOder.textContent = l.artist;
            musicForLeftNameArtists.append(' & ', musicForLeftNameArtistOder);
        }
    })

    musicForLeft.append(musicForLeftImageBox, musicForLeftNameMusic, musicForLeftNameArtists);



    const callDuet = (nameOfArtistFromFunc, photoOfArtistFromFunc, arr) => {

        const line = document.createElement('hr');
        const musicForLeftCoverBox = document.createElement('div');
        musicForLeftCoverBox.className = 'music-box-for-image second-image';
        const musicForLeftCover = document.createElement('img');
        musicForLeftCover.className = "music-for-left-cover";
        musicForLeftCover.setAttribute('src', photoOfArtistFromFunc);
        musicForLeftCoverBox.append(musicForLeftCover);

        const musicForLeftNameArtistForProfile = document.createElement('a');
        musicForLeftNameArtistForProfile.setAttribute('href', '#');
        musicForLeftNameArtistForProfile.textContent = nameOfArtistFromFunc;


        let listForYear = [], stringOfYear = "";
        for (let tap in arr) {
            if (arr[tap].artist === nameOfArtistFromFunc && arr[tap].eurovision) {
                listForYear.push(arr[tap].year);
            }
        }
        for (let tap in listForYear) {
            if (tap > 0) {
                stringOfYear += " and "
            }
            stringOfYear += `${listForYear[tap]}`;
        }

        const paragrafForArtist = document.createElement('p');
        let theirGender;
        if (gender === 'woman') theirGender = 'She';
        else if (gender === 'man') theirGender = 'He';
        else if (gender === 'group') theirGender = 'They'
        paragrafForArtist.textContent = `${theirGender} represented ${country} at the Eurovision Song Contest in ${stringOfYear}`;
        musicForLeft.append(line, musicForLeftCoverBox, musicForLeftNameArtistForProfile, paragrafForArtist);

        musicForLeftCoverBox.style.width = musicForLeft.offsetWidth + 'px';
        musicForLeftCoverBox.style.height = musicForLeftCoverBox.offsetWidth + 'px';
        musicForLeftImageBox.style.height = musicForLeftImageBox.offsetWidth + 'px !important';
    }

    callDuet(nameOfArtist, photoOfArtist, arr);
    arrayOfMusic.forEach((l) => {
        if (nameOfMusic === l.music && nameOfArtist !== l.artist) {
            callDuet(l.artist, l.coverOfArtist, arrayOfMusic);
        }
    })


    musicReact.addEventListener('click', (e) => {

        if (e.target.className === "bx bxs-left-arrow") {
            randomForAllMusic1--;
            if (randomForAllMusic1 === -1) {
                randomForAllMusic1 = listOfRandomForAllMusic1.length - 2;
            }

            audioLength = arrayOfAudio2[randomForAllMusic1];

            leftFunc(arr, 'bx bx-pause', arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].coverOfMusic, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].music, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].artist, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].linkOfMusic, arrayOfAudio2, audioLength,
                arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].coverOfArtist, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].year, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].country, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].gender, listOfRandomForAllMusic1);
        }

        if (e.target.className === "bx bxs-right-arrow") {
            randomForAllMusic1++;
            if (randomForAllMusic1 === listOfRandomForAllMusic1.length - 1) {
                randomForAllMusic1 = 0;
            }

            audioLength = arrayOfAudio2[randomForAllMusic1];

            leftFunc(arr, 'bx bx-pause', arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].coverOfMusic, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].music, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].artist, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].linkOfMusic, arrayOfAudio2, audioLength,
                arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].coverOfArtist, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].year, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].country, arr[Number(listOfRandomForAllMusic1[randomForAllMusic1])].gender, listOfRandomForAllMusic1);
        }
    });
}


let showCount = 0;
showAllArtists.addEventListener('click', () => {
    if (showCount % 2 !== 0) {
        showAllArtists.textContent = 'Show all';
        header.style.height = '232px';
        if (window.innerWidth < 700) {
            header.style.height = '180px';
        }
    }
    else {
        showAllArtists.textContent = 'Show Less';
        header.style.height = 'auto';
    }
    showCount++;
})



if (window.innerWidth < 1000) {
    headerChooseCreatePhrase.textContent = 'Create';
}

const leftFixed = document.getElementsByClassName('left-fixed')[0];
const removeMobile = document.createElement('i');
removeMobile.className = 'bx bxs-chevron-down';

