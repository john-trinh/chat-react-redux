import SendBird from 'sendbird';

const sendbird = new SendBird({
  appId: 'AA626341-DD06-48E4-98AC-E15385EAF323'
});

const fetchChannels = (dispatch) => () => {
  const payload = new Promise((resolve, reject) => {
    sendbird.OpenChannel.createOpenChannelListQuery().next((ch, err) => {
      resolve(ch);
    });
  });
  return dispatch({
    type: 'FETCH_CHANNELS',
    payload
  });
}

export default function mapDispatchToProps(dispatch) {
  return {
    connect: async (userId) => {
      const payload = new Promise((resolve, reject) => {
        sendbird.connect(userId, (u, err) => {
          resolve(u);
        });
      });

      await dispatch({
        type: 'CONNECTION',
        payload
      })
      return fetchChannels(dispatch)();
    },
    createChannel: (name) => {
      const payload = new Promise((resolve, reject) => {
        sendbird.OpenChannel.createChannel(name, name, '', (ch, err) => {
          if (err) {
            console.error(err);
            reject(err);
          }
        });
        return dispatch({
            type: 'CREATE_CHANNEL',
            channel: name,
            payload
        });
      })
    }
  }
}