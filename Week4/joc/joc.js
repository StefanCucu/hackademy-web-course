let isJumping = false
let score = 0
document.addEventListener("keyup", function(e){
    if(e.code === "Space" && isJumping === false){
        isJumping = true
        score += 10
        document.getElementById("score").textContent = "Score: " + score
        let player = document.getElementById("player")
        player.style.animation = "jump .6s cubic-bezier(0.280, 0.840, 0.420, 1)"
        setTimeout(function(){
            isJumping = false
            document.getElementById("player").style.animation = ""
        }, 500)
    }
})

