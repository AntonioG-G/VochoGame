const submitNick = ()=>{
    const userName = document.getElementById("text");
    const name = userName.value;
    if (name != '') {
        console.log(userName.value)
        let user = document.getElementById("user");
        user.textContent = name;
    
        fadeOut();
    }else{
        const nickError = document.getElementById("nickError");
        nickError.style.visibility = 'visible';
        nickError.style.animation = 'fadeOut 3s';
        nickError.addEventListener("animationend", () =>{
            nickError.style.visibility = 'hidden';
        })
    }
}

const fadeOut = ()=> {
    const intro = document.getElementById("intro");
    intro.style.animation = 'fadeOut 1.2s';
    intro.addEventListener("animationend", () =>{
        intro.remove();
    })
}


const playerAnimation = () =>{
    const player = document.getElementById("vocho");
    player.style.animation = 'spriteAnimation 0.25s steps(1) infinite';
    console.log(player.style.animation);
}
