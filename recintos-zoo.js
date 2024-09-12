class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animais: [{ especie: 'macaco', quantidade: 3, tamanho: 1 }], carnivoro: false },
            { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animais: [], carnivoro: false },
            { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animais: [{ especie: 'gazela', quantidade: 1, tamanho: 2 }], carnivoro: false },
            { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animais: [], carnivoro: false },
            { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animais: [{ especie: 'leão', quantidade: 1, tamanho: 3 }], carnivoro: true }
        ];

        this.animaisInfo = {
            leao: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            leopardo: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            crocodilo: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            macaco: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            gazela: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            hipopotamo: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        // Validação do animal
        const infoAnimal = this.animaisInfo[animal.toLowerCase()];
        if (!infoAnimal) {
            return { erro: "Animal inválido", recintosViaveis: [] };
        }

        // Validação da quantidade
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida", recintosViaveis: [] };
        }

        const recintosViaveis = [];

        // Verificar recintos viáveis
        this.recintos.forEach(recinto => {
            let espacoOcupado = recinto.animais.reduce((total, a) => total + a.quantidade * a.tamanho, 0);
            const biomaValido = infoAnimal.biomas.some(b => recinto.bioma.includes(b));

            if (biomaValido && espacoOcupado + infoAnimal.tamanho * quantidade <= recinto.tamanhoTotal) {
                recintosViaveis.push({
                    numero: recinto.numero,
                    espacoLivre: recinto.tamanhoTotal - (espacoOcupado + infoAnimal.tamanho * quantidade),
                    espacoTotal: recinto.tamanhoTotal
                });
            }
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: [] };
        }

        return {
            erro: null,
            recintosViaveis: recintosViaveis.map(
                r => `Recinto nro ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`
            )
        };
    }
}

export { RecintosZoo as RecintosZoo };