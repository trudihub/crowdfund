const bookmarkIconStyle = document.getElementById("bookmarkIcon")
const bookmarkIcon = document.getElementById("bookmarkBtn")
const bookmarkInnerIcon = document.getElementById("innerIcon")
const progressBar = document.querySelector(".progress")
const pledgeOverlay = document.getElementById("choosePledgeOverlay")
const closePledge = document.getElementById("closePledge")
const backProjectBtn = document.getElementById("backProject")
const bookmarkText = document.getElementById("bookmarkText")
const pledgeContainer = document.querySelectorAll(".pledgeContainer")
const enterPledge = document.querySelectorAll(".enterPledge")
const inputs = document.querySelectorAll("input")
const selectBamboo = document.getElementById("bamboo")
const selectBlack = document.getElementById("black")
const bambooPledge = document.querySelector(".bambooStand")
const blackStand = document.querySelector(".blackStand")
const continueBtn = document.querySelectorAll(".continueBtn")
const totalAmount = document.getElementById("totalAmount")
const backersAmount = document.getElementById("backersAmount")
const daysLeft = document.getElementById("daysLeft")
const testBtn = document.querySelectorAll(".testClose")
const thankSupport = document.getElementById("thankSupport")
const hamburgerMenu = document.getElementById("hamburgerMenu")
const dropdownContainer = document.querySelector(".dropdownContainer")

hamburgerMenu.addEventListener("click", ()=>{
    dropdownContainer.classList.toggle("showEnterPledge")
})

let currentAmount = 89914
let totalBackers = 5007
let days = 56
let amountInput;

[...continueBtn].forEach(item => {
    item.addEventListener("click", ()=>{
        pledgeOverlay.classList.remove("showEnterPledge")
        thankSupport.style.display = "flex";
    })
})


const setData = () =>{
    totalAmount.innerHTML= "$" + currentAmount;
    backersAmount.innerHTML= totalBackers;
    daysLeft.innerHTML = days;
}
setData();




bookmarkIcon.addEventListener("click", ()=> {
    bookmarkIconStyle.classList.toggle("marked")
    bookmarkInnerIcon.classList.toggle("innerMarked")
    bookmarkText.classList.toggle("bookmarked")
})

closePledge.addEventListener("click", ()=>{
    pledgeOverlay.classList.remove("showEnterPledge")
})

backProjectBtn.addEventListener("click", () => {
    pledgeOverlay.classList.add("showEnterPledge")
});





const cleanUI = () => {
    [...enterPledge].forEach(elem => elem.classList.remove("showEnterPledge"));
    [...pledgeContainer].forEach(elem=> elem.classList.remove("focused"));

}

const getFocusedPledge = (clickTarget, pledgeTarget) =>{
    clickTarget.addEventListener("click", () =>{
        cleanUI();
        clickTarget !== pledgeTarget && pledgeOverlay.classList.add("showEnterPledge")
        pledgeTarget.classList.add("focused");
        [...pledgeTarget.childNodes].forEach(elem => {if(elem.className == "enterPledge"){
            elem.classList.add("showEnterPledge")
        }});
        [...inputs].forEach(elem => {if(elem.parentNode.parentNode.classList.contains("focused")){
            elem.checked = true
       }})

    })
}

[...continueBtn].forEach(item => {
    item.addEventListener("click", ()=>{
        
       item.previousElementSibling.childNodes.forEach(child =>{
            if(child.classList == "pledgeAmount"){
                if(child.value){
                    currentAmount+=parseInt(child.value)
                    totalBackers++
                    setData()
                    let quota = 100000/currentAmount
                    progressBar.style.width = `${100/quota}%`
                    
                }else{
                    alert("Invalid input")
                }
            } 

            
        })
        
    })
})


getFocusedPledge(selectBamboo, bambooPledge, ()=> {
    pledgeOverlay.classList.add("showEnterPledge")
});
getFocusedPledge(selectBlack, blackStand, ()=> {
    pledgeOverlay.classList.add("showEnterPledge")
});

[...pledgeContainer].forEach(item => {
    getFocusedPledge(item, item)
});