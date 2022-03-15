import {
    Commander,
    CommandExecutor,
    CommandOrigins
} from 'tmijs-commander'; // A lib de tipagem de Typescript para o chat da Twitch
import Timer from "../util/timer";

export default class TotalCommand extends CommandExecutor {
    private timer = new Timer();
    public static total = {
        flexoes: 0, 
        abdominais: 0,
        prancha: 0,
        polichinelo: 0,
        agachamento: 0
    }

    public async invoke(origins: CommandOrigins): Promise<void> {
        origins.client.say(origins.channel, `De tanto morrer aqui, eu já fiz: - ${TotalCommand.total.flexoes} flexões; - ${TotalCommand.total.abdominais} abdominais; - ${this.timer.convertToTime(TotalCommand.total.prancha)} de prancha; - ${TotalCommand.total.polichinelo} polichinelos; - ${TotalCommand.total.agachamento} agachamentos.`);
    }
}