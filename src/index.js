const player1 = {
  NAME: "Mario",
  VELOCITY: 4,
  MANEUVERABILITY: 3,
  POWER: 3,
  POINTS: 0,
};

const player2 = {
  NAME: "Luigi",
  VELOCITY: 3,
  MANEUVERABILITY: 4,
  POWER: 4,
  POINTS: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomTurbo() {
  let random = Math.random();
  return random < 0.5 ? true : false;
}

async function getRandomAttack() {
  let random = Math.random();
  return random < 0.5 ? "CASCO" : "BOMBA";
}

async function getRandomBlock() {
  let random = Math.random();
  return random < 0.33 ? "RETA" : random < 0.66 ? "CURVA" : "CONFRONTO";
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCITY;
      totalTestSkill2 = diceResult2 + character2.VELOCITY;

      await logRollResult(
        character1.NAME,
        "velocidade",
        diceResult1,
        character1.VELOCITY
      );

      await logRollResult(
        character2.NAME,
        "velocidade",
        diceResult2,
        character2.VELOCITY
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANEUVERABILITY;
      totalTestSkill2 = diceResult2 + character2.MANEUVERABILITY;

      await logRollResult(
        character1.NAME,
        "manobrabilidade",
        diceResult1,
        character1.MANEUVERABILITY
      );

      await logRollResult(
        character2.NAME,
        "manobrabilidade",
        diceResult2,
        character2.MANEUVERABILITY
      );
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.POWER;
      let powerResult2 = diceResult2 + character2.POWER;

      console.log(`${character1.NAME} confrontou com ${character2.NAME}! 🥊`);

      await logRollResult(
        character1.NAME,
        "poder",
        diceResult1,
        character1.POWER
      );

      await logRollResult(
        character2.NAME,
        "poder",
        diceResult2,
        character2.POWER
      );

      if (powerResult1 > powerResult2 && character2.POINTS > 0) {
        const attack = getRandomAttack();
        switch (attack) {
          case "CASCO":
            console.log(
              `${character1.NAME} venceu o confronto! ${character2.NAME} perdeu 1 ponto 🐢`
            );
            character2.POINTS--;
            break;
          case "BOMBA":
            if (character2.POINTS === 1) {
              console.log(
                `${character1.NAME} venceu o confronto! ${character2.NAME} perdeu 2 pontos 🐢`
              );
              character2.POINTS--;
            } else {
              console.log(
                `${character1.NAME} venceu o confronto! ${character2.NAME} perdeu 2 pontos 🐢`
              );
              character2.POINTS -= 2;
            }
        }
      }

      if (powerResult2 > powerResult1 && character1.POINTS > 0) {
        const attack = getRandomAttack();
        switch (attack) {
          case "CASCO":
            console.log(
              `${character2.NAME} venceu o confronto! ${character1.NAME} perdeu 1 ponto 🐢`
            );
            character1.POINTS--;
            break;
          case "BOMBA":
            if (character1.POINTS === 1) {
              console.log(
                `${character2.NAME} venceu o confronto! ${character1.NAME} perdeu 2 pontos 🐢`
              );
              character1.POINTS--;
            } else {
              console.log(
                `${character2.NAME} venceu o confronto! ${character1.NAME} perdeu 2 pontos 🐢`
              );
              character1.POINTS -= 2;
            }
        }
      }

      console.log(
        powerResult2 === powerResult1
          ? "Confronto empatado! Nenhum ponto foi perdido"
          : ""
      );
    }

    const winPoints = getRandomTurbo() ? 2 : 1;
    const winPointsStr = getRandomTurbo() ? "dois" : "um";
    // verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NAME} marcou ${winPointsStr} ponto(s)!`);
      character1.POINTS += winPoints;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NAME} marcou ${winPointsStr} ponto(s)!`);
      character2.POINTS += winPoints;
    }

    console.log("-----------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NAME}: ${character1.POINTS} ponto(s)`);
  console.log(`${character2.NAME}: ${character2.POINTS} ponto(s)`);

  if (character1.POINTS > character2.POINTS)
    console.log(`\n${character1.NAME} venceu a corrida! Parabéns! 🏆`);
  else if (character2.POINTS > character1.POINTS)
    console.log(`\n${character2.NAME} venceu a corrida! Parabéns! 🏆`);
  else console.log("A corrida terminou em empate");
}

(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NAME} e ${player2.NAME} começando...\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
