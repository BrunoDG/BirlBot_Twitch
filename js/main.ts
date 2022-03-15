import * as tmi from "tmi.js"; // A interface de mensagens do chat da Twitch (tmi - Twitch Message Interface)
import opt from "./opt"; // Seu arquivo de Opções
import { Commander, CommandExecutor, CommandOrigins } from "tmijs-commander"; // A lib de tipagem de Typescript para o chat da Twitch

// Importando as utilidades
import Timer from "./util/timer";
import ExerciseLevel from "./util/exercise";

// Cada um dos comandos separados por arquivos TS
import TotalCommand from "./commands/total";
import OlarCommand from "./commands/olar";
import MalhaCommand from "./commands/birl";
import ZeraCommand from "./commands/zera";

// O Vetor de números e o numero de contagem
let exLvl = new ExerciseLevel();
let lvl: number = 0;

// Connect to twitch server
const client = tmi.Client(opt);

client
  .connect()
  .then(() => {
    const commander = new Commander(client);
    commander.registerCommand("!olar", new OlarCommand()); // Só dá um oi mesmo
    commander.registerCommand("!bora", new StartCommand()); // Aceita argumentos adicionais, é com ele que é definido o nível do exercício
    commander.registerCommand("!birl", new MalhaCommand()); // O contador de exercícios, de fato
    commander.registerCommand("!zera", new ZeraCommand()); // Zera todos os contadores de exercícios
    commander.registerCommand("!listae", new ListCommand()); // Lista todos os comandos do Bot
    commander.registerCommand("!total", new TotalCommand()); // Mostra o total de exercícios feitos até agora
    console.log("BirlBot ativado. Ajuda o streamer ali que ele tá doente!");
  })
  .catch(console.error);

class Comecando extends CommandExecutor {
  public async invoke(origins: CommandOrigins): Promise<void> {
    origins.client.say(
      origins.channel,
      "BirlBot chegou. Ajuda o streamer alí que ele tá doente, por que aqui nós constrói fibra!"
    );
  }
}

class StartCommand extends CommandExecutor {
  private timer = new Timer();
  public async invoke(origins: CommandOrigins): Promise<void> {
    console.log(`Canal: ${origins.channel}; User:${origins.author.username}`);
    if (origins.channel === `#${origins.author.username}`) {
      if (!this.timer.isActive()) {
        if (origins.arguments[0] !== undefined) {
          if (+origins.arguments[0] < 1 || +origins.arguments[0] > 10) {
            origins.client.say(
              origins.channel,
              `Calma aí, só estou aceitando níveis de 1 a 10 por enquanto!`
            );
            return;
          } else {
            lvl = +origins.arguments[0];
            origins.client.say(
              origins.channel,
              `Seu nível selecionado foi o ${lvl}. Vamos ajustar as rotinas pra esse nível. Não esqueça que antes de se exercitar é preciso fazer um alongamento, hein!`
            );
          }
        } else {
          lvl = 4;
          origins.client.say(
            origins.channel,
            `Como nenhum nível foi selecionado, o padrão é o nível ${lvl}. Vamos ajustar as rotinas pra esse nível. Não esqueça que antes de se exercitar é preciso fazer um alongamento, hein!`
          );
        }
        exLvl.setExerciseLevel(lvl);
        this.timer.start(5);
      } else {
        origins.client.say(
          origins.channel,
          `Calma que faltam ${this.timer.cooldownCheck()} para voltar a funcionar o comando.`
        );
      }
    } else {
      origins.client.say(
        origins.channel,
        `Espera aí, amigão, só o dono desse canal pode usar esse comando, pra evitar problemas!`
      );
    }
  }
}

class ListCommand extends CommandExecutor {
  public async invoke(origins: CommandOrigins): Promise<void> {
    origins.client.say(
      origins.channel,
      "Comandos do chat até agora: !olar - Eu, o grande BirlBot, te dou um oi, quer mais?; !birl - Bota o streamer pra chorar, digo, malhar em live; !zera - Reseta todos os contadores dos exercícios; !total - Lista os contadores dos exercícios até agora;"
    );
    //origins.client.say(origins.channel, 'Comandos do chat até agora: !olar - Eu, o grande BirlBot, te dou um oi, quer mais?; !birl - Bota o streamer pra chorar, digo, malhar em live; !zera - Reseta todos os contadores dos exercícios; !total - Lista os contadores dos exercícios até agora; !ded - Aumenta aí uma morte desse streamer noobão; !kills - Mostra quantas vezes o \"Pr0 Pl4yer\" aqui já morreu;');
  }
}
