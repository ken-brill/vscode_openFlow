const { execSync, exec } = require('child_process');
const filePath = process.env.VSCODE_FILE;

if (!filePath || !filePath.endsWith('.flow-meta.xml')) {
  console.error('⚠️  Active file is not a `.flow-meta.xml` file.');
  process.exit(1);
}

const flowApiName = filePath.split('/').pop().replace('.flow-meta.xml', '');

try {
  // Get default org domain
  const orgDisplay = execSync(`sfdx force:org:display --json`, { encoding: 'utf8' });
  const orgJson = JSON.parse(orgDisplay);
  const domain = orgJson.result.instanceUrl;

  if (!domain) {
    console.error('❌ Could not determine Salesforce org domain.');
    process.exit(1);
  }

  // Query for Active or Draft Flow record
  const query = `sfdx force:data:soql:query -q "SELECT Id FROM Flow WHERE Status <> 'Obsolete' AND Definition.DeveloperName = '${flowApiName}' ORDER BY Status ASC LIMIT 1" -t --json`;
  const result = execSync(query, { encoding: 'utf8' });
  const json = JSON.parse(result);
  const records = json.result.records;

  if (!records.length) {
    console.error(`❌ No Draft Flow found with API Name: ${flowApiName}`);
    console.log(`🔗 ${query}`);
    process.exit(1);
  }

  const flowId = records[0].Id;
  const flowBuilderUrl = `${domain}/builder_platform_interaction/flowBuilder.app?flowId=${flowId}`;

  console.log(`🌐 Opening Flow Builder for "${flowApiName}"`);
  console.log(`🔗 ${flowBuilderUrl}`);

  // Open browser (cross-platform)
  const platform = process.platform;
  let command = '';

  if (platform === 'darwin') {
    command = `open "${flowBuilderUrl}"`;
  } else if (platform === 'win32') {
    command = `start "" "${flowBuilderUrl}"`;
  } else {
    command = `xdg-open "${flowBuilderUrl}"`;
  }

  exec(command, (error) => {
    if (error) {
      console.error('❌ Failed to open browser:', error);
    }
  });

} catch (error) {
  console.error('❌ Script error:', error.message);
}
