function getId(id) {return document.getElementById(id)}

const wrapping = getId("wrapGrid")
const startButton = getId("startButton")

const boxSize = 100
const fieldCount = 8

wrapping.style.setProperty("--boxSize", 100 + "px")
wrapping.style.setProperty("--rowsCount", fieldCount)

function handleClick(e) {
    e.target.classList.toggle("alive")
}

for (let i = 0; i < fieldCount*fieldCount; i++) {
    const element = document.createElement("div")
    element.addEventListener("click", (e) => handleClick(e))
    wrapping.append(element)
}

startButton.addEventListener("click", () => executePattern())

function executePattern() {
    const fields = wrapping.childNodes
    const results = []
    for (let i = 0; i < fieldCount*fieldCount; i++) {
        const alive = fields[i].classList.contains("alive")
        const neighbours = [
            fields[i-1],
            fields[i+1],
            fields[i-fieldCount],
            fields[i-fieldCount-1],
            fields[i-fieldCount+1],
            fields[i+fieldCount],
            fields[i+fieldCount-1],
            fields[i+fieldCount+1]
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
    for (let i = 0; i < fieldCount*fieldCount; i++) {
        if (results[i]) fields[i].classList.toggle("alive")
    }
}