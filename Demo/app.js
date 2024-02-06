$(document).ready(function () {
    $("button").on("click", function (e) {
        e.preventDefault();
        processImages();
    });

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
        //url: 'http://127.0.0.1:3003/process_images',
        try {
            $.ajax({
                url: 'http://10.0.6.11:3003/process_images',
                method: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                timeout: 100000,
                success: function (result) {
                    const outputImagesDiv = $('#outputImagesDiv');
                    outputImagesDiv.html('');

                    for (let i = 0; i < result.length; i++) {
                        const face = result[i];

                        const imgElement = $('<img>');
                        imgElement.attr('src', `data:image/png;base64,${face.imageWithLandmarks}`);
                        
                        const parentDiv = $('<div>');
                        parentDiv.append(imgElement);

                        const coordinates = face.landmarksCoordinates;
                        const table = $('<table>');
                        const tableBody = $('<tbody>');

                        for (let j = 0; j < coordinates.length; j++) {
                            const coordinateTuple = coordinates[j];
                            const row = $('<tr>');
                            row.append($('<td>').text(`Landmark ${j + 1}`));
                            row.append($('<td>').text(`(${coordinateTuple[0]}, ${coordinateTuple[1]})`));
                            tableBody.append(row);
                        }

                        table.append(tableBody);
                        parentDiv.append(table);

                        // Add some simple styling to the table
                        table.css({
                            'border-collapse': 'collapse',
                            'width': '100%',
                            'margin-top': '10px',
                            'border': '1px solid #ddd',
                            'text-align': 'left',
                        });
                        table.find('td, th').css({
                            'border': '1px solid #ddd',
                            'padding': '8px',
                        });

                        outputImagesDiv.append(parentDiv);
                    }
                },
                error: function (error) {
                    console.error('Error:', error);
                    alert('An error occurred while processing images.');
                },
                complete: function () {
                    console.log("test");
                }
            });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing images.');
        }
    }
});
