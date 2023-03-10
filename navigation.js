let active = false
let startX
let startY
let scrollLeft
let scrollTop
const scrollSpeed = 0.8

grid.addEventListener("mousedown", (e) => {
    active = true
    startX = e.pageX
    startY = e.pageY
    scrollLeft = grid.scrollLeft
    scrollTop = grid.scrollTop
    grid.classList.add("active")
})
function navEnd() {
    active = false
    grid.classList.remove("active")
}
grid.addEventListener("mouseup", () => navEnd())
grid.addEventListener("mouseleave", () => navEnd())
grid.addEventListener("mousemove", (e) => {
    if (!active || drawmode) return
    e.preventDefault()
    grid.scrollLeft = scrollLeft - ((e.pageX - startX) * scrollSpeed)
    grid.scrollTop = scrollTop - ((e.pageY - startY) * scrollSpeed)
})
grid.addEventListener("wheel", (e) => {
    if (e.wheelDelta > 0) boxSize+=2       
    if (e.wheelDelta < 0) boxSize-=2
    grid.style.setProperty("--boxSize", boxSize + "px")
})