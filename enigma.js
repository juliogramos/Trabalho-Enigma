const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // Corrigido a ordem do alfabeto

const rotors = [
    "EKMFLGDQVZNTOWYHXUSPAIBRCJ".split(""), // Rotor I
    "AJDKSIRUXBLHWTMCQGZNPYFVOE".split(""), // Rotor II
    "BDFHJLCPRTXVZNYEIWGAKMUSQO".split("") // Rotor III
];

let plugboardPairs = [];
let reflectorPairs = [];
let activeRotors = [];

/**
 * Define os pares para o plugboard.
 * @param {Array} pairs - Array de pares, cada um no formato ["A", "B"].
 */
function setPlugboardPairs(pairs) {
    if (!Array.isArray(pairs)) {
        throw new Error("Entrada precisa ser um array de tuplas.");
    }

    plugboardPairs = pairs.map(pair => {
        if (pair.length !== 2 || !alphabet.includes(pair[0]) || !alphabet.includes(pair[1])) {
            throw new Error(`Par da plugboard inválido: ${pair.join(",")}`);
        }
        return pair;
    });
}

/**
 * Define os pares para o reflector.
 * @param {Array} pairs - Array de pares, cada um no formato ["A", "B"].
 */
function setReflectorPairs(pairs) {
    if (!Array.isArray(pairs)) {
        throw new Error("Entrada precisa ser um array de tuplas.");
    }

    reflectorPairs = pairs.map(pair => {
        if (pair.length !== 2 || !alphabet.includes(pair[0]) || !alphabet.includes(pair[1])) {
            throw new Error(`Par do reflector inválido: ${pair.join(",")}`);
        }
        return pair;
    });
}

/**
 * Define a ordem dos rotores ativos.
 * @param {Array} order - Índices dos rotores (baseados na lista de rotores).
 */
function setActiveRotors(order) {
    if (!Array.isArray(order)) {
        throw new Error("Ordem dos rotores deve ser um array.");
    }

    activeRotors = order.map(index => {
        if (index < 0 || index >= rotors.length) {
            throw new Error(`Indice de rotor inválido: ${index}`);
        }
        return rotors[index];
    });

    console.log("Rotores ativos configurados:", activeRotors.map(r => r.join("")));
}

// Testando as funções
try {
    setPlugboardPairs([
        ["A", "M"],
        ["F", "L"],
        ["G", "D"],
        ["B", "X"]
    ]);

    setReflectorPairs([
        ["B", "R"],
        ["C", "U"],
        ["D", "H"],
        ["E", "Q"],
        ["F", "S"],
        ["G", "L"],
        ["I", "P"],
        ["J", "X"],
        ["K", "N"],
        ["M", "O"],
        ["T", "Z"],
        ["V", "W"]
    ]);

    setActiveRotors([0, 1, 2]); 
} catch (error) {
    console.error(error.message);
}

// HTML do navegador

//CRIAÇÃO DINÂMICA
//Plugboard e lampboard
const lampboard = document.getElementById("lampboard");
const plugboard = document.getElementById("plugboard");
for (let letter of alphabet) {
    new_lamp = document.createElement("div");
    new_lamp.id = "lamp_" + letter;
    new_lamp.innerHTML = letter;
    lampboard.appendChild(new_lamp);

    new_plug = document.createElement("div");
    new_plug.id = "plug_" + letter;
    new_plug.innerHTML = letter;
    plugboard.appendChild(new_plug);
}

//Seletores do plugboard
const pair_select_1 = document.getElementById("pair_1");
const pair_select_2 = document.getElementById("pair_2");
for (let letter of alphabet) {
    new_option_1 = document.createElement("option");
    new_option_1.setAttribute("value", letter);
    new_option_1.innerHTML = letter;
    pair_select_1.appendChild(new_option_1);
    
    new_option_2= document.createElement("option");
    new_option_2.setAttribute("value", letter);
    new_option_2.innerHTML = letter;
    pair_select_2.appendChild(new_option_2);
}

//PLUGBOARD
// Define cores
colors = [
    {"color":"#e6194B", "in_use": false},
    {"color":"#f58231", "in_use": false},
    {"color":"#ffe119", "in_use": false},
    {"color":"#bfef45", "in_use": false},
    {"color":"#3cb44b", "in_use": false},
    {"color":"#42d4f4", "in_use": false},
    {"color":"#4363d8", "in_use": false},
    {"color":"#4363d8", "in_use": false},
    {"color":"#911eb4", "in_use": false},
    {"color":"#f032e6", "in_use": false},
    {"color":"#800000", "in_use": false},
    {"color":"#9A6324", "in_use": false},
    {"color":"#808000", "in_use": false}
];

//Inicializa pares
let pairs = {};
for (let letter of alphabet) {
    pairs[letter] = "";
}

//Seletor de pares
function connectPair() {
    const pair_select_1 = document.getElementById("pair_1");
    const pair_select_2 = document.getElementById("pair_2");
    const value_1 = pair_select_1.value;
    const value_2 = pair_select_2.value;
    if (pairs[value_1] == "" && pairs[value_2] == "") {
        if (value_1 == value_2) {
            alert("Não é possível selecionar a mesma letra!");
            return;
        }
        pairs[value_1] = value_2;
        pairs[value_2] = value_1;
        for (let color of colors) {
            if (color["in_use"] == false) {
                console.log("entrou")
                const plug_1 = document.getElementById("plug_" + value_1);
                const plug_2 = document.getElementById("plug_" + value_2);
                plug_1.style.borderColor = color["color"];
                plug_2.style.borderColor = color["color"];
                color["in_use"] = true;
                console.log(pairs);
                console.log(colors);
                return;
            }
        }
    } else {
        alert("Par já selecionado! Limpe os pares para redefinir este par.")
    }
}

// Limpa os pares
function resetPairs() {
    for (let letter of alphabet) {
        pairs[letter] = "";
        let plug = document.getElementById("plug_" + letter);
        plug.style.borderColor = "#000000";
    }

    for (let color of colors) {
        color["in_use"] = false;
    }

    console.log(pairs);
    console.log(colors);
}

// LAMPBOARD
// Digitar
let lastInputLength = 0;
const input = document.getElementById("msg_input");
input.addEventListener("input", function(e) {
    lastInputLength = input.value.length;
    let lastChar = input.value.slice(-1);
    let newLetter;
    if (alphabet.includes(lastChar.toUpperCase())) {
        newLetter = encryptLetter(lastChar.toUpperCase());
    }
    updateLampboard(newLetter);
});

// Acender lampboard
function updateLampboard(char) {
    for (let letter of alphabet) {
        if (letter == char) {
            let lampOn = document.getElementById("lamp_" + char);
            lampOn.style.backgroundColor = "#ffffe0";
            lampOn.style.color = "#000000";
        } else {
            let lampOff = document.getElementById("lamp_" + letter);
            lampOff.style.backgroundColor = "#000000";
            lampOff.style.color = "#ffffff";
        }
    }
}

//Fazer
function encryptButton() {
    // Resetar as rotações dos rotores aqui pois o input vai modificar elas
    //  quando digitar uma letra
    alert("Clicou");

    const input = document.getElementById("msg_input").value.toUpperCase();
    const output = [];

    for (const char of input) {
	    if (alphabet.includes(char)) {
		    const encryptedChar = encryptLetter(char);
		    output.push(encryptedChar);
	    } else {
		    output.push(char); //A gente precisa ver aqui como vamos fazer com a questão de espaços e outros char que nao estao no alfabeto como pontuação
	    }
    }

    const encryptedMessage = output.join("");
 document.getElementById("cifrada").textContent = encryptedMessage;
    const outputElement = document.getElementById("output");
    if (outputElement) {
	    outputElement.textContent = encryptedMessage;
    } else {
	    console.log("Mensagem cifrada: ", encryptedMessage);
    }
}

// Vai trabalhar só com letras maiúsculas
// Assume que as letras passadas pra ela são maiúsculas (e letras)
function encryptLetter(char) {
	// Implementar certo
    return char;
}
