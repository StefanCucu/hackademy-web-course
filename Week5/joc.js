let isJumping = false
let score = 0
let id_spike = 0

function incrementScore()
{
    score += 1;
    document.getElementById("score").textContent = "Score: " + score;
}

function removeSpike(id_spike)
{
    let spike = document.getElementById('spike'+id_spike)
    spike.remove()
}

function checkCollisionWithId(id_spike)
{
    let player = document.getElementById("player");
    let spike = document.getElementById('spike'+id_spike);
    
    if(spike == null) return;

    let rect1 = player.getBoundingClientRect();
    let rect2 = spike.getBoundingClientRect();

    if(rect1.right * rect1.right + rect1.bottom * rect1.bottom >= rect2.right * rect2.right + rect2.bottom * rect2.bottom){
        score = 0;
        document.getElementById("score").textContent = "Score: " + score;
        removeSpike(id_spike);
    }
}

function checkCollisions()
{
    for(var id = 0; id < 5; id+=1)
    {
        checkCollisionWithId(id)
    }
}

function generateObstacle()
{
    let rng = Math.random();
    if(rng <= 0.6){
        //Generate 1 obstacle
        let background = document.getElementById("backg");
        id_spike = (id_spike + 1) % 5;
        background.insertAdjacentHTML('beforeend', '<img src="spike.png" class="spike" id="spike' + id_spike +'"/>'); 
        let loc_spike = id_spike;
        setTimeout(function(){
            removeSpike(loc_spike)
        }, 2000);
    }
    else{
        //Generate 2 obstacles
        let background = document.getElementById("backg");
        id_spike = (id_spike + 1) % 5;
        background.insertAdjacentHTML('beforeend', '<img src="spike.png" class="spike" id="spike' + id_spike +'"/>');
        let loc_spike_1 = id_spike;
        id_spike = (id_spike + 1) % 5;
        background.insertAdjacentHTML('beforeend', '<img src="spike.png" class="spike" id="spike' + id_spike +'"/>');
        let loc_spike_2 = id_spike;
        setTimeout(function(){
            removeSpike(loc_spike_1)
            removeSpike(loc_spike_2)
        }, 2000);
    }
}



document.addEventListener("keyup", function(e){
    if(e.code === "Space" && isJumping === false){
        isJumping = true
        
        let player = document.getElementById("player")
        player.style.animation = "jump 1s"
        setTimeout(function(){
            isJumping = false
            document.getElementById("player").style.animation = ""
        }, 900)
    }
})

setInterval(incrementScore, 1000);
setInterval(generateObstacle, 2000);
console.log("Player: " + document.getElementById("player").getBoundingClientRect().right)
setInterval(checkCollisions, 300);
