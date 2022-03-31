const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
});
server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  // 流是双工的
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200
  });
  stream.end(`上海市委常委会今天举行会议，研究部署下一步疫情防控重点工作

市委常委会今天上午（3月30日）举行会议，听取当前疫情应急处置和核酸筛查相关工作汇报，研究部署下一步疫情防控重点工作。市委书记李强主持会议并讲话。

坚定坚决地实施好这一轮面上核酸筛查工作，尽快遏制疫情扩散蔓延，尽早实现社会面清零

会议指出，要充分认识疫情防控面临的严峻复杂形势，坚决贯彻习近平总书记重要讲话和指示批示精神，坚定坚决地实施好这一轮面上核酸筛查工作，尽快遏制疫情扩散蔓延，尽早实现社会面清零。第一批地区的筛查要一鼓作气，按时按质完成；第二批地区的筛查要无缝衔接，有序展开。筛查期间，严格落实“人不流动、足不出户”，确保“不漏一户、不落一人”。加强动态分析、前瞻谋划，因时因势优化策略、细化举措，加快落实重点事项、解决急难问题。充分挖潜、加紧布局，持续强化核酸检测能力和应急保障能力。要全面加强组织领导，全面压实“四方责任”，进一步动员起来、组织起来、行动起来。各工作专班要集中办公、高效运转，确保统一调度、信息共享，提高统筹协调效能。充分发挥各区和街镇主体作用和主观能动性，提高工作效率效果。加快组织力量支援基层，推动更多防控资源向街镇、社区下沉。要全面提高社会动员能力，持续加强舆论引导，积极回应社会关切，形成人人从我做起、支持抗疫的强大合力。

统筹抓好疫情防控和安全生产工作

会议听取全市安全生产重点工作汇报，指出要统筹抓好疫情防控和安全生产工作，牢牢把握维护城市风险防控的主动权，努力构建群防群治社会治理新格局。织密织牢责任网，加强风险预测预警预防，打好整治攻坚战。强化依法治理，加强科技赋能，筑牢城市安全防线。

会议还研究了其他事项。`);
});

server.listen(8443);

const client = http2.connect('https://localhost:8443', {
  ca: fs.readFileSync('localhost-cert.pem')
});
client.on('error', (err) => console.error(err));

const req = client.request({ ':path': '/' });

req.on('response', (headers, flags) => {
  for (const name in headers) {
    console.log(`${name}: ${headers[name]}`);
  }
});

req.setEncoding('utf8');
let data = '';
req.on('data', (chunk) => { data += chunk; });
req.on('end', () => {
  console.log(`\n${data}`);
  client.close();
});
req.end();