// Functionality for showing/hiding the comments section
export const toggleComments = () => {
  const showHideBtn = document.querySelector('.show-hide');
  const commentWrapper = document.querySelector('.comment-wrapper');

  // Check if elements exist before attaching event listeners
  if (showHideBtn === null || commentWrapper === null) {
    console.error('Required elements not found.');
    return;
  }

  commentWrapper.style.display = 'none';

  showHideBtn.onclick = () => {
    const showHideText = showHideBtn.textContent;
    if (showHideText === 'Show comments') {
      showHideBtn.textContent = 'Hide comments';
      commentWrapper.style.display = 'block';
    } else {
      showHideBtn.textContent = 'Show comments';
      commentWrapper.style.display = 'none';
    }
  };
};

// Functionality for adding a new comment via the comments form
export const handleCommentForm = () => {
  const form = document.querySelector('.comment-form');
  const nameField = document.querySelector('#name');
  const commentField = document.querySelector('#comment');
  const list = document.querySelector('.comment-container');

  // Explicit null checks to satisfy the linter
  if (
    form === null ||
    nameField === null ||
    commentField === null ||
    list === null
  ) {
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
