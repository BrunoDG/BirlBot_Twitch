import {
    Commander,
    CommandExecutor,
    CommandOrigins
} from 'tmijs-commander'; // A lib de tipagem de Typescript para o chat da Twitch

import Timer from "../util/timer";
import ExerciseLevel from "../util/exercise";
import TotalCommand from './total';

export default class ZeraCommand extends CommandExecutor {
    private timer = new Timer();
    public async invoke(origins: CommandOrigins): Promise<void> {
        console.log("Zerando os trabalhos...");
        if (!this.timer.isActive()) {
            this.ZeraTudo();
            origins.client.say(origins.channel, `Reiniciando todos os contadores e começando os exercícios do zero. Boa sorte aí, filhão...`);
            this.timer.start(60);
        } else {
            origins.client.say(origins.channel, `Calma que faltam ${this.timer.cooldownCheck()} para voltar a funcionar o comando.`);
        }
    }

    public ZeraTudo() {
        ExerciseLevel.ex = {
            flexoes: 0,
            abdominais: 0,
            prancha:  0,
            polichinelo: 0,
            agachamento: 0,
        };
        TotalCommand.total = {
            flexoes: 0,
            abdominais: 0,
            prancha: 0,
            polichinelo: 0,
            agachamento: 0
        };
    }
}