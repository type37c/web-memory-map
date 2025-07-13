const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy all files from src to dist
function copyFiles() {
  const files = fs.readdirSync(srcDir);
  
  files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const distPath = path.join(distDir, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      // Recursively copy directories
      copyDirectory(srcPath, distPath);
    } else {
      // Copy file
      fs.copyFileSync(srcPath, distPath);
      console.log(`Copied: ${file}`);
    }
  });
  
  // Copy manifest.json from root
  fs.copyFileSync(
    path.join(__dirname, 'manifest.json'),
    path.join(distDir, 'manifest.json')
  );
  console.log('Copied: manifest.json');
}

function copyDirectory(src, dist) {
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const distPath = path.join(dist, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, distPath);
    } else {
      fs.copyFileSync(srcPath, distPath);
    }
  });
}

// Build function
function build() {
  console.log('Building extension...');
  copyFiles();
  console.log('Build complete!');
}

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('Watching for changes...');
  build();
  
  fs.watch(srcDir, { recursive: true }, (eventType, filename) => {
    console.log(`File changed: ${filename}`);
    build();
  });
  
  fs.watch(path.join(__dirname, 'manifest.json'), () => {
    console.log('manifest.json changed');
    build();
  });
} else {
  build();
}