const btns = document.querySelectorAll("button");
btns.forEach(btn =>{
    btn.addEventListener("click",() =>{
        document.body.style.backgroundColor = btn.textContent;
    })
})