function getId(id) {return document.getElementById(id)}

const grid = getId("wrapGrid")
const startButton = getId("startButton")
const gridScale = getId("gridScale")

const boxSize = 20
const rowCount = 80
const columnCount = 80

let drawable = false

grid.style.setProperty("--boxSize", 100 + "px")
grid.style.setProperty("--rowCount", rowCount)
grid.style.setProperty("--columnCount", columnCount)

function handleClick(e) {
    if (!drawable) return
    e.target.classList.add("alive")
}

for (let i = 0; i < rowCount*columnCount; i++) {
    const element = document.createElement("div")
    element.addEventListener("mouseover", (e) => handleClick(e))
    grid.append(element)
}

//grid.addEventListener("mousedown", () => {
//    drawable = true
//    if (window.event.which == 3) remove = true
//})
//grid.addEventListener("mouseup", () => {
//    drawable = false
//})
gridScale.addEventListener("input", (e) => {
    grid.style.setProperty("--boxSize", e.target.value + "px")
})
startButton.addEventListener("click", () => {executePattern()})

function executePattern() {
    const fields = grid.childNodes
    const results = []
    for (let i = 0; i < rowCount*columnCount; i++) {
        const alive = fields[i].classList.contains("alive")
        const neighbours = [
            fields[i-1],
            fields[i+1],
            fields[i-columnCount],
            fields[i-columnCount-1],
            fields[i-columnCount+1],
            fields[i+columnCount],
            fields[i+columnCount-1],
            fields[i+columnCount+1]
        ]
        let aliveCount = 0
        neighbours.forEach(neighbour => {
            if (neighbour && neighbour.classList.contains("alive")) aliveCount++
        })
        let turn = false
        if (!alive && aliveCount === 3) turn = true
        if (alive && (aliveCount < 2 || aliveCount > 3)) turn = true
        results.push(turn)
    }
    for (let i = 0; i < rowCount*columnCount; i++) {
        if (results[i]) fields[i].classList.toggle("alive")
    }
}