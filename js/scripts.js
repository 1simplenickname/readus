let home = document.getElementById("home");
let stats = document.getElementById("stats");
let books = document.getElementById("books");
let other = document.getElementById("other");

let searchBar = document.getElementById("searchBar");
let usernameField = document.getElementById("username");
let joined = document.getElementById("joined");

let requestURL, userData, userAvatar = "";

function toggleVisibility(target, state) {

    document.getElementById(target).style.visibility = state;

}

function loadUserData() {

    let apiKey = "5o8Y6MXVRoJMNowRu3eO8w";

    let user = searchBar.value;
    usernameField.innerHTML = user;

    let joined = document.getElementById("joined");
    joined.innerHTML = "Loading " + user + "'s stats";

    home.classList.add("fadeOut");
    toggleVisibility("home","hidden");
    stats.classList.add("fadeIn");
    toggleVisibility("stats","visible");

    requestURL = "https://cors-anywhere.herokuapp.com/" + "https://www.goodreads.com/user/show/" + user + ".xml?key=" + apiKey;
    console.log(requestURL);

    let request = new XMLHttpRequest();
    if("withCredentials" in request) {

        request.open('GET', requestURL, true);
        request.setRequestHeader('Content-Type', 'application/xml');
        request.onreadystatechange = function () {

            if (this.readyState === 4) {

                    let parser = new DOMParser();
                    userData = parser.parseFromString(this.responseText, "text/xml");
                    showUserStats();

            }

        };

        request.send();

    }

    return userData;

}

function showUserStats() {

    let avatar = document.getElementById("avatar");
    let avatarPlaceholder = document.getElementById("avatarPlaceholder");

    userAvatar = userData.getElementsByTagName("image_url")[0].innerHTML.substr(9).slice(0, -3);
    avatar.style.backgroundImage = "url(" + userAvatar + ")";

    avatarPlaceholder.classList.add("fadeOut");
    avatar.classList.add("fadeIn");

    toggleVisibility("avatar", "visible");
    toggleVisibility("avatarPlaceholder", "hidden");

    usernameField.innerHTML = userData.getElementsByTagName("name")[0].innerHTML;

    let joined = document.getElementById("joined");
    joined.innerHTML = "Goodreads user since " + userData.getElementsByTagName("joined")[0].innerHTML;

    joined.classList.add("fadeIn");

    toggleVisibility("books", "visible");
    toggleVisibility("other", "visible");
    books.classList.add("fadeIn");
    other.classList.add("fadeIn");

    let booksRead = document.getElementById("booksRead");
    let goodreadsFriends = document.getElementById("goodreadsFriends");
    let booksCurrentlyReading = document.getElementById("booksCurrentlyReading");
    let goodreadsReviews = document.getElementById("goodreadsReviews");

    booksRead.innerHTML = userData.getElementsByTagName("book_count")[0].innerHTML + " books";
    booksCurrentlyReading.innerHTML = userData.getElementsByTagName("book_count")[1].innerHTML + " books";;

    goodreadsFriends.innerHTML = userData.getElementsByTagName("friends_count")[0].innerHTML + " friends";;;
    goodreadsReviews.innerHTML = userData.getElementsByTagName("reviews_count")[0].innerHTML + " reviews";;;

}

function openUserAvatar() {

    window.open(userAvatar);

}

function openUserOnTrakt() {

    let user = searchBar.value;
    window.open("https://www.goodreads.com/user/show/" + user);

}
