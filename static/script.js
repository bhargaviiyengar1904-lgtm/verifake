document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const changeImageBtn = document.getElementById('changeImageBtn');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const loadingSection = document.getElementById('loadingSection');
    const resultsSection = document.getElementById('resultsSection');
    const resetBtn = document.getElementById('resetBtn');
    let selectedFile;

    // Drag and drop event handlers
    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const highlight = () => dropZone.classList.add('highlight');
    const unhighlight = () => dropZone.classList.remove('highlight');

    dropZone.addEventListener('dragenter', highlight);
    dropZone.addEventListener('dragover', highlight);
    dropZone.addEventListener('dragleave', unhighlight);
    dropZone.addEventListener('drop', (e) => {
        unhighlight();
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    });

    // Click handler for browse button
    browseBtn.addEventListener('click', () => fileInput.click());

    // File input change event handler
    fileInput.addEventListener('change', () => {
        handleFiles(fileInput.files);
    });

    // Change image button and reset button handlers
    changeImageBtn.addEventListener('click', resetUI);
    resetBtn.addEventListener('click', resetUI);

    // Function to handle files
    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            const validTypes = ['image/jpeg', 'image/png'];
            if (validTypes.includes(file.type)) {
                selectedFile = file;
                const reader = new FileReader();
                reader.onload = () => {
                    imagePreview.src = reader.result;
                    previewContainer.style.display = 'block';
                    dropZone.style.display = 'none';
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please upload a valid image file.');
            }
        }
    }

    // Analyze button click handler
    analyzeBtn.addEventListener('click', async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            loadingSection.style.display = 'block';
            resultsSection.style.display = 'none';
            try {
                const response = await fetch('/detect', {
                    method: 'POST',
                    body: formData,
                });
                const result = await response.json();
                displayResults(result);
            } catch (error) {
                console.error('Error during analysis:', error);
                alert('Error analyzing the image. Please try again.');
            }
        }
    });

    // Function to display results
    function displayResults(result) {
        loadingSection.style.display = 'none';
        resultsSection.style.display = 'block';
        const progressCircle = document.getElementById('progressCircle');
        // Animate loading section
        // ... (Circular progress animation logic goes here)
        // Animate confidence value
        // ... (Confidence value animation logic goes here)
        // Set badge and text based on result
        const isFake = result.is_fake;
        const badge = document.getElementById('resultBadge');
        badge.textContent = isFake ? 'FAKE' : 'REAL';
        badge.className = isFake ? 'badge-fake' : 'badge-real';

        // Populate detailed metrics
        const details = result.all_results; // Assuming all_results is in the response
        // Update the UI with details
    }

    // Function to animate value
    function animateValue(id, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            document.getElementById(id).textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }

    // Function to reset UI
    function resetUI() {
        selectedFile = null;
        previewContainer.style.display = 'none';
        dropZone.style.display = 'block';
        loadingSection.style.display = 'none';
        resultsSection.style.display = 'none';
        // Reset other UI elements as needed
    }
});