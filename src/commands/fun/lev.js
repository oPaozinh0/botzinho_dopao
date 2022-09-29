const { paozinho } = require('./_constants');
const { client } = require('../../core/twitch_client');
const { sample } = require('../../utilities/collections');

module.exports = {
  keyword: 'pão',
  async execute({ context, channel }) {
    const selected = sample(paozinho);

    if (!selected) return;

    await client.say(
      channel,
      `Saindo do forninho uma variação do pãozinho especialmente para você @${context.username}...
      trililililim... O seu pão especial é: ${selected}`,
    );
  },
};
