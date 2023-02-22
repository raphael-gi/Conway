function getId(id) {return document.getElementById(id)}

const grid = getId("wrapGrid")
const startButton = getId("startButton")
const drawMode = getId("drawMode")
const gridScale = getId("gridScale")

let boxSize = 100
const rowCount = 200
const columnCount = 200

let drawmode = false
let drawable = false

grid.style.setProperty("--boxSize", boxSize + "px")
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
grid.addEventListener("mousedown", (e) => {
    if (!drawmode) return
    drawable = true
    e.target.classList.add("alive")
})
grid.addEventListener("mouseup", () => drawable = false)
drawMode.addEventListener("click", () => drawmode = !drawmode)
gridScale.addEventListener("input", (e) => {
    grid.style.setProperty("--boxSize", e.target.value + "px")
})
startButton.addEventListener("click", () => {setInterval(() => {executePattern()}, 100)})

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