// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    console.log('Connect social media app initialized');
    
    // Like buttons functionality
    const likeButtons = document.querySelectorAll('.post-actions button:first-child');
    likeButtons.forEach(button => {
        button.addEventListener('click', toggleLike);
    });
    
    // Post button functionality
    const postButton = document.querySelector('.create-post .post');
    if (postButton) {
        postButton.addEventListener('click', createPost);
    }
    
    // Follow buttons
    const followButtons = document.querySelectorAll('.follow-btn');
    followButtons.forEach(button => {
        button.addEventListener('click', toggleFollow);
    });
    
    // More options functionality
    const moreButtons = document.querySelectorAll('.more-options');
    moreButtons.forEach(button => {
        button.addEventListener('click', showOptions);
    });
});

/**
 * Toggle like status on a post
 */
function toggleLike(e) {
    const button = e.currentTarget;
    const icon = button.querySelector('i');
    const likesCount = button.closest('.post-item').querySelector('.post-stats span:first-child');
    const currentCount = parseInt(likesCount.textContent.split(' ')[1]);
    
    if (icon.classList.contains('far')) {
        // Like the post
        icon.classList.remove('far');
        icon.classList.add('fas');
        button.style.color = '#e0245e';
        likesCount.innerHTML = `<i class="fas fa-heart" style="color: #e0245e"></i> ${currentCount + 1}`;
    } else {
        // Unlike the post
        icon.classList.remove('fas');
        icon.classList.add('far');
        button.style.color = '';
        likesCount.innerHTML = `<i class="far fa-heart"></i> ${currentCount - 1}`;
    }
}

/**
 * Create a new post
 */
function createPost() {
    const postInput = document.querySelector('.post-input input');
    const postContent = postInput.value.trim();
    
    if (!postContent) {
        alert('Please write something to post!');
        return;
    }
    
    // Create new post element
    const newPost = document.createElement('div');
    newPost.className = 'post-item';
    
    const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    newPost.innerHTML = `
        <div class="post-header">
            <img src="https://via.placeholder.com/40" alt="Your profile" class="profile-img">
            <div class="post-info">
                <h4>You</h4>
                <span class="timestamp">Just now</span>
            </div>
            <button class="more-options"><i class="fas fa-ellipsis-h"></i></button>
        </div>
        <div class="post-content">
            <p>${postContent}</p>
        </div>
        <div class="post-stats">
            <span><i class="far fa-heart"></i> 0</span>
            <span><i class="far fa-comment"></i> 0</span>
            <span><i class="far fa-share-square"></i> 0</span>
        </div>
        <div class="post-actions">
            <button><i class="far fa-heart"></i> Like</button>
            <button><i class="far fa-comment"></i> Comment</button>
            <button><i class="far fa-share-square"></i> Share</button>
        </div>
    `;
    
    // Add to feed
    const feed = document.querySelector('.feed');
    feed.insertBefore(newPost, feed.firstChild);
    
    // Clear input
    postInput.value = '';
    
    // Add event listeners to new post
    newPost.querySelector('.post-actions button:first-child').addEventListener('click', toggleLike);
    newPost.querySelector('.more-options').addEventListener('click', showOptions);
}

/**
 * Toggle follow status
 */
function toggleFollow(e) {
    const button = e.currentTarget;
    
    if (button.textContent === 'Follow') {
        button.textContent = 'Following';
        button.style.backgroundColor = '#1da1f2';
        button.style.color = 'white';
    } else {
        button.textContent = 'Follow';
        button.style.backgroundColor = '';
        button.style.color = '';
    }
}

/**
 * Show post options menu
 */
function showOptions(e) {
    // In a real app, this would show a dropdown menu
    // For this demo, we'll just show an alert
    alert('Options: Save, Report, Hide');
}

/**
 * Add dummy data - for demo purposes
 * In a real app, this would come from an API
 */
function addDummyData() {
    // This function could be used to add more content
    // or simulate loading more posts when scrolling
    console.log('Adding dummy data would happen here in a real app');
}