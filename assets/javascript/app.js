// Data Set with initial animals
let animalsSet = new Set(["dragon", "rabbit", "cat", "rat", "duck"]);
// JSOn parameters
let queryURL = {
//api website
  url: "https://api.giphy.com/v1/gifs/search?",
//key to get into api  
  apiKey: "GvtvtZwH7qHmYmA0qVRIs8mOOul36if",
//imits amount of api pulls to 5
  limit: 5,
};

/* mkbtn()  */

// function to make a new button                                

function mkbtn(textContent) {
  // create new button element
  let _btn = document.createElement("button");
  // take whatever text content is and change what is inside button
  _btn.innerHTML = textContent;
  // return the created button
  return _btn;
}

/*  mkImgCard()  */

// function to create a new img element                                    

function mkImgCard(animalImgObj, alt) {
    // create new div col
  let _col = document.createElement('div');
  // create card div
  let _card = document.createElement('div');
  // Add the clases to cardDiv
  _card.setAttribute('class', 'card p-1 gif-card');
  // Create Card Title <H4>
  let _cardTitle = document.createElement('h4');
  // Add classes for crad title
  _cardTitle.setAttribute('class', 'card-title bg-primary text-light');
  // Add innerHTML for card Title (Rating)
  _cardTitle.innerHTML = animalImgObj.rating;
  // Get the imgages Object
  animalImgObj = animalImgObj.images;
  // Create <img>
  let _img = document.createElement('img');
  // Add the Attributes to img elemet
  _img.setAttribute('src', animalImgObj.fixed_height_still.url);
  _img.setAttribute('data-still', animalImgObj.fixed_height_still.url);
  _img.setAttribute('data-animate', animalImgObj.fixed_height.url);
  _img.setAttribute('data-state', 'still');
  _img.setAttribute('class', 'px-1 m-1');
  _img.setAttribute('alt', alt);
  // append after 
  _card.appendChild(_cardTitle); 
  _card.appendChild(_img);
  // Append _card to _col
  _col.appendChild(_card);
//spit out col
  return _col;
}

/* reloadButtons()  */

// This function will read each element from animalsSet and create a button
// for each animal
function reloadButtons() {
  // clean out current buttons
  document.querySelector("#btnContainer").innerHTML = "";
  // Set and add new Buttons
  for (let animal of animalsSet) {
//      run mkbutton fo each animal
    let _btn = mkbtn(animal);
//append btncontiner   
    document.querySelector("#btnContainer").appendChild(_btn);
  }
}

/* loadImgs()  */

function loadImgs(imgObject) {
  // Get the parent element
  let _parent = document.querySelector("#imgsContainer");
  // loop the obj and create a img for each key
  for (let _key of Object.keys(imgObject)) {
    // Create a new card with the current obj
    let _newCard = mkImgCard(imgObject[_key], queryURL.q);
    // add current card to parrent
    _parent.append(_newCard);
  }
}

/*  getImagesObject()  */

function getImagesObject() {
  // API URL
  let _url = `${queryURL.url}q=${queryURL.q}&api_key=${queryURL.apiKey}d&limit=${queryURL.limit}&rating=pg13`;
  // Check if fetch is available
  if (window.fetch) {
    // send request
    fetch(_url)
      // Parse the resonse
      .then((_response) => _response.json())
      // Get the Data object from API
      .then((_jsonObj) => _jsonObj.data)
      .then(loadImgs);
  }
 
}

/*  Buttons Event listener */

// this will add images cards to view
function onButtonClick(event) {
  // Clear any <img> 
  document.querySelector("#imgsContainer").innerHTML = "";
  // get the animal's name of clicked button
  let _currentAnimal = event.target.innerHTML;
  // remove whitespaces from search string using regex and add it to queryURL
  queryURL.q = _currentAnimal.trim().split(/\s/).join('+');
  // add images to view
  getImagesObject();
}

/* Image Event listener  */

// this will toggle the animation on image
function onImageClick(event) {
  // check if user clicked on image
  if (event.target.tagName === 'IMG') {
    // get clicked image
    let _currentImg = event.target;
    // check state of image/gif
    // if current state is still 
    if (_currentImg.dataset.state === 'still') {
      // set it to animate 
      _currentImg.src = _currentImg.dataset.animate;
      // and set gif url
      _currentImg.dataset.state = 'animate';
    }
    // else (if current state is animate)
    else {
      // set it to still
      _currentImg.src = _currentImg.dataset.still;
      // and set img url
      _currentImg.dataset.state = 'still';
    }
  }
}

/* Animal Buttons Event listener  */

// this will add the text input to button
function onAddAnimalClick(event) {
  // prevent page to reflesh
  event.preventDefault();
  // get input element
  let _inputElement = document.querySelector('#getAnimalName');
  // Check if user input any data
  if (_inputElement.value) {
    // add animal name to animalsSet
    animalsSet.add(_inputElement.value);
    // reload buttons
    reloadButtons();
  } else {
    // display error if input not available
    alert("Missing Input");
  }
  // clear text inout
  _inputElement.value = "";
}

reloadButtons();
document.querySelector("#btnContainer").addEventListener('click', onButtonClick);
document.querySelector('#imgsContainer').addEventListener('click', onImageClick);
document.querySelector("#btnAddAnimal").addEventListener('click', onAddAnimalClick);