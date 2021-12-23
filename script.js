// Adding New Bookmark Scenario
const createBtn = document.getElementById("createNew");
const overlay = document.getElementById("overlay");

// Modal Box
const form = document.querySelector(".overlay-box form");
const formSubmitBtn = document.getElementById("addNewBookmark");
const closeOverlayIcon = document.querySelector(".close-overlay #close");
const NewBookmarkTitle = document.getElementById("new-name");

// HTML
const bookmarkWrapper = document.querySelector(".bookmark-wrapper");


// Overflow Condition
let overlayShown = false;

// Bookmark Array
let bookmarks = [];

// Remove variable
let removeIcons = document.querySelectorAll("#remove");

// Open Overlay
const openOverlay = () => {
    overlayShown = true;
    overlay.classList.add('show-modal');
    NewBookmarkTitle.focus();
}


// Close Overlay
const closeOverlay = () => {
    overlay.classList.remove("show-modal")
    overlayShown = false;
}

// Remove Bookmark
const removeBookmark = (url) => {
   const removed = bookmarks.filter(value => {
       value.siteUrl == url;
   });

   bookmarks = removed;
   insertBookmark();
   storeOnLocalStorage();
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
    bookmarks.push({siteName,siteUrl});

    // Validate Form
    if(validate(siteName,siteUrl)) {
        insertBookmark();
        storeOnLocalStorage();
    }
}
const validate = (siteName,siteUrl) => {
    // Checking Name and Url Fields
    if(!siteName || !siteUrl) {
        alert("Please insert both name and url");
        return false;
    }

    // Checking url format using regular expression (Regex)
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!siteUrl.match(regex)) {
        alert("You have to insert a validate url");
        return false;
    }

    return true;
}


const insertBookmark = () => {
    // Close Overlay
    closeOverlay()

    // Cleaning HTML inorder to refill it again
    bookmarkWrapper.innerHTML = '';

    // Looping into bookmarks array
    bookmarks.forEach(bookmark => {

        const { siteName , siteUrl } = bookmark;

        // Creating bookmark container
        const element = document.createElement("div");
        createAttribute(element, {
            "class" : "bookmark__item"
        })
        //  Creating <a> tag
        const item = document.createElement("a");
        createAttribute(item,{
            "href": siteUrl,
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
            "src" : `https://s2.googleusercontent.com/s2/favicons?domain_url=${siteUrl}`
        })
    
        // Creating close span
        const closeSpan = document.createElement("span");
        createAttribute(closeSpan,{
            "class" : "bookmark__remove",
            "id" : "remove",
            "onClick" : `removeBookmark('${siteUrl}')`
        })
    
        // Appending tags inser each other
        span.appendChild(img);
        element.appendChild(span);
        element.appendChild(closeSpan);
        item.append(siteName);
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
closeOverlayIcon.addEventListener("click",closeOverlay);
window.addEventListener("click", (e) => e.target === overlay ? overlay.classList.remove("show-modal") : null)