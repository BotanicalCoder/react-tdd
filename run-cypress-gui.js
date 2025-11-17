// run-cypress-gui.js
import { exec } from 'child_process';
import { promisify } from 'util';
const execPromise = promisify(exec);

async function runCypressWithGUI() {
  try {
    console.log('Allowing local X11 connections...');
    await execPromise('xhost +local:');

    console.log('Starting Cypress with Xvfb (visible on your desktop)...');
    await execPromise(
      'xvfb-run -a -e /dev/stdout --server-args="-screen 0 1280x800x24" cypress open'
    );
  } catch (error) {
    console.error('Failed to start Cypress GUI:', error.message);
    process.exit(1);
  }
}

runCypressWithGUI();
