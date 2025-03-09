let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  let currentScroll = window.scrollY || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    navbar.style.top = "-100px";
  } else {
    navbar.style.top = "0";
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

/*

TASKS

*/

function goToTask(taskNumber) {
  window.location.href = `week_0${taskNumber}/index.html`;
}

const tasks = [
  {
    id: 2,
    title: "Hello HTML",
    week: "Week 2",
    cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/180px-HTML5_logo_and_wordmark.svg.png",
  },
  {
    id: 3,
    title: "My First Webpage",
    week: "Week 3",
    cover: "/week_03/deviousCat.png",
  },
  {
    id: 4,
    title: "CSS Basics",
    week: "Week 4",
    cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Official_CSS_Logo.svg/180px-Official_CSS_Logo.svg.png",
  },
];

function createTaskHTML(task) {
  return `
      <div class="task-box" onclick="goToTask(${task.id})">
          <div class="task-inner" id="task${task.id}">
              <div class="task-box-front">
                  <img src="${task.cover}" class="task-cover">
                  <strong class="task-title">${task.title}</strong>
                  <strong class="week">${task.week}</strong>
              </div>
          </div>
      </div>
  `;
}

const taskContainer = document.getElementById("task-list");
if (taskContainer) {
  taskContainer.innerHTML = tasks.map(createTaskHTML).join("");
}

/*

ALBUMS

*/

function flipAlbum(albumNumber) {
  var album = document.getElementById("album" + albumNumber);

  if (album.style.transform === "rotateY(180deg)") {
    album.style.transform = "rotateY(0deg)";
  } else {
    album.style.transform = "rotateY(180deg)";
  }
}

const albums = [
  {
    id: 1,
    title: "Take Me Back To Eden",
    artist: "Sleep Token",
    cover: "https://upload.wikimedia.org/wikipedia/en/4/48/SleepTokenTMBTE.jpg",
    rating: [true, true, true, true, true],
    favoriteSong: "Take Me Back To Eden",
    songRating: [true, true, true, true, true],
  },
  {
    id: 2,
    title: "Sundowning",
    artist: "Sleep Token",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/f/fc/SleepTokenSundowning.jpg",
    rating: [true, true, true, true, true],
    favoriteSong: "Blood Sport",
    songRating: [true, true, true, true, true],
  },
  {
    id: 3,
    title: "This Place Will Become Your Tomb",
    artist: "Sleep Token",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/9f/SleepTokenTPWBYT.jpg",
    rating: [true, true, true, true, true],
    favoriteSong: "Telomeres",
    songRating: [true, true, true, true, true],
  },
  {
    id: 4,
    title: "The Death Of Peace Of Mind",
    artist: "Bad Omens",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/a/af/TheDeathOfPeaceOfMind.jpg",
    rating: [true, true, true, true, false],
    favoriteSong: "bad decisions",
    songRating: [true, true, true, true, false],
  },
  {
    id: 5,
    title: "Pain Remains",
    artist: "Lorna Shore",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/d0/LornaShorePainRemains.jpg",
    rating: [true, true, true, true, true],
    favoriteSong: "Pain Remains I: Dancing Like flames",
    songRating: [true, true, true, true, true],
  },
  {
    id: 6,
    title: "Immortal",
    artist: "Lorna Shore",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/0/06/Lorna_Shore_-_Immortal.png",
    rating: [true, true, true, true, false],
    favoriteSong: "Darkest Spawn",
    songRating: [true, true, true, true, true],
  },
  {
    id: 7,
    title: "POST HUMAN: NeX GEn",
    artist: "Bring Me The Horizon",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/7/74/Post_Human_NeX_GEn.png",
    rating: [true, true, true, true, true],
    favoriteSong: "DiE4u",
    songRating: [true, true, true, true, true],
  },
  {
    id: 8,
    title: "EXCESSIVE GUILT",
    artist: "thrown",
    cover:
      "https://images.genius.com/039342449e384f5be61679bee99e724b.1000x1000x1.png",
    rating: [true, true, true, true, false],
    favoriteSong: "backfire",
    songRating: [true, true, true, true, true],
  },
  {
    id: 9,
    title: "Lotus",
    artist: "Within Destruction",
    cover:
      "https://f4.bcbits.com/img/a4135374089_10.jpg",
    rating: [true, true, true, false, false],
    favoriteSong: "Survival",
    songRating: [true, true, true, true, true],
  },
];

function createAlbumHTML(album) {
  const ratingStars = album.rating
    .map(
      (full) => `<img src="images/${full ? "kokoPerho" : "tyhjaPerho"}.png">`
    )
    .join("");
  const songRatingStars = album.songRating
    .map(
      (full) => `<img src="images/${full ? "kokoPerho" : "tyhjaPerho"}.png">`
    )
    .join("");

  return `
      <div class="album-box" onclick="flipAlbum(${album.id})">
          <div class="album-inner" id="album${album.id}">
              <div class="album-box-front">
                  <img src="${album.cover}" class="album-cover">
                  <strong class="album-title">${album.title}</strong>
                  <strong class="artist">${album.artist}</strong>
              </div>
              <div class="album-box-back">
                  <img src="${album.cover}" class="album-cover-back">
                  <strong>ALBUM RATING:</strong>
                  <div class="rating-box">${ratingStars}</div>
                  <strong><br><br>FAVORITE SONG:</strong>
                  <strong><br>${album.favoriteSong}</strong>
                  <div class="rating-box">${songRatingStars}</div>
              </div>
          </div>
      </div>
  `;
}

const albumContainer = document.getElementById("album-list");
if (albumContainer) {
  albumContainer.innerHTML = albums.map(createAlbumHTML).join("");

  const sortByTitleButton = document.getElementById("sort-by-title");
  if (sortByTitleButton) {
    sortByTitleButton.addEventListener("click", () => {
      const albumBoxes = Array.from(albumContainer.getElementsByClassName("album-box"));
      albumBoxes.sort((a, b) => {
        const titleA = a.querySelector(".album-title").textContent.trim().toUpperCase();
        const titleB = b.querySelector(".album-title").textContent.trim().toUpperCase();
        return titleA.localeCompare(titleB);
      });
      albumContainer.innerHTML = "";
      albumBoxes.forEach((box) => albumContainer.appendChild(box));
    });
  }

  const sortByArtistButton = document.getElementById("sort-by-artist");
  if (sortByArtistButton) {
    sortByArtistButton.addEventListener("click", () => {
      const albumBoxes = Array.from(albumContainer.getElementsByClassName("album-box"));
      albumBoxes.sort((a, b) => {
        const artistA = a.querySelector(".artist").textContent.trim().toUpperCase();
        const artistB = b.querySelector(".artist").textContent.trim().toUpperCase();
        return artistA.localeCompare(artistB);
      });
      albumContainer.innerHTML = "";
      albumBoxes.forEach((box) => albumContainer.appendChild(box));
    });
  }

  const albumBoxes = document.querySelectorAll(".album-box");

  albumBoxes.forEach((box) => {
    box.addEventListener("mouseover", () => {
      albumBoxes.forEach((otherBox) => {
        if (otherBox !== box) {
          otherBox.querySelector(".album-box-front").style.filter = "blur(3px)";
          otherBox.style.width = "300px";
          otherBox.style.height = "300px";
        }
        else {
          otherBox.style.width = "325px";
          otherBox.style.height = "325px";
        }
      });
    });
    
    box.addEventListener("mouseout", () => {
      albumBoxes.forEach((otherBox) => {
        otherBox.querySelector(".album-box-front").style.filter = "blur(0px)";
        otherBox.style.width = "300px";
        otherBox.style.height = "300px";
      });
    });
  });
}
