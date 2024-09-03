var correct = 0;
var ind = 0;
var string;

async function getText() {
    const url = "https://official-joke-api.appspot.com/random_joke";
    const response = await fetch(url);
    const result = await response.json();
    string = result.setup + " " + result.punchline;

    var displayText = "";
    var index = 0;
    for(let i of string) {
        displayText += `<span class='span${index}'>${i}</span>`;
        index++;
    }
    document.querySelector(".text").innerHTML = displayText;
}
getText();

document.addEventListener("keypress", (event) => {
    if (ind < string.length - 1) {
        handleClick(event);
    } else if(ind == string.length-1) {
        handleClick(event);
        result();
    }
});

function handleClick(event) {
    if (event.key == string.charAt(ind)) {
        document.querySelector(`.span${ind}`).classList.add("success");
        correct++;
    } else {
        document.querySelector(`.span${ind}`).classList.add("fail");
    }
    
    if(event.key == " ") {
        event.preventDefault();
        const key = document.querySelector(".space");
        key.classList.add("blink");
        setTimeout(() => key.classList.remove("blink"), 100);

    } else if((event.key >= "a" && event.key <= "z") || (event.key >= "A" && event.key <= "Z")) {
        const key = document.querySelector(`.${event.key}`);
        key.classList.add("blink");
        setTimeout(() => key.classList.remove("blink"), 100);
    }

    ind++;
}

function result() {
    var accuracy = Math.round((correct/string.length) * 100);
    const resultText = "Your Accuracy is " + accuracy + "%";
    document.querySelector(".text").textContent = resultText;
    document.querySelector(".text").style.textAlign = "center";
}