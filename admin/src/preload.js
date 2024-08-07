// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

window.addEventListener('DOMContentLoaded', () => {
    // Example of exposing a function to the renderer process
    window.electron = {
      doSomething: () => {
        console.log('This function is exposed to the renderer process.');
      }
    };
  });
  
