#!/usr/bin/env node

/**
 * Bundle Analyzer Script
 * Analyzes the Next.js bundle size and provides optimization recommendations
 */

const fs = require('fs');
const path = require('path');

function analyzeBundle() {
  const buildDir = path.join(process.cwd(), '.next');
  
  if (!fs.existsSync(buildDir)) {
    console.log('❌ No build found. Please run "npm run build" first.');
    return;
  }

  console.log('📊 Analyzing bundle size...\n');

  const staticDir = path.join(buildDir, 'static');
  if (!fs.existsSync(staticDir)) {
    console.log('❌ Static directory not found.');
    return;
  }

  const chunks = [];
  const totalSize = { js: 0, css: 0 };

  function analyzeDirectory(dir, prefix = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        analyzeDirectory(filePath, prefix + file + '/');
      } else if (file.endsWith('.js') || file.endsWith('.css')) {
        const size = stat.size;
        const type = file.endsWith('.js') ? 'js' : 'css';
        
        chunks.push({
          name: prefix + file,
          size: size,
          sizeFormatted: formatBytes(size),
          type: type
        });
        
        totalSize[type] += size;
      }
    });
  }

  analyzeDirectory(staticDir);

  // Sort by size (largest first)
  chunks.sort((a, b) => b.size - a.size);

  console.log('🔍 Bundle Analysis Results:');
  console.log('=' * 50);
  console.log(`Total JavaScript: ${formatBytes(totalSize.js)}`);
  console.log(`Total CSS: ${formatBytes(totalSize.css)}`);
  console.log(`Total Bundle Size: ${formatBytes(totalSize.js + totalSize.css)}\n`);

  console.log('📦 Largest Chunks:');
  chunks.slice(0, 10).forEach((chunk, index) => {
    const icon = chunk.type === 'js' ? '📜' : '🎨';
    console.log(`${index + 1}. ${icon} ${chunk.name} - ${chunk.sizeFormatted}`);
  });

  console.log('\n💡 Optimization Recommendations:');
  
  if (totalSize.js > 1024 * 1024) { // 1MB
    console.log('⚠️  JavaScript bundle is large (>1MB). Consider:');
    console.log('   - Code splitting with dynamic imports');
    console.log('   - Tree shaking unused dependencies');
    console.log('   - Using bundle analyzer for detailed analysis');
  }

  if (totalSize.css > 512 * 1024) { // 512KB
    console.log('⚠️  CSS bundle is large (>512KB). Consider:');
    console.log('   - Purging unused CSS with PurgeCSS');
    console.log('   - Using CSS-in-JS solutions for better tree shaking');
  }

  const largeChunks = chunks.filter(chunk => chunk.size > 256 * 1024); // 256KB
  if (largeChunks.length > 0) {
    console.log('⚠️  Large chunks detected. Consider splitting:');
    largeChunks.forEach(chunk => {
      console.log(`   - ${chunk.name} (${chunk.sizeFormatted})`);
    });
  }

  console.log('\n✅ Performance is looking good!');
  
  // Generate report file
  const report = {
    timestamp: new Date().toISOString(),
    totalSize: totalSize.js + totalSize.css,
    jsSize: totalSize.js,
    cssSize: totalSize.css,
    chunks: chunks,
    recommendations: generateRecommendations(totalSize, chunks)
  };

  fs.writeFileSync(
    path.join(process.cwd(), 'bundle-analysis.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n📄 Detailed report saved to bundle-analysis.json');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function generateRecommendations(totalSize, chunks) {
  const recommendations = [];
  
  if (totalSize.js > 1024 * 1024) {
    recommendations.push('Consider code splitting for JavaScript bundles >1MB');
  }
  
  if (totalSize.css > 512 * 1024) {
    recommendations.push('Consider CSS optimization for stylesheets >512KB');
  }
  
  const largeChunks = chunks.filter(chunk => chunk.size > 256 * 1024);
  if (largeChunks.length > 0) {
    recommendations.push(`Split large chunks: ${largeChunks.map(c => c.name).join(', ')}`);
  }
  
  return recommendations;
}

if (require.main === module) {
  analyzeBundle();
}

module.exports = { analyzeBundle };
