var typeofwords = ["Animal", "Car Brand", "Sport"];
var words = [
    ["BEAR", "MONKEY", "TIGER", "RABBIT", "LION", "KANGAROO"],
    ["AUDI", "BMW", "CHRYSLER", "HONDA", "TOYOTA", "MERCEDES"],
    ["FOOTBALL", "GOLF", "BASEBALL", "HOCKEY", "SWIMMING", "TENNIS"]
];
var attemps_draw = ["draw_head", "draw_body", "draw_lleg", "draw_rleg", "draw_larm", "draw_rarm", "draw_leye", "draw_reye"];
var keyboard = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var gameword = "";
var attempt = 0;

window.onload= choose_word(), keyboard_gen();

function keyboard_gen() {
    var k_container = document.getElementById("keyboard");

    for (let i = 0; i < keyboard.length; i++) {
        k_container.innerHTML += '<div class="k_letter" onclick="check_letter(this)">'+ keyboard.charAt(i) +'</div>';
    }
}

function choose_word() {
    var choice = Math.floor(Math.random() * 3);
    var type_choice = typeofwords[choice];
    gameword = words[choice][Math.floor(Math.random() * words[choice].length)];

    document.getElementById("hint").innerHTML = type_choice;
    gen_spaces();
}

function gen_spaces(){
    var word_container = document.getElementById("word");

    for (let i = 0; i < gameword.length; i++) {
        word_container.innerHTML += '<div class="letter"></div>';
    }
}

function check_letter(letter){
    console.log(letter.innerHTML);
    var letter_container = document.getElementsByClassName("letter");
    var blank_letter = gameword.length;
    var letter_found = false;

    for(let i = 0; i < gameword.length; i++){
        if(gameword[i] === letter.innerHTML){
            letter_container[i].innerHTML = letter.innerHTML;
            letter_found = true;
        }
    }

    letter.classList.add('k_letter_clicked');
    letter.classList.remove('k_letter');
    letter.removeAttribute("onclick");

    if(letter_found){
        if(blank_letter > 0){
            for (let elements of letter_container) {
                if(elements.innerHTML != ""){
                    blank_letter--;
                }
            }
        }
        if(blank_letter === 0){
            finish();
        }
    }else {
        fail_attempt();
    }
}

function finish(){
    document.getElementById("game").style.display = "none";
    document.getElementById("keyboard").style.display = "none";
    document.getElementById("final").style.display = "flex";

    document.getElementById("final").innerHTML += `
        <p id="message_win">YOU WIN!!</p>
        <p id="message_2">The word was</p>
        <p id="message_win_3">`+ gameword +`</p>`;

    document.getElementById("reset").innerHTML = "RESTART";
    document.getElementById("reset").style.display = "block";

}

function fail_attempt(){
    var draw_container = document.getElementById("draw_container");
    draw_container.innerHTML += '<div id="'+ attemps_draw[attempt] +'"></div>';
    attempt++;
    if(attempt === 8){
        document.getElementById("game").style.display = "none";
        document.getElementById("keyboard").style.display = "none";
        document.getElementById("final").style.display = "flex";

        document.getElementById("final").innerHTML += `
            <p id="message_lost">YOU LOST!!</p>
            <p id="message_2">The word was</p>
            <p id="message_lost_3">`+ gameword +`</p>`;
        
        document.getElementById("reset").innerHTML = "RESTART";
        document.getElementById("reset").style.display = "block";
    }
}

function reset(){
    document.getElementById("keyboard").innerHTML = "";
    document.getElementById("word").innerHTML = "";
    document.getElementById("game").style.display = "flex";
    document.getElementById("keyboard").style.display = "flex";
    document.getElementById("final").style.display = "none";
    document.getElementById("final").innerHTML = "";
    document.getElementById("reset").style.display = "none";
    attempt = 0;
    document.getElementById("draw_container").innerHTML = `
            <div id="draw_base"></div>
            <div id="draw_mid"></div>
            <div id="draw_midtop"></div>
            <div id="draw_top"></div>
            <div id="draw_down"></div>`
    choose_word();
    keyboard_gen();
}