const text = mp.events.callProc("reciveRentMenueText").then(text => {
    const textBox = document.getElementById('textBox')
    textBox.innerText = text
})


function clickRentButton(event){
    const isAccepted = event.target.id === 'button-accept' ? true : false
    mp.events.call("playerClickedRentButton",isAccepted)
}