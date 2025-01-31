// RENDERING IMAGES & INFO FROM MONGODB -- SOMTEE
// Will render on DOM-load 
let exhibitionPostCounter = 0;
(async function fetchPosts() {
    try {
        const response = await fetch('https://art-gallery-zpck.onrender.com/posts');
        const posts = await response.json();
        console.log(posts);

        const postsContainer = document.getElementById('rendered-gallery');
        postsContainer.innerHTML = ''; // Clear existing content

        // Loop through posts and render them
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            if (post.isExhibition) {
                postElement.innerHTML = `
                    <div class="gallery-item" id="${post.postId}">
                        <img src="${post.postImageLink}" alt="${post.title}</" loading="lazy">
                        <div class="overlay">
                            <p style="font-size: 100%;">${post.title}</p>
                            <br />
                            <p>(${post.yearPosted})</p>
                            <button class="view-btn" onclick="openModal(${exhibitionPostCounter})">View</button>
                        </div>
                    </div>
                `;
                postsContainer.appendChild(postElement);
                exhibitionPostCounter ++;
            }
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
})()
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
}
