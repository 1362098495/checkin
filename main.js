import fetch from 'node-fetch';

const glados = async () => {
  const cookie = process.env.GLADOS;
  const account = process.env.ACCOUNT;

  if (!cookie) return;
  try {
    const headers = {
      'cookie': cookie,
      'referer': 'https://glados.rocks/console/checkin',
      'user-agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
    };
    const checkin = await fetch('https://glados.rocks/api/user/checkin', {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: '{"token":"glados.one"}',
    }).then((r) => r.json());

    const status = await fetch('https://glados.rocks/api/user/status', {
      method: 'GET',
      headers,
    }).then((r) => r.json());

    const banlance = Math.floor(parseFloat(checkin.list[0].balance));
    const change = Math.floor(parseFloat(checkin.list[0].change));

    if (!status.data || typeof status.data.leftDays === 'undefined') {
      throw new Error('Unexpected response format: ' + JSON.stringify(status));
    }

    return [
      `签到成功！总点数：${banlance}`,
      `账号：${account}`,
      `获得点数：${change}`,
      `总点数：${banlance}`,
      `剩余天数：${Number(status.data.leftDays)}`,
    ];
  } catch (error) {
    console.error('Error during checkin:', error);
    return [
      '签到失败！请尽快检查！！',
      `${error.message}`,
      `<${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}>`,
    ];
  }
};

const notify = async (contents) => {
  const token = process.env.NOTIFY;

  if (!token || !contents) return;
  await fetch('https://www.pushplus.plus/send', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      token,
      title: contents[0],
      content: contents.join('<br>'),
      template: 'markdown',
    }),
  });
};

const main = async () => {
  await notify(await glados());
};

main();
