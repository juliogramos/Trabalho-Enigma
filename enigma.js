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
