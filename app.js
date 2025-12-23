// JPEG to PDF Converter Application
// Handles file upload, drag-and-drop reordering, and PDF generation

class JPEGToPDFConverter {
    constructor() {
        this.images = [];
        this.draggedItem = null;
        this.draggedOverItem = null;

        // DOM Elements
        this.uploadZone = document.getElementById('uploadZone');
        this.fileInput = document.getElementById('fileInput');
        this.browseBtn = document.getElementById('browseBtn');
        this.uploadSection = document.getElementById('uploadSection');
        this.previewSection = document.getElementById('previewSection');
        this.imagesGrid = document.getElementById('imagesGrid');
        this.imageCount = document.getElementById('imageCount');

        this.reverseOrderBtn = document.getElementById('reverseOrderBtn');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        this.generatePdfBtn = document.getElementById('generatePdfBtn');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.successModal = document.getElementById('successModal');
        this.closeModalBtn = document.getElementById('closeModalBtn');

        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Upload zone events
        this.uploadZone.addEventListener('click', () => this.fileInput.click());
        this.browseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.fileInput.click();
        });

        // File input change
        this.fileInput.addEventListener('change', (e) => this.handleFiles(e.target.files));

        // Drag and drop on upload zone
        this.uploadZone.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadZone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadZone.addEventListener('drop', (e) => this.handleDrop(e));

        // Action buttons
        this.reverseOrderBtn.addEventListener('click', () => this.reverseOrder());
        this.clearAllBtn.addEventListener('click', () => this.clearAll());
        this.generatePdfBtn.addEventListener('click', () => this.generatePDF());
        this.closeModalBtn.addEventListener('click', () => this.hideModal());
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadZone.classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadZone.classList.remove('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadZone.classList.remove('drag-over');

        const files = e.dataTransfer.files;
        this.handleFiles(files);
    }

    async handleFiles(files) {
        const validFiles = Array.from(files).filter(file =>
            file.type === 'image/jpeg' || file.type === 'image/jpg'
        );

        if (validFiles.length === 0) {
            alert('Please select valid JPEG files only.');
            return;
        }

        for (const file of validFiles) {
            const imageData = await this.readFileAsDataURL(file);
            this.images.push({
                id: Date.now() + Math.random(),
                name: file.name,
                data: imageData,
                file: file
            });
        }

        this.renderImages();
        this.showPreviewSection();

        // Reset file input for re-selection
        this.fileInput.value = '';
    }

    readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    showPreviewSection() {
        if (this.images.length > 0) {
            this.previewSection.classList.remove('hidden');
        }
    }

    renderImages() {
        this.imagesGrid.innerHTML = '';

        this.images.forEach((image, index) => {
            const card = this.createImageCard(image, index);
            this.imagesGrid.appendChild(card);
        });

        this.updateImageCount();
    }

    createImageCard(image, index) {
        const card = document.createElement('div');
        card.className = 'image-card';
        card.draggable = true;
        card.dataset.index = index;
        card.dataset.id = image.id;

        card.innerHTML = `
            <img src="${image.data}" alt="${image.name}">
            <span class="image-order">${index + 1}</span>
            <button class="remove-btn" title="Remove image">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
            <div class="image-overlay">
                <span class="image-name">${image.name}</span>
            </div>
        `;

        // Remove button event - prevent drag interference
        const removeBtn = card.querySelector('.remove-btn');
        removeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.removeImage(image.id);
        });

        // Prevent drag from starting when clicking remove button
        removeBtn.addEventListener('mousedown', (e) => {
            e.stopPropagation();
        });

        // Drag events for reordering
        card.addEventListener('dragstart', (e) => this.handleImageDragStart(e, index));
        card.addEventListener('dragend', (e) => this.handleImageDragEnd(e));
        card.addEventListener('dragover', (e) => this.handleImageDragOver(e, index));
        card.addEventListener('dragleave', (e) => this.handleImageDragLeave(e));
        card.addEventListener('drop', (e) => this.handleImageDrop(e, index));

        return card;
    }

    handleImageDragStart(e, index) {
        this.draggedItem = index;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', index);
    }

    handleImageDragEnd(e) {
        e.target.classList.remove('dragging');
        this.draggedItem = null;

        // Remove drag-over class from all cards
        document.querySelectorAll('.image-card').forEach(card => {
            card.classList.remove('drag-over');
        });
    }

    handleImageDragOver(e, index) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        if (this.draggedItem !== index) {
            e.currentTarget.classList.add('drag-over');
        }
    }

    handleImageDragLeave(e) {
        e.currentTarget.classList.remove('drag-over');
    }

    handleImageDrop(e, targetIndex) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');

        if (this.draggedItem === null || this.draggedItem === targetIndex) {
            return;
        }

        // Reorder images array
        const draggedImage = this.images[this.draggedItem];
        this.images.splice(this.draggedItem, 1);
        this.images.splice(targetIndex, 0, draggedImage);

        // Re-render
        this.renderImages();
    }

    removeImage(id) {
        this.images = this.images.filter(img => img.id !== id);
        this.renderImages();

        if (this.images.length === 0) {
            this.previewSection.classList.add('hidden');
        }
    }

    reverseOrder() {
        this.images.reverse();
        this.renderImages();
    }

    clearAll() {
        if (confirm('Are you sure you want to remove all images?')) {
            this.images = [];
            this.renderImages();
            this.previewSection.classList.add('hidden');
        }
    }

    updateImageCount() {
        const count = this.images.length;
        this.imageCount.textContent = `${count} image${count !== 1 ? 's' : ''}`;
    }

    async generatePDF() {
        if (this.images.length === 0) {
            alert('Please add at least one image.');
            return;
        }

        this.showLoading();

        try {
            // Wait for jsPDF to be available
            const { jsPDF } = window.jspdf;

            // Create PDF
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 10;
            const maxWidth = pageWidth - (margin * 2);
            const maxHeight = pageHeight - (margin * 2);

            for (let i = 0; i < this.images.length; i++) {
                if (i > 0) {
                    pdf.addPage();
                }

                const image = this.images[i];
                const dimensions = await this.getImageDimensions(image.data);

                // Calculate scaling to fit page while maintaining aspect ratio
                let imgWidth = dimensions.width;
                let imgHeight = dimensions.height;

                const widthRatio = maxWidth / imgWidth;
                const heightRatio = maxHeight / imgHeight;
                const ratio = Math.min(widthRatio, heightRatio);

                imgWidth = imgWidth * ratio;
                imgHeight = imgHeight * ratio;

                // Center the image on the page
                const x = (pageWidth - imgWidth) / 2;
                const y = (pageHeight - imgHeight) / 2;

                pdf.addImage(image.data, 'JPEG', x, y, imgWidth, imgHeight);
            }

            // Generate filename with timestamp
            const timestamp = new Date().toISOString().slice(0, 10);
            const filename = `images-${timestamp}.pdf`;

            pdf.save(filename);

            this.hideLoading();
            this.showSuccessModal();

        } catch (error) {
            console.error('Error generating PDF:', error);
            this.hideLoading();
            alert('Error generating PDF. Please try again.');
        }
    }

    getImageDimensions(dataUrl) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve({
                    width: img.width,
                    height: img.height
                });
            };
            img.src = dataUrl;
        });
    }

    showLoading() {
        this.loadingOverlay.classList.remove('hidden');
    }

    hideLoading() {
        this.loadingOverlay.classList.add('hidden');
    }

    showSuccessModal() {
        this.successModal.classList.remove('hidden');
    }

    hideModal() {
        this.successModal.classList.add('hidden');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new JPEGToPDFConverter();
});
