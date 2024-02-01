fetchSources();
var currentCountry = 'tr';

function generateCountryOptions() {
    const dropdownContent = document.getElementById("dropdownContent");

    Object.keys(countryCodes).forEach(code => {
        const countryName = countryCodes[code];
        const flagUrl = `https://newsapi.org/images/flags/${code}.svg`; // Bayrak URL'si

        const optionElement = document.createElement("a");
        optionElement.href = "#";
        optionElement.innerHTML = `<img src="${flagUrl}" alt="${countryName} Flag" class="flag"> ${countryName}`;
        optionElement.onclick = function () {
            changeCountry(code);
        };

        dropdownContent.appendChild(optionElement);
    });
}


document.getElementById("custom-source-select").addEventListener("change", function () {
    var selectedSource = this.value;
    fetchCustomNews(selectedSource);
});

function fetchCustomNews(domain) {
    if (!domain) {
      //varsayılan haberleri yükle
        fetchNews(); 
        return;
    }

    var url = 'https://newsapi.org/v2/everything?' +
        'domains=' + domain +
        '&apiKey=e5b4e43116e74e94a6ad6635a588a115';


    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Haberleri sayfada göster
            displayNews(data.articles);
        })
        .catch(function (error) {
            console.error("Haberler alınırken hata:", error);
        });
}

function displayNews(articles) {
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = ""; 

    articles.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");
        newsItem.innerHTML = `
    <h2>${article.title}</h2>
    <p>${article.author}</p>
    <p>Published at: ${new Date(article.publishedAt).toLocaleString()}</p>
    <a href="${article.url}" target="_blank">Haberi Oku</a>
`;
        newsList.appendChild(newsItem);
    });
}
function fetchSources() {
    var url = 'https://newsapi.org/v2/sources?apiKey=e5b4e43116e74e94a6ad6635a588a115';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.sources) {
                const sourceSelect = document.getElementById("source-select");
                data.sources.forEach(source => {
                    const option = document.createElement("option");
                    option.value = source.id;
                    option.textContent = source.name;
                    sourceSelect.appendChild(option);
                });
            }
        });
}

// Haberleri filtreleme
function filterNews() {
    console.log("filter news");
    const source = document.getElementById("source-select").value;
    const date = document.getElementById("date-select").value;
    fetchNews(source, '', date);
}


function changeCountry(country) {
    currentCountry = country;
    const selectedCountryElement = document.getElementById('selectedCountry');
    selectedCountryElement.innerHTML = `<img src="https://newsapi.org/images/flags/${country}.svg" alt="${countryCodes[country]} Flag" class="flag"> ${countryCodes[country]}`;
    fetchNews();
}


function searchNews() {
    const searchTerm = document.getElementById("search-input").value;
    if (!searchTerm) {
        alert("Lütfen bir arama terimi girin.");
        return;
    }

    var url = 'https://newsapi.org/v2/everything?' +
        'q=' + encodeURIComponent(searchTerm) +
        '&apiKey=e5b4e43116e74e94a6ad6635a588a115';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
        })
        .catch(error => {
            console.error("Haberler alınırken hata:", error);
            const newsList = document.getElementById("news-list");
            newsList.innerHTML = "<p>Haberler alınırken hata meydana geldi.</p>";
        });
}




function fetchNews(source = '', country = currentCountry, date = '') {
    let url;
    if (date) {
        console.log("date");
        url = 'https://newsapi.org/v2/everything?';
        url += 'q=türkiye'; 
        url += '&from=' + date + '&to=' + date;
        url += '&sortBy=popularity';
        console.log("url=" + url);

    } else {
        url = 'https://newsapi.org/v2/top-headlines?';
        url += 'country=' + country;
        if (source) {
            url += '&sources=' + source;
        }
    }

    url += '&apiKey=e5b4e43116e74e94a6ad6635a588a115';
    var req = new Request(url);

    fetch(req)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const newsList = document.getElementById("news-list");
            const countryTitle = document.getElementById("country-title");
            countryTitle.innerText = 'En Önemli Haberler - ' + countryCodes[currentCountry];

            if (data.articles && data.articles.length > 0) {
                newsList.innerHTML = "";
                data.articles.forEach(article => {
                    const newsItem = document.createElement("div");
                    newsItem.classList.add("news-item");
                    newsItem.innerHTML = `
                    <h2>${article.title}</h2>
                    <p>${article.author}</p>
                    <p>Published at: ${new Date(article.publishedAt).toLocaleString()}</p>

                    
                    <a href="${article.url}" target="_blank">Haberi Oku</a>
                `;
                    newsList.appendChild(newsItem);
                });
            } else {
                newsList.innerHTML = "<p>Yeni haber başlıkları bulunamadı.</p>";
            }
        })
        .catch(function (error) {
            console.error("Haberler alınırken hata:", error);
            const newsList = document.getElementById("news-list");
            newsList.innerHTML = "<p>Haberler alınırken hata meydana geldi.</p>";
        });


    fetch(req)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.articles && data.articles.length > 0) {
            }
        })
        .catch(function (error) {
            console.error("Haberler alınırken hata:", error);
        });

}
document.getElementById("source-select").addEventListener("change", filterNews);
document.getElementById("search-button").addEventListener("click", searchNews);
document.getElementById("date-select").addEventListener("change", filterNews);
generateCountryOptions();
fetchNews();
fetchSources();
