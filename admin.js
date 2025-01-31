// admin-script.js
document.addEventListener("DOMContentLoaded", () => {
    const newsForm = document.getElementById("newsForm");
    const articlesList = document.getElementById("articlesList");
    let articles = JSON.parse(localStorage.getItem("articles")) || [];

    // Save Article
    newsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("newsId").value;
        const title = document.getElementById("title").value;
        const links = document.getElementById("links").value;
        const category = document.getElementById("category").value;
        const content = document.getElementById("content").value;

        if (id) {
            // Edit existing article
            const index = articles.findIndex((article) => article.id === id);
            articles[index] = { id, title, links, category, content };
        } else {
            // Add new article
            articles.push({
                id: Date.now().toString(),
                title,
                links,
                category,
                content,

            });
        }

        localStorage.setItem("articles", JSON.stringify(articles));
        resetForm();
        renderArticles();
    });

    // Reset Form
    function resetForm() {
        document.getElementById("newsId").value = "";
        // newsForm.reset(); //commented out in order to allow reading values directly from the form elements.
    }

    // Render Articles
    function renderArticles() {
        const isNews = document.getElementById('isNews').checked;
        articlesList.innerHTML = "";
        articles.forEach((article) => {
            const articleEl = document.createElement("div");
            articleEl.classList.add("article-item");
            articleEl.innerHTML = `
              
                <h3>${article.title}</h3>
                <p><strong>Category:</strong>${ isNews ? article.category : "Exhibition"}</p>
                <p>${ isNews ? article.content: ""}</p>
                <a href="${article.links}">${ isNews ? article.links : ""}</a>
                <div class="upload-block">
                    <div class="prev-btns">
                        <button class="edit-preview" onclick="editArticle('${article.id}')">Edit</button>
                        <button class="delete-preview" onclick="deleteArticle('${article.id}')">Delete</button>
                    </div>
                    <div class="upload-btn-wrapper">
                        <div id="save-post-btn" onclick="savePost()" class="upload-preview">
                            Upload
                        </div>
                    </div>
                </div>
                
            `;
            articlesList.innerHTML = "";
            articlesList.appendChild(articleEl);
        });
    }

    // Edit Article
    window.editArticle = (id) => {
        const article = articles.find((a) => a.id === id);
        document.getElementById("newsId").value = article.id;
        document.getElementById("title").value = article.title;
        document.getElementById("links").value = article.links;
        document.getElementById("category").value = article.category;
        document.getElementById("content").value = article.content;
    };

    // Delete Article
    window.deleteArticle = (id) => {
        articles = articles.filter((article) => article.id !== id);
        localStorage.setItem("articles", JSON.stringify(articles));
        renderArticles();
    };

    // Initial render
    renderArticles();
});

// script.js
document.addEventListener("DOMContentLoaded", () => {
    const loginOverlay = document.getElementById("loginOverlay");
    const loginForm = document.getElementById("loginForm");
    const adminPassword = document.getElementById("adminPassword");
    const errorMessage = document.getElementById("errorMessage");

    // Correct admin password
    const correctPassword = "admin123";

    // Form submit handler
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Check if the password is correct
        if (adminPassword.value === correctPassword) {
            // Hide the overlay and display the admin panel
            loginOverlay.style.display = "none";
            document.querySelector("header").style.display = "block";
            document.querySelector("main").style.display = "block";
            document.querySelector("footer").style.display = "block";
        } else {
            // Show error message
            errorMessage.textContent = "Incorrect password. Please try again. if your not an admin kindly navigate back to the homepage";
            errorMessage.style.display = "block";
        }
    });
});
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}


// Upload Logic ---Somtee 

async function savePost() {
    const upload_btn = document.getElementById("save-post-btn");
    const postId = Math.random().toString(36).substring(2, 11); //generate a random id
    const title = document.getElementById('title').value;
    const links = document.getElementById('links').value;
    const isExhibition = document.getElementById('isExhibition').checked;
    const isNews = document.getElementById('isNews').checked;
    const newsCategory = document.getElementById('category').value;    
    const text = document.getElementById('content').value;

    // Handle file upload
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image!");
        return;
    }

    if (!isExhibition && !isNews) {
        alert("Please select post category (News or Exhibit)");
        return;
    }

    //uncomment feature if needed -- Somtee 
    // if (isNews) {
    //     if (!newsCategory || !text) {
    //         alert("Fill in blank fields")
    //         return;
    //     }
    // }

    upload_btn.innerHTML = `<span class="loader"></span> Uploading`;

    const postImageLink = await upload_to_image_cloudinary();

    // Build the post data
    const postData = {
        postId: postId,
        postImageLink: postImageLink,
        title: title,
        text: text,
        links: links,
        isExhibition: isExhibition,
        isNews: isNews,
        newsCategory: newsCategory,
        yearPosted: new Date().getFullYear(),
    };

    // Send the data to your backend
    try {
        const response = await fetch('https://art-gallery-zpck.onrender.com/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Post saved successfully!', responseData);
            alert('Post saved successfully!');
        } else {
            console.error('Error saving post:', response.statusText);
            alert('Failed to save the post.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving the post.');
    }
    upload_btn.innerHTML = "Upload";
};



async function upload_to_image_cloudinary() {
    const cloudName = "diqs704rk";
    const uploadPreset = 'ml_default';

    const fileInput = document.getElementById('fileInput');

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
        // Upload to Cloudinary
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log('Upload Result:', data);

        // Display uploaded image
        const uploadedImageUrl = data.secure_url;
        return uploadedImageUrl;

    } catch (error) {
        console.error('Error uploading file:', error);
    }
    return error;
}

// Display news category input group if id::isNews is checked 

function displayNewsCategory() {
    const categories = document.querySelectorAll('.categoryGroup');
    const isNews = document.getElementById('isNews').checked;
    categories.forEach(category => {
        if (isNews) {
            category.style.display = "block";
        } else {
            category.style.display = "none";
        }
    });
}

document.getElementById('isNews').addEventListener('change', displayNewsCategory);


function toggleMenu() {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
}
