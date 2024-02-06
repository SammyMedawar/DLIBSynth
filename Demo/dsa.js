function processImages() {
    const fileInput = document.getElementById('fileInput');
    const outputImagesDiv = document.getElementById('outputImages');

    const files = fileInput.files;
    if (files.length === 0) {
        alert('Please select at least one image.');
        return;
    }

    const formData = new FormData();
    for (const file of files) {
        formData.append('files', file);
    }

    try {
        const response = fetch('http://127.0.0.1:3003/process_images', {
            method: 'POST',
            body: formData
        });//throws exception directly after

        

        if (response.status !== 200) {
            alert('Error processing images.');
            return;
        }

        const result = response.json();
        // outputImagesDiv.innerHTML = '';

        // for (let i = 0; i < result.imagesWithLandmarks.length; i++) {
        //     const imgElement = document.createElement('img');
        //     imgElement.src = `data:image/png;base64,${result.imagesWithLandmarks[i]}`;
        //     outputImagesDiv.appendChild(imgElement);
        // }
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing images.');
    }
}
