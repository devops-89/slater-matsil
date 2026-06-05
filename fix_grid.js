const fs = require('fs');
const path = require('path');

const dir = 'd:/digixito-projects/slater-matsil/components/layouts/admin-layout/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Find `<Grid item ...>` and replace with `<Grid size={{ ... }}>`
  content = content.replace(/<Grid\s+item\s+([^>]+)>/g, (match, propsString) => {
    // propsString is something like `xs={12} md={4}` or `xs={12} sm={6} md={4}`
    
    // We want to extract key=value pairs
    const regex = /(xs|sm|md|lg|xl)={([^}]+)}/g;
    let match2;
    const sizes = [];
    let otherProps = propsString;
    
    while ((match2 = regex.exec(propsString)) !== null) {
      sizes.push(`${match2[1]}: ${match2[2]}`);
      otherProps = otherProps.replace(match2[0], '');
    }
    
    otherProps = otherProps.trim();
    if (sizes.length > 0) {
      return `<Grid ${otherProps} size={{ ${sizes.join(', ')} }}>`.replace(/\s+/g, ' ');
    }
    return match;
  });

  fs.writeFileSync(filePath, content);
}
console.log('Fixed Grid items!');
