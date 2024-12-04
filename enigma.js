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

function updateLampboard(char) {
    for (let letter of alphabet) {
        if (letter == char) {
            let lampOn = document.getElementById(char);
            lampOn.style.backgroundColor = "#ffffe0";
            lampOn.style.color = "#000000";
        } else {
            let lampOff = document.getElementById(letter);
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
}

// Vai trabalhar só com letras maiúsculas
// Assume que as letras passadas pra ela são maiúsculas (e letras)
function encryptLetter(char) {
    // Implementar certo
    return char;
}