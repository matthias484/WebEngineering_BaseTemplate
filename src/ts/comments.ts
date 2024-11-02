// Functionality for showing/hiding the comments section
export const toggleComments = () => {
  const showHideBtn = document.querySelector('.show-hide')!;
  const commentWrapper = document.querySelector('.comment-wrapper')!;

  // Check if elements exist before attaching event listeners
  if (!showHideBtn || !commentWrapper) {
    console.error('Required elements not found.');
    return;
  }

  // Initial state: comments are hidden
  commentWrapper.style.display = 'none';
  showHideBtn.setAttribute('tabindex', '0');
  showHideBtn.setAttribute('role', 'button');
  showHideBtn.setAttribute('aria-pressed', 'false');
  showHideBtn.textContent = 'Show comments';

  const toggleVisibility = () => {
    const isVisible = commentWrapper.style.display === 'block';
    commentWrapper.style.display = isVisible ? 'none' : 'block';
    showHideBtn.textContent = isVisible ? 'Show comments' : 'Hide comments';
    showHideBtn.setAttribute('aria-pressed', (!isVisible).toString());
  };

  // Click event for mouse users
  showHideBtn.addEventListener('click', toggleVisibility);

  // Keydown event for keyboard users
  showHideBtn.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      toggleVisibility();
    }
  });
};

// Functionality for adding a new comment via the comments form
export const handleCommentForm = () => {
  const form = document.querySelector('.comment-form')!;
  const nameField = document.querySelector('#name')!;
  const commentField = document.querySelector('#comment')!;
  const list = document.querySelector('.comment-container')!;

  // Explicit null checks to satisfy the linter
  if (!form || !nameField || !commentField || !list) {
    console.error('Form elements not found');
    return;
  }

  form.onsubmit = (e: Event) => {
    e.preventDefault();
    try {
      const listItem = document.createElement('li');
      const namePara = document.createElement('p');
      const commentPara = document.createElement('p');
      const nameValue = nameField.value;
      const commentValue = commentField.value;

      namePara.textContent = nameValue;
      commentPara.textContent = commentValue;

      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);
      list.appendChild(listItem);

      nameField.value = ''; // Reset the input fields after submitting
      commentField.value = '';
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
};
