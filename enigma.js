const allEqual = arr => arr.every(val => val === arr[0]);

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

    return "Plugboard configurado: " + plugboardPairs.map(r => r.join(" -> "))
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

    return "Refletor configurado: " + reflectorPairs.map(r => r.join(" -> "))
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

    return "Rotores ativos configurados: " + activeRotors.map(r => r.join(""));
}

function plugboard_transformation(caracter) {
	for (const par of plugboardPairs) {
		if (par[0] == caracter) {
			return par[1];
		}
		if (par[1] == caracter) {
			return par[0];
		}
	}
	return caracter;
}

function frontal_rotation(caracter) {
	let currentChar = caracter;

	for (let i = 0; i < rotors.length; i++) {
		let  index = alphabet.indexOf(currentChar);

		if (index !== -1) {
			currentChar = rotors[i][index];
		}
	}
	
	return currentChar;
}
function back_rotation(caracter) {
	let currentChar = caracter;

	for (let i = rotors.length - 1; i >= 0; i--) {
		let  index = rotors[i].indexOf(currentChar);

		if (index !== -1) {
			currentChar = alphabet[index];
		}
	}
	
	return currentChar;

}
function refletor_transformation(caracter) {}
function rotor_increment(caracter) {}

function cipher_message(message) {
	let cyphertext = "";
	
	for (const caracter of message) {
		let trans_char = plugboard_transformation(caracter);
		console.log("After plugboard: " + trans_char);
		
		trans_char = frontal_rotation(trans_char);
		console.log("After frontal rotation: " + trans_char);
		
		trans_char = refletor_transformation(trans_char);
		console.log("After reflector: " + trans_char);

		trans_char = back_rotation(trans_char);
		console.log("After back rotation: " + trans_char);

		cyphertext += plugboard_transformation(caracter);
		rotor_increment(trans_char);
	}
	
	return cyphertext;
}

// HTML do navegador

//CRIAÇÃO DINÂMICA
//Plugboard, refletor e lampboard
const lampboard = document.getElementById("lampboard");
const plugboard = document.getElementById("plugboard");
const relector = document.getElementById("reflector");
for (let letter of alphabet) {
    new_lamp = document.createElement("div");
    new_lamp.id = "lamp_" + letter;
    new_lamp.innerHTML = letter;
    lampboard.appendChild(new_lamp);

    new_plug = document.createElement("div");
    new_plug.id = "plug_" + letter;
    new_plug.innerHTML = letter;
    plugboard.appendChild(new_plug);

    new_reflector = document.createElement("div");
    new_reflector.id = "reflect_" + letter;
    new_reflector.innerHTML = letter;
    reflector.appendChild(new_reflector);
}

// Seletores do plugboard
const plug_pair_select_1 = document.getElementById("plug_pair_1");
const plug_pair_select_2 = document.getElementById("plug_pair_2");
for (let letter of alphabet) {
    new_option_1 = document.createElement("option");
    new_option_1.setAttribute("value", letter);
    new_option_1.innerHTML = letter;
    plug_pair_select_1.appendChild(new_option_1);
    
    new_option_2= document.createElement("option");
    new_option_2.setAttribute("value", letter);
    new_option_2.innerHTML = letter;
    plug_pair_select_2.appendChild(new_option_2);
}

// Seletores do refletor
const reflect_pair_select_1 = document.getElementById("reflect_pair_1");
const reflect_pair_select_2 = document.getElementById("reflect_pair_2");
for (let letter of alphabet) {
    new_option_1 = document.createElement("option");
    new_option_1.setAttribute("value", letter);
    new_option_1.innerHTML = letter;
    reflect_pair_select_1.appendChild(new_option_1);
    
    new_option_2= document.createElement("option");
    new_option_2.setAttribute("value", letter);
    new_option_2.innerHTML = letter;
    reflect_pair_select_2.appendChild(new_option_2);
}

// Rotores
const rotor_select = document.getElementById("rotor_select");
for (let rotor in rotors) {
    let rotor_option = document.createElement("div");
    rotor_option.classList.add("rotor_option");

    let rotor_div = document.createElement("div");
    rotor_div.id = "rotor_option_" + rotor;
    rotor_div.classList.add("rotor_display");
    for (let letter of rotors[rotor]) {
        let letter_div = document.createElement("div");
        letter_div.innerHTML = letter;
        rotor_div.appendChild(letter_div);
    }
    rotor_option.appendChild(rotor_div);

    let rotor_checkbox = document.createElement("input");
    rotor_checkbox.setAttribute("type", "checkbox");
    rotor_checkbox.setAttribute("value", rotor);
    rotor_checkbox.id = "rotor_checkbox_" + rotor;
    rotor_option.appendChild(rotor_checkbox);

    rotor_select.append(rotor_option);
}

//PLUGBOARD
// Define cores
plug_colors = [
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
let plug_pairs = {};
for (let letter of alphabet) {
    plug_pairs[letter] = "";
}

//Seletor de pares
function plugConnectPair() {
    const pair_select_1 = document.getElementById("plug_pair_1");
    const pair_select_2 = document.getElementById("plug_pair_2");
    const value_1 = pair_select_1.value;
    const value_2 = pair_select_2.value;
    if (plug_pairs[value_1] == "" && plug_pairs[value_2] == "") {
        if (value_1 == value_2) {
            alert("Não é possível selecionar a mesma letra!");
            return;
        }
        plug_pairs[value_1] = value_2;
        plug_pairs[value_2] = value_1;
        for (let color of plug_colors) {
            if (color["in_use"] == false) {
                const plug_1 = document.getElementById("plug_" + value_1);
                const plug_2 = document.getElementById("plug_" + value_2);
                plug_1.style.borderColor = color["color"];
                plug_2.style.borderColor = color["color"];
                color["in_use"] = true;
                return;
            }
        }
    } else {
        alert("Par já selecionado! Limpe os pares para redefinir este par.")
    }
}

// Limpa os pares
function plugResetPairs() {
    for (let letter of alphabet) {
        plug_pairs[letter] = "";
        let plug = document.getElementById("plug_" + letter);
        plug.style.borderColor = "#000000";
    }

    for (let color of plug_colors) {
        color["in_use"] = false;
    }
}

//Refletor
// Define cores
reflect_colors = [
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
let reflect_pairs = {};
for (let letter of alphabet) {
    reflect_pairs[letter] = "";
}

//Seletor de pares
function reflectConnectPair() {
    const pair_select_1 = document.getElementById("reflect_pair_1");
    const pair_select_2 = document.getElementById("reflect_pair_2");
    const value_1 = pair_select_1.value;
    const value_2 = pair_select_2.value;
    if (reflect_pairs[value_1] == "" && reflect_pairs[value_2] == "") {
        if (value_1 == value_2) {
            alert("Não é possível selecionar a mesma letra!");
            return;
        }
        reflect_pairs[value_1] = value_2;
        reflect_pairs[value_2] = value_1;
        for (let color of reflect_colors) {
            if (color["in_use"] == false) {
                const reflect_1 = document.getElementById("reflect_" + value_1);
                const reflect_2 = document.getElementById("reflect_" + value_2);
                reflect_1.style.borderColor = color["color"];
                reflect_2.style.borderColor = color["color"];
                color["in_use"] = true;
                return;
            }
        }
    } else {
        alert("Par já selecionado! Limpe os pares para redefinir este par.")
    }
}

// Limpa os pares
function reflectResetPairs() {
    for (let letter of alphabet) {
        reflect_pairs[letter] = "";
        let reflect = document.getElementById("reflect_" + letter);
        reflect.style.borderColor = "#000000";
    }

    for (let color of reflect_colors) {
        color["in_use"] = false;
    }
}

// SALVAR CONFIGURAÇÕES
function saveConfigs() {
    // Salva rotores
    const trueRotors = [
        document.getElementById("rotor_checkbox_0").checked,
        document.getElementById("rotor_checkbox_1").checked,
        document.getElementById("rotor_checkbox_2").checked
    ]

    console.log(trueRotors);
    
    if (allEqual(trueRotors) && trueRotors[0] == false) {
        alert("Selecione pelo menos um rotor!");
        return;
    }

    let selectedRotors = [];

    for (let i = 0; i < trueRotors.length; i++) {
        if (trueRotors[i] == true) {
            selectedRotors.push(i);
        }
    }

    //Salva plugboard e refletores
    let plugTuples = [];
    let reflectTuples = [];

    for (let letter of alphabet) {
        if (plug_pairs[letter] != "") {
            plugTuples.push([letter, plug_pairs[letter]]);
        }

         if (reflect_pairs[letter] != "") {
            reflectTuples.push([letter, reflect_pairs[letter]]);
        }
    }

    let rotormsg;
    let plugmsg;
    let reflectmsg;

    try {
        rotormsg = setActiveRotors(selectedRotors);
        plugmsg = setPlugboardPairs(plugTuples);
        reflectmsg = setReflectorPairs(reflectTuples);
    } catch(error) {
        alert(error.message);
        return;
    }

    const whichRotors = document.getElementById("whichRotors");
    const whichPlugs = document.getElementById("whichPlugs");
    const whichReflects = document.getElementById("whichReflects");

    whichRotors.innerHTML = rotormsg;
    whichPlugs.innerHTML = plugmsg;
    whichReflects.innerHTML = reflectmsg;

    const canType = document.getElementById("canType");
    canType.style.display = "flex";
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
   // const output = [];

    let output = cipher_message(input);
    document.getElementById("cifrada").textContent = output;
    const outputElement = document.getElementById("output");
    if (outputElement) {
	    outputElement.textContent = output;
    } else {
	    console.log("Mensagem cifrada: ", output);
    }
}

// Vai trabalhar só com letras maiúsculas
// Assume que as letras passadas pra ela são maiúsculas (e letras)
function encryptLetter(char) {
	// Implementar certo
    return char;
}
