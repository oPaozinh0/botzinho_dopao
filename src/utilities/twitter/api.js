const { client, isTwitterEnabled } = require('../../core/twitter_client');
const { isToday } = require('../date-time');

async function getTodaysLiveAnnouncement() {
  const params = {
    query: 'from:bidiridu -is:retweet -is:reply has:links',
    max_results: 25,
    'tweet.fields': 'created_at,public_metrics,entities',
  };

  const { data } = await client.get('tweets/search/recent', params);

  if (!data) {
    throw console.error('Falha ao obter os últimos tweets.');
  }

  const tweets = data.filter((tweet) => {
    const tweetWithTwitchURLs = tweet.entities?.urls?.find((url) => {
      return url.expanded_url === `https://twitch.tv/pao_natwitch`;
    });
    return (
      isToday(tweet.created_at) &&
      tweet.text.match(process.env.TW_TWEET_ANNOUNCE_REGEX) &&
      tweetWithTwitchURLs
    );
  });
  return tweets.length > 0 ? tweets[0] : undefined;
}

module.exports = {
  getTodaysLiveAnnouncement,
};
