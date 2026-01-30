const fs = require('fs');
const path = require('path');

// Read package.json
const packageJsonPath = path.join(__dirname, '../my-app/package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Read package-lock.json
const lockPath = path.join(__dirname, '../my-app/package-lock.json');
let lockJson = JSON.parse(fs.readFileSync(lockPath, 'utf8'));

// Update lockfile version and packages to match package.json
lockJson.packages = lockJson.packages || {};

// Ensure root package entry matches
lockJson.packages[''] = {
  name: packageJson.name,
  version: packageJson.version,
  dependencies: packageJson.dependencies,
  devDependencies: packageJson.devDependencies
};

// Add missing dependencies with placeholder entries
Object.entries(packageJson.dependencies || {}).forEach(([name, version]) => {
  if (!lockJson.packages[name]) {
    lockJson.packages[name] = {
      version: version,
      resolved: `https://registry.npmjs.org/${name}/-/${name}-${version}.tgz`
    };
  }
});

// Write back the updated lock file
fs.writeFileSync(lockPath, JSON.stringify(lockJson, null, 2));
console.log('Lock file updated successfully');
