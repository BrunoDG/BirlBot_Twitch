import {
    Commander,
    CommandExecutor,
    CommandOrigins
} from 'tmijs-commander'; // A lib de tipagem de Typescript para o chat da Twitch

import Timer from "../util/timer";
import ExerciseLevel from "../util/exercise";
import TotalCommand from "../commands/total";

export default class MalhaCommand extends CommandExecutor {
    private timer = new Timer();
    private count: number = 0;

    public async invoke(origins: CommandOrigins): Promise<void> {
        if (!this.timer.isActive()) {
            if (ExerciseLevel.ex.flexoes == 0) {
                origins.client.say(origins.channel, `Calma aí, faltou você digitar o comando 'bora' e dizer qual é o seu nível pros exercícios, né?`);
                return;
            }
            this.horaDoShow(origins);
            this.timer.start(0.25);
        } else {
            origins.client.say(origins.channel, `Calma que faltam ${this.timer.cooldownCheck()} para voltar a funcionar o comando.`);
        }
    }

    private horaDoShow(origins: CommandOrigins) {
        let exer: string = "";
        let num: number = 0;
        let tm: string = "";
        
        if (this.count >= 5) {
            this.count = 0;
        }

        switch (this.count) {
            case 0:
                exer = "flexões";
                num = ExerciseLevel.ex.flexoes;
                TotalCommand.total.flexoes += num;
                break;
            case 1:
                exer = "abdominais";
                num = ExerciseLevel.ex.abdominais;
                TotalCommand.total.abdominais += num;
                break;
            case 2:
                exer = "de prancha";
                num = ExerciseLevel.ex.prancha;
                TotalCommand.total.prancha += num;
                tm = this.timer.convertToTime(num);
                break;
            case 3:
                exer = "polichinelos";
                num = ExerciseLevel.ex.polichinelo;
                TotalCommand.total.polichinelo += num;
                break;
            case 4:
                exer = "agachamentos";
                num = ExerciseLevel.ex.agachamento;
                TotalCommand.total.agachamento += num;
                break;
            default:
                break;
        }
        origins.client.say(origins.channel, `E lá vamos nós pra mais ${exer === "de prancha" ? tm : num} ${exer}, meu nobre...`);
        this.count++;
    }
}