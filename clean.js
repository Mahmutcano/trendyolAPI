const fs = require('fs').promises;

async function removeBuildDir() {
  try {
    await fs.rmdir('./build', { recursive: true });
    console.log('Removed ./build directory');
  } catch (err) {
    console.error('Error removing ./build directory:', err.message);
  }
}

removeBuildDir();
