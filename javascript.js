$(document).ready(function () {
    const musicPlayer = document.getElementById('musicPlayer');
    musicPlayer.volume = 0.5;
    // List of music tracks (relative paths to the music folder)
    const musicTracks = [
        'music/burnout.mp3',
        'music/dyefgam.mp3',
        'music/fbfriends.mp3',
        'music/aboutu.mp3',
        'music/the1.mp3',
        'music/bfgudbye.mp3',
        'music/birds.mp3',
        'music/take.mp3',
        // Add more tracks as needed
    ];

    // Function to play random music
    let playedTracks = [];

    // Function to play random music
    function playRandomMusic() {
        if (playedTracks.length === musicTracks.length) {
            // All tracks have been played, reset the playedTracks array
            playedTracks = [];
        }

        // Filter out the tracks that have already been played
        const remainingTracks = musicTracks.filter(track => !playedTracks.includes(track));

        // Select a random track from the remaining tracks
        const randomIndex = Math.floor(Math.random() * remainingTracks.length);
        const randomTrack = remainingTracks[randomIndex];

        // Add the selected track to the playedTracks array
        playedTracks.push(randomTrack);

        // Set the selected track as the source of the music player and play it
        musicPlayer.src = randomTrack;
        musicPlayer.play();
    }

    // Event listener for when music ends to play another random track
    musicPlayer.addEventListener('ended', playRandomMusic);

    // Event listener for when music ends to play another random track
    musicPlayer.addEventListener('ended', playRandomMusic);
    $("#loginBtn").click(function () {
        var password = $("#password").val();
        // Simulate login success (replace with actual authentication logic)
        if (password === "12281998") {
            // Hide login page
            $("#loginPage").removeClass("show").addClass("hidden");
            // Show index page content with a delay

            setTimeout(function () {
                $("#indexPage").removeClass("hidden").addClass("show");
                // Initialize flipbook or any other index page functionality
                var flipBook = new FlipBook(document.getElementById("flipbook"));
            }, 600);
            playRandomMusic();// Delay in milliseconds
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });
});
class FlipBook {
    constructor(bookElem) {
        this.elems = {
            book: bookElem,
            leaves: bookElem.querySelectorAll(".leaf"),
            buttons: {
                next: document.getElementById("nextPage"),
                prev: document.getElementById("prevPage")
            }
        };
        this.setupEvents();
        this.currentPagePosition = 0;
        this.turnPage(0);
    }
    setPagePosition(page, position, index) {
        var transform = "";

        transform = "translate3d(0,0," + ((position < 0 ? 1 : -1) * Math.abs(index)) + "px)"

        if (position < 0) {
            transform += "rotate3d(0,1,0,-180deg)";
            page.classList.add("turned")
        } else {
            page.classList.remove("turned")
        }
        if (page.style.transform != transform) {
            page.style.transform = transform;
        }
    }
    turnPage(delta) {
        this.currentPagePosition += delta;
        if (this.currentPagePosition < 0) {
            this.currentPagePosition = 0;
            return;
        }
        if (this.currentPagePosition > this.elems.leaves.length) {
            this.currentPagePosition = this.elems.leaves.length;
            return;
        }
        this.elems.leaves.forEach((page, index) => {
            var pageNumber = index;
            this.setPagePosition(page, pageNumber - this.currentPagePosition, index);
        });

        if (this.currentPagePosition == 0) {
            this.elems.buttons.prev.setAttribute("disabled", "disabled");
        } else
            if (this.currentPagePosition == this.elems.leaves.length) {
                this.elems.buttons.next.setAttribute("disabled", "disabled");
            } else {
                this.elems.buttons.next.removeAttribute("disabled");
                this.elems.buttons.prev.removeAttribute("disabled");
            }
    }
    setupEvents() {
        document.getElementById("nextPage").addEventListener("click", () => {
            this.turnPage(1);
        });
        document.getElementById("prevPage").addEventListener("click", () => {
            this.turnPage(-1);
        });

    }
}

var flipBook = new FlipBook(document.getElementById("flipbook"));