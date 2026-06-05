const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('PaperProps={{ sx: {')) {
        content = content.replace(/PaperProps=\{\{\s*sx:\s*\{([^}]+)\}\s*\}\}/g, 'slotProps={{ paper: { sx: {$1} } }}');
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

replaceInDir('d:/digixito-projects/slater-matsil/components/layouts/admin-layout');
