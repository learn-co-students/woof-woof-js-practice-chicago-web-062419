const dogBar = document.getElementById("dog-bar")
const dogShowContainer = document.getElementById("dog-summary-container")
const dogInfo = document.getElementById("dog-info")
const dogURL = "http://localhost:3000/pups"
let dogFilter = document.getElementById("good-dog-filter")


function fetchDoggos(){
    fetch(dogURL)
        .then(res => res.json())
        .then(pups => renderPups(pups))
}

function renderPups(pups){
    pups.forEach(pup => {
        
        if(pup.isGoodDog && dogFilter.value == "true"){
            console.log("hi")
            createPup(pup)
        } else if(dogFilter.value === "false"){
            createPup(pup)
        }
    })
}

function createPup(pup){
    let span = document.createElement("span")
    span.innerHTML = pup.name
    span.setAttribute("good-dog",pup.isGoodDog)
    span.addEventListener("click", ()=>{showPup(pup)})
    dogBar.appendChild(span)
}

function showPup(pup){
    dogInfo.innerHTML = ""
    let img = document.createElement("img")
    img.src = pup.image

    let name = document.createElement("h2")
    name.innerHTML = pup.name

    let dogAlignmentButton = document.createElement("button")
    dogAlignmentButton.addEventListener("click",()=>{ 
        dogBar.innerHTML = ""
        changeAlignment(pup)
        fetchDoggos()
    })
    buttonValue(pup, dogAlignmentButton)
    dogInfo.append(img, name, dogAlignmentButton)
}

function changeAlignment(pup){
    fetch(dogURL + '/' + pup.id, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body:JSON.stringify({
            isGoodDog: !pup.isGoodDog
        })
    })
    .then(res => res.json())
    .then(pup => showPup(pup))
}

function buttonValue(pup, dogAlignmentButton){
    pup.isGoodDog? dogAlignmentButton.innerHTML = 'Bad Dog!' : dogAlignmentButton.innerHTML = "Good Dog!"
}

function filterDogs(){
    let dogFilterValue = dogFilter.innerHTML.split(" ")[3]
    if(dogFilterValue === "OFF"){
        dogFilter.innerHTML = "Filter good dogs: ON"
        dogFilter.value = true
    } else{
        dogFilter.innerHTML = "Filter good dogs: OFF"
        dogFilter.value = false
    }
}


dogFilter.addEventListener("click", (event) => {
    event.preventDefault
    dogBar.innerHTML = ""
    fetchDoggos()
    filterDogs()
})

fetchDoggos()