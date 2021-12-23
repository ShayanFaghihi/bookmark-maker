// Adding New Bookmark Scenario
const createBtn = document.getElementById("createNew");
const overlay = document.getElementById("overlay");
const form = document.querySelector(".overlay-box form");
const formSubmitBtn = document.getElementById("addNewBookmark");
const bookmarkWrapper = document.querySelector(".bookmark-wrapper");


// Overflow Condition
let overlayShown = false;

// Bookmark Array
let bookmarks = [];

// Remove variable
let removeIcons = document.querySelectorAll("#remove");
removeIcons.forEach((icon,idx) => {
    icon.addEventListener("click", () => {
        console.log(idx,icon)
    })
});



// Open Overlay
const openOverlay = () => {
    overlayShown = true;
    overlay.style.display = "flex";
}


// Close Overlay
const closeOverlay = () => {
    overlay.style.display = "none";
    overlayShown = false;
}

// Remove Bookmark
const removeBookmark = (e) => {
    // e.srcElement.parentElement.remove();
}




// Set Attribute Function
const createAttribute = (el,obj) => {
    for(let key in obj) {
        el.setAttribute(key,obj[key]);
    }
}

// Get Form Data in the modal box
const getFormData = e => {
    e.preventDefault();
    const siteName = e.srcElement[0].value;
    const siteUrl = e.srcElement[1].value;
    const siteFavIcon = `https://s2.googleusercontent.com/s2/favicons?domain_url=${siteUrl}`;
    bookmarks.push({siteName,siteUrl,siteFavIcon});

    insertBookmark();
    storeOnLocalStorage();
}

const insertBookmark = () => {
    // Close Overlay
    closeOverlay()

    // Cleaning HTML inorder to refill it again
    bookmarkWrapper.innerHTML = '';

    // Looping into bookmarks array
    bookmarks.forEach((bookmark,idx) => {

        // Creating bookmark container
        const element = document.createElement("div");
        createAttribute(element, {
            "class" : "bookmark__item"
        })
        //  Creating <a> tag
        const item = document.createElement("a");
        createAttribute(item,{
            "href": bookmark.siteUrl,
            "target":"blank"
        });
    
        // Creating <span> tag
        const span = document.createElement("span");
        createAttribute(span, {
            "class" : "bookmark__fav",
            "id" : "bookmarkFavIcon"
        })
    
        // Creating <img> tag
        const img = document.createElement("img");
        createAttribute(img, {
            "src" : bookmark.siteFavIcon
        })
    
        // Creating close span
        const closeSpan = document.createElement("span");
        createAttribute(closeSpan,{
            "class" : "bookmark__remove",
            "id" : "remove"
        })
    
        // Appending tags inser each other
        span.appendChild(img);
        element.appendChild(span);
        element.appendChild(closeSpan);
        item.append(bookmark.siteName);
        element.appendChild(item);
        bookmarkWrapper.appendChild(element);
    
    
        // Adding Remove attribute
        removeIcons = document.querySelectorAll("#remove");
       
    })

}

// Storing on Local Storage
const storeOnLocalStorage = () => {
   localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Reading From Local Storage
if(localStorage.getItem("bookmarks")) {
   bookmarks = (JSON.parse(localStorage.getItem("bookmarks")));
   insertBookmark()
}


// Event Listeners
createBtn.addEventListener("click",openOverlay)
form.addEventListener("submit", getFormData);
