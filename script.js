function getId(id) {return document.getElementById(id)}

const grid = getId("wrapGrid")
const startButton = getId("startButton")
const nextButton = getId("nextButton")
const drawMode = getId("drawMode")
const clearButton = getId("clearButton")
const drawAdd = getId("drawAdd")

let boxSize = 100
const rowCount = 200
const columnCount = 200

let drawmode = false
let drawable = false
let start = false
let drawadd = true

let patternInterval

grid.style.setProperty("--boxSize", boxSize + "px")
grid.style.setProperty("--rowCount", rowCount)
grid.style.setProperty("--columnCount", columnCount)

function changeField(e) {
    if (drawadd) e.target.classList.add("alive")
    if (!drawadd) e.target.classList.remove("alive")
}
function handleClick(e) {
    if (!drawable) return
    changeField(e)
}

for (let i = 0; i < rowCount*columnCount; i++) {
    const element = document.createElement("div")
    element.addEventListener("mouseover", (e) => handleClick(e))
    grid.append(element)
}
grid.addEventListener("mousedown", (e) => {
    if (!drawmode) return
    drawable = true
    changeField(e)
})
grid.addEventListener("mouseup", () => drawable = false)
drawMode.addEventListener("click", () => {
    if (drawmode) {
        drawMode.innerHTML = "Navigation <i class='bi bi-arrows-move'></i>"
    }
    if (!drawmode) {
        drawMode.innerHTML = "Draw Mode <i class='bi bi-pencil-square'></i>"
    }
    grid.classList.toggle("drawMode")
    drawmode = !drawmode
})
drawAdd.addEventListener("click", () => {
    if (drawadd) drawAdd.innerHTML = "<i class='bi bi-x-lg'></i>"
    if (!drawadd) drawAdd.innerHTML = "<i class='bi bi-pencil'></i>"
    drawadd = !drawadd
    console.log(drawadd)
})
clearButton.addEventListener("click", () => {
    const fields = grid.childNodes
    fields.forEach(field => field.classList.remove("alive"))
})
nextButton.addEventListener("click", () => executePattern())
startButton.addEventListener("click", () => {
    if (start) {
        clearInterval(patternInterval)
        startButton.innerHTML = "Start<i class='bi bi-play-fill'></i>"
        start = false
        return
    }
    patternInterval = setInterval(() => {executePattern()}, 100)
    startButton.innerHTML = "Stop<i class='bi bi-stop-fill'></i>"
    start = true
})

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