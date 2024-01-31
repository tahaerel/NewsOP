// Dosya yükleme işlemi tamamlandığında tetiklenen event listener
document.getElementById('imageInput').addEventListener('change', (event) => {
    const imageInput = event.target;
    const resultContainer = document.querySelector('.result-container');
    const resultImage = document.getElementById('resultImage');
    const errorContainer = document.getElementById('errorContainer');

    errorContainer.style.display = 'none';
    if (imageInput.files.length > 0) {
        const selectedImage = imageInput.files[0];
        
        const imageUrl = URL.createObjectURL(selectedImage);
        resultImage.src = imageUrl;
        resultContainer.style.display = 'block';

    }
});


document.getElementById('uploadButton').addEventListener('click', async () => {
    const imageInput = document.getElementById('imageInput');
    if (imageInput.files.length === 0) {
        alert('Lütfen bir dosya seçin.');
        return;
    }

    const data = new FormData();
    data.append('image', imageInput.files[0]);

    const options = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': 'd911d19819msh2739a40f00946dap185df6jsn00e173af1619',
            'X-RapidAPI-Host': 'face-and-plate-blurer.p.rapidapi.com'
        },
        body: data
    };

    try {
        const response = await fetch('https://face-and-plate-blurer.p.rapidapi.com/img-anonymization/v1/results', options);
        if (!response.ok) {
            throw new Error('API isteği başarısız oldu: ' + response.statusText);
        }
        const result = await response.json();
        console.log(result);

        if (result.results && result.results.length > 0) {
            const entities = result.results[0].entities;
            if (entities && entities.length > 0) {
                const processedImage = entities.find(entity => entity.kind === 'image');
                if (processedImage && processedImage.image) {
                    const resultImage = document.getElementById('resultImage');
                    const downloadButton = document.getElementById('downloadButton');

                    resultImage.src = 'data:image/png;base64,' + processedImage.image;
                    downloadButton.href = 'data:image/png;base64,' + processedImage.image;
                    downloadButton.style.display = 'block';
                } else {
                    throw new Error('İşlenmiş görsel bulunamadı.');
                }
            } else {
                throw new Error('Görsel öğeleri bulunamadı.');
            }
        } else {
            throw new Error('Sonuç bulunamadı.');
        }
    } catch (error) {
        console.error(error);
        displayError('Bir hata oluştu: ' + error.message);
        //alert('Bir hata oluştu: ' + error.message);
    }
});


async function enhanceImage() {
    const resultImage = document.getElementById('resultImage');
    
    if (!resultImage.src) {
        alert('Lütfen önce bir görsel yükleyin ve blurla butonuna basın.');
        return;
    }

    const imageBlob = await fetch(resultImage.src).then(res => res.blob());

    const url = 'https://ai-picture-upscaler.p.rapidapi.com/supersize-image';
    const data = new FormData();
    data.append('image', imageBlob);
    data.append('sizeFactor', '4');
    data.append('imageStyle', 'realistic');
    data.append('noiseCancellationFactor', '0');

    const options = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': 'd911d19819msh2739a40f00946dap185df6jsn00e173af1619',
            'X-RapidAPI-Host': 'ai-picture-upscaler.p.rapidapi.com'
        },
        body: data
    };

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error('API isteği başarısız oldu: ' + response.statusText);
        }

        const enhancedImageBlob = await response.blob();
        const enhancedImageUrl = URL.createObjectURL(enhancedImageBlob);

        resultImage.src = enhancedImageUrl;

        const downloadButton = document.getElementById('downloadButton');
        downloadButton.href = enhancedImageUrl;
        downloadButton.style.display = 'block';
        



    } catch (error) {
        console.error(error);
        //alert('Bir hata oluştu: ' + error.message);
        displayError('Bir hata oluştu: ' + error.message);

    }
}

function displayError(message) {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = `<p>${message}</p>`; 
    errorContainer.style.display = 'block';
}

document.getElementById('enhanceButton').addEventListener('click', enhanceImage);
