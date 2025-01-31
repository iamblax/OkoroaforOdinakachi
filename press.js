// script.js
const render = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.news-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Show/Hide news items based on category
            newsItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
};

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}

// Render news articles and in their respective categories -- Somtee
(async function fetchPosts() {
    try {
        const response = await fetch('https://art-gallery-zpck.onrender.com/posts');
        const posts = await response.json();
        console.log(posts);

        const postsContainer = document.getElementById('news-grid');
        postsContainer.innerHTML = ''; // Clear existing content

        // Loop through news posts and render them
        await posts.forEach(post => {
            if (post.isNews) {
                postsContainer.innerHTML += `
                    <article class="news-item" data-category="${post.newsCategory}">
                        <img src="${post.postImageLink}">
                        <h3>${post.title}</h3>
                        <p>${post.text}</p>
                    </article>
                `;
                // postsContainer.appendChild(postElement);
            }
        });
        render();
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
