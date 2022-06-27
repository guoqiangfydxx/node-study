const { exec } = require('child_process');
 exec('yarn  -v', (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      console.log('开始安装yarn');
      exec('npm install yarn', (err, stdout, stderr ) => {
        if (err) {
          console.log('yarn安装失败');
          return;
        }
        console.log(`yarn 安装成功`);
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      })
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  })