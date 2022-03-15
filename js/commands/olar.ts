import { Commander, CommandExecutor, CommandOrigins } from "tmijs-commander"; // A lib de tipagem de Typescript para o chat da Twitch

export default class OlarCommand extends CommandExecutor {
  public async invoke(origins: CommandOrigins): Promise<void> {
    origins.client.say(
      origins.channel,
      `Olar, ${origins.author.username}. Eu sou o BirlBot, criado pelo BrunoGatts ( http://twitch.tv/brunogatts ). Bem vindo ao #HellBomba`
    );
  }
}
