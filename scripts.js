const fileInput = document.getElementById('fileInput');
        const compressButton = document.getElementById('compressButton');
        const decompressButton = document.getElementById('decompressButton');
        const outputDiv = document.getElementById('output');

        compressButton.onclick = async () => {
            const file = fileInput.files[0];
            if (!file) {
                outputDiv.innerText = 'Please select a file to compress.';
                return;
            }

            const zip = new JSZip();
            zip.file(file.name, file);

            const content = await zip.generateAsync({ type: "blob" });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = "compressed_file.zip";
            link.click();

            outputDiv.innerText = 'File compressed into ZIP successfully!';
        };

        decompressButton.onclick = async () => {
            const file = fileInput.files[0];
            if (!file) {
                outputDiv.innerText = 'Please select a ZIP file to decompress.';
                return;
            }

            const zip = new JSZip();
            const content = await file.arrayBuffer();
            const unzipped = await zip.loadAsync(content);

            outputDiv.innerHTML = '';

            Object.keys(unzipped.files).forEach(async (fileName) => {
                const fileData = await unzipped.files[fileName].async('blob');

                const link = document.createElement('a');
                link.href = URL.createObjectURL(fileData);
                link.download = fileName;
                link.innerText = `Download ${fileName}`;
                link.className = "btn btn-success mt-2 me-2";

                outputDiv.appendChild(link);
            });
        }
