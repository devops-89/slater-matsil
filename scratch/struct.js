const fs = require('fs');

let code = fs.readFileSync('public/data/website-data.ts', 'utf8');

// Function to convert plain text with bullets and \n\n into contentBlocks
function parseBlocks(text) {
  let paragraphs = text.split('\n\n');
  let blocks = [];
  paragraphs.forEach(p => {
    p = p.trim();
    if (!p) return;
    
    // Check if paragraph is a list
    if (p.startsWith('•')) {
      let items = p.split('\n').map(l => l.replace(/^•\s*/, '').trim()).filter(l => l);
      blocks.push({ type: 'list', items });
    } else {
      // It's a paragraph
      // We also check for single newlines, we can just keep them in the text
      // the frontend will split by \n and render <br/>.
      blocks.push({ type: 'paragraph', text: p });
    }
  });
  return blocks;
}

// We will use regex to find each section's content and replace it with contentBlocks
let result = code.replace(/"content":\s*"([\s\S]*?)"(?=\n\s*\})/g, (match, p1) => {
    let text = p1.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    
    let blocks = parseBlocks(text);
    
    // Stringify blocks
    let blocksStr = JSON.stringify(blocks, null, 4).replace(/\n/g, '\n            ');
    return `"contentBlocks": ${blocksStr}`;
});

fs.writeFileSync('public/data/website-data.ts', result);
