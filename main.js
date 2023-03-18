let span = document.querySelector(".control-buttons span");

span.onclick = function () {
    let yourName = prompt("whats your name");
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "unkwon";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
}

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
shafule(orderRange)
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener("click", function () {
        filipBlock(block);
    })
})

function filipBlock(selectedBlock) {
    selectedBlock.classList.add("is-flipped");
    let allflip = blocks.filter(flip => flip.classList.contains("is-flipped"));
    if (allflip.length === 2) {
        stopClicking();

        checkBlock(allflip[0], allflip[1]);
    }
}

function stopClicking() {
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");

    }, duration)
}

function checkBlock(first, second) {
    let triesElement = document.querySelector(".tries span");
    if (first.dataset.technology === second.dataset.technology) {
        first.classList.remove("is-flipped")
        second.classList.remove("is-flipped");

        first.classList.add("has-match");
        second.classList.add("has-match");

        document.getElementById("success").play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            first.classList.remove("is-flipped");
            second.classList.remove("is-flipped");
        }, duration)

        document.getElementById("fail").play();

    }
}

function shafule(array) {
    
let current = array.length,
    temp,
    random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random]= temp;
    }
    return array
}