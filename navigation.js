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
})
grid.addEventListener("mouseup", () => {
    active = false
})
grid.addEventListener("mouseleave", () => {
    active = false
})
grid.addEventListener("mousemove", (e) => {
    if (!active) return
    e.preventDefault()
    grid.scrollLeft = scrollLeft - ((e.pageX - startX) * scrollSpeed)
    grid.scrollTop = scrollTop - ((e.pageY - startY) * scrollSpeed)
})