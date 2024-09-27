const apiKey = '4ea8497b199344ca8d63c55758c00742';
const apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey;

const newsContainer = document.getElementById('news-container');
let articles = [];

async function fetchNews() {
    const urlWithTimestamp = apiUrl + '&_=' + new Date().getTime();
    const response = await fetch(urlWithTimestamp);
    const data = await response.json();
    console.log("Fetched articles:", data.articles);
    articles = shuffleArray(data.articles);
    renderNews();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderNews() {
    newsContainer.innerHTML = '';
    if (articles.length > 0) {
        const randomIndex = Math.floor(Math.random() * articles.length);
        const article = articles[randomIndex];
        const articleElement = document.createElement('div');
        articleElement.className = 'news-article';
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <img src="${article.urlToImage}" alt="${article.title}">
        `;
        articleElement.addEventListener('click', () => {
            console.log(`Open article: ${article.title}`);
        });
        newsContainer.appendChild(articleElement);
    } else {
        newsContainer.innerHTML = '<p>No articles available.</p>';
    }
}

function refreshNews() {
    renderNews();
}

fetchNews();

document.getElementById('refresh-button').addEventListener('click', refreshNews);
