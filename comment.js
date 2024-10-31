
function displayComments(showAll = false) {
  const commentList = document.getElementById('commentList');
  commentList.innerHTML = ''; 
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  const initialCount = 5;
  const commentsToShow = showAll ? comments.slice().reverse() : comments.slice(-initialCount).reverse();
  // Display comments
  commentsToShow.forEach(({ avatar, text, timestamp }, index) => {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment-item';
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'avatar';
    avatarDiv.innerHTML = avatar || '<i class="bi bi-person-circle"></i>'; // Default avatar
    const contentDiv = document.createElement('div');
    contentDiv.className = 'comment-content';

    const now = new Date();
    const commentDate = new Date(timestamp);
    const minutes = Math.floor((now - commentDate) / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    let timeAgo;

    if (months > 0) {
      timeAgo = `${months} tháng trước`;
    } else if (weeks > 0) {
      timeAgo = `${weeks} tuần trước`;
    } else if (days > 0) {
      timeAgo = `${days} ngày trước`;
    } else if (hours > 0) {
      timeAgo = `${hours} giờ trước`;
    } else {
      timeAgo = `${minutes} phút trước`;
    }
    
    contentDiv.innerHTML = `${text}<div class="timestamp">${timeAgo}</div>`;
    

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'bi bi-trash3';
    deleteButton.appendChild(deleteIcon);
    deleteButton.addEventListener('click', () => {
      deleteComment(index, showAll);
      commentDiv.remove(); 
    });

    commentDiv.appendChild(avatarDiv);
    commentDiv.appendChild(contentDiv);
    commentDiv.appendChild(deleteButton);

    commentList.insertBefore(commentDiv, commentList.firstChild); // Add comment to the top
  });

  if (comments.length > initialCount && !showAll) {
    const showMoreDiv = document.createElement('div');
    showMoreDiv.className = 'show-more';
    const showMoreButton = document.createElement('button');
    showMoreButton.textContent = 'Xem thêm';
    showMoreButton.addEventListener('click', () => displayComments(true));
    showMoreDiv.appendChild(showMoreButton);
    commentList.appendChild(showMoreDiv);
  }
}

function deleteComment(index, showAll) {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];

  // Calculate the correct index to delete when comments are shown in reverse order
  const commentsCount = comments.length;
  const deleteIndex = showAll ? (commentsCount - 1 - index) : (commentsCount - 10 + index);

  // Remove the comment from the array
  comments.splice(deleteIndex, 1);
  localStorage.setItem('comments', JSON.stringify(comments));
}

displayComments();

function saveComment() {
  const commentInput = document.getElementById('commentInput');
  const comment = commentInput.value.trim();

  if (comment) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push({
      avatar: '<i class="bi bi-person-circle"></i>', 
      text: comment,
      timestamp: new Date().toISOString() 
    });

    localStorage.setItem('comments', JSON.stringify(comments));
    commentInput.value = '';
    displayComments();

    console.log('Comment saved successfully!');
  } else {
    alert('Please write a comment before submitting.');
  }
}

document.getElementById('submitBtn').addEventListener('click', saveComment);
document.getElementById('commentInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); 
    saveComment();
  }
});
