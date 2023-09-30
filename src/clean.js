const fs = require('fs-extra');

async function removeBuildDir() {
  try {
    await fs.remove('./build');
    console.log('Removed ./build directory');
  } catch (err) {
    console.error('Error removing ./build directory:', err.message);
  }
}

removeBuildDir();
