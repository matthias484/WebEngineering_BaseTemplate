// Functionality for showing/hiding the comments section
export const toggleComments = () => {
  const showHideBtn = document.querySelector(
    '.show-hide'
  ) as HTMLButtonElement | null;
  const commentWrapper = document.querySelector(
    '.comment-wrapper'
  ) as HTMLElement | null;

  // Check if elements exist before attaching event listeners
  if (!showHideBtn || !commentWrapper) {
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
  const form = document.querySelector(
    '.comment-form'
  ) as HTMLFormElement | null;
  const nameField = document.querySelector('#name') as HTMLInputElement | null;
  const commentField = document.querySelector(
    '#comment'
  ) as HTMLTextAreaElement | null;
  const list = document.querySelector(
    '.comment-container'
  ) as HTMLUListElement | null;


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
