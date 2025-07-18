// Import parseLogoImage and MetallicPaint from the shader module
import { parseLogoImage, MetallicPaint } from './MetallicPaint.js';

// Get the canvas element from the page
const canvas = document.getElementById('shader-canvas');

// Start function that loads logo and sets up shader
async function start() {
  try {
    // Fetch the logo.svg from the same folder
    const response = await fetch('logo.svg');

    if (!response.ok) {
      throw new Error(`Failed to load logo.svg: ${response.status}`);
    }

    // Convert the response into a blob and wrap it as a File object
    const blob = await response.blob();
    const file = new File([blob], 'logo.svg', { type: blob.type });

    // Use the parsing function to extract ImageData
    const result = await parseLogoImage(file);
    const imageData = result?.imageData;

    if (!imageData) {
      console.error('No image data returned from parseLogoImage');
      return;
    }

    // Define effect parameters
    const params = {
      edge: 2,
      patternBlur: 0.005,
      patternScale: 2,
      refraction: 0.015,
      speed: 0.3,
      liquid: 0.07,
    };

    // Start the metallic shader animation
    new MetallicPaint(canvas, imageData, params);

  } catch (err) {
    console.error('Error during startup:', err);
  }
}

// Kick off the logic
start();
