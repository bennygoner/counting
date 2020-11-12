import xlg from '../xlogger';
//import * as config from '../config.json';
import { CommandClient, ExtMessage } from '../typings';
import { sendError } from "../utils/messages";
import { TextChannel } from 'discord.js';
import { getFriendlyUptime } from '../utils/time';

module.exports = {
    name: "uptime",
    description: "get the bot's uptime",
    showInHelp: false,
    async execute(client: CommandClient, message: ExtMessage) {
        try {
            const uptime = getFriendlyUptime(client.uptime || 0, true);

            message.channel.send({
                embed: {
                    color: process.env.INFO_COLOR,
                    title: "Bot Lifetime",
                    description: 'How long the bot has been alive',
                    fields: [
                        {
                            name: "Elapsed Time",
                            value: `\`${uptime.days} : ${uptime.hours} : ${uptime.minutes} ; ${uptime.seconds} . ${uptime.milliseconds}\ndays  hrs  min  sec  ms \``,
                            inline: true
                        },
                        {
                            name: "Chronometer",
                            value: client.uptime + 'ms',
                            inline: true
                        },
                        {
                            name: "Bot Started At",
                            value: new Date(client.readyTimestamp || "").toUTCString()
                        }
                    ]
                }
            });
        } catch (error) {
            xlg.error(error);
            if (!(message.channel instanceof TextChannel)) return;
            sendError(message.channel);
        }
    }
}