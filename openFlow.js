const { spawn } = require('child_process');
const keyword = 'force-app';
const filePath = process.env.VSCODE_FILE;

if (!filePath || !filePath.endsWith('.flow-meta.xml')) {
  console.error('⚠️  Active file is not a `.flow-meta.xml` file.');
  process.exit(1);
}

console.log(`🔗 ${filePath}`);
const index = filePath.indexOf(keyword);
const flowApiName = index !== -1 ? filePath.slice(index) : filePath;
console.log(`🔗 ${flowApiName}`);

try {
  console.log(`🌐 Opening Flow Builder for "${flowApiName}"`);

  const command = spawn('sf', ['org', 'open', '--source-file', flowApiName]);

  command.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  command.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  command.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

} catch (error) {
  console.error('❌ Script error:', error.message);
}
