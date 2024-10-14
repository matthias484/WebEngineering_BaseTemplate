// src/js/main.js
import { toggleComments, handleCommentForm } from './comments.js';
import { getBearData } from './bearData.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the comments functionality
  toggleComments();
  handleCommentForm();

  // Fetch and display the bear data
  getBearData()
      .then(() => {
        console.log('Bear data loaded successfully');
      })
      .catch((error) => {
        console.error('Error fetching bear data:', error);
      });
});
