# JPEG to PDF Converter

A beautiful, offline-capable web application to convert JPEG images to PDF with drag-and-drop reordering.

![JPEG to PDF Converter](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌐 Live Demo

**Try it now:** [https://omnikingzeno.github.io/jpeg-to-pdf/](https://omnikingzeno.github.io/jpeg-to-pdf/)

Works on all devices - desktop, tablet, and mobile!

## ✨ Features

- 📁 **Select Multiple JPEGs** - Browse or drag-and-drop images
- 🔄 **Visual Reordering** - Drag images to change order in the PDF
- 📄 **One-Click PDF Generation** - Instantly create downloadable PDFs
- 🌙 **Beautiful Dark Theme** - Modern, professional UI
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🔌 **Works Offline** - No internet connection required (when hosted)
- 🔒 **100% Private** - Your images never leave your device

## 🔒 Privacy

**Your images are completely private.** This app processes everything locally in your browser:

- ✅ **No uploads** - Images are never sent to any server
- ✅ **No tracking** - We don't collect any data about your files
- ✅ **No backend** - 100% client-side processing using JavaScript
- ✅ **No cookies** - No tracking cookies or analytics

The website only serves the static HTML/CSS/JS files. All image processing and PDF generation happens entirely on your device.

## 🚀 Quick Start

### Option 1: Use the Live Demo (Recommended)
Visit [https://omnikingzeno.github.io/jpeg-to-pdf/](https://omnikingzeno.github.io/jpeg-to-pdf/) - works on all devices including smartphones!

### Option 2: Run Locally
Open `index.html` directly in your browser.

> ⚠️ **Note:** Running locally by opening `index.html` only works on **desktop/laptop computers**. Mobile browsers block loading local CSS/JS files for security reasons. For mobile use, please use the live demo link above.

## 📁 Project Structure

```
jpg-to-pdf/
├── index.html          # Main application
├── styles.css          # Styling (dark theme, responsive)
├── app.js              # Application logic
├── jspdf.umd.min.js    # PDF library (bundled for offline use)
└── README.md           # This file
```

## 🎯 How to Use

1. **Open** the app (via live demo or local file)
2. **Select** JPEG images by clicking "Browse Files" or dragging onto the upload zone
3. **Reorder** images by dragging them to your preferred position
4. **Remove** unwanted images by clicking the X button (appears on hover)
5. **Generate** your PDF by clicking "Generate PDF"

## 💻 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 📱 Mobile Support

The application is fully responsive and works on smartphones and tablets:
- Tap "Browse Files" to select photos from your camera roll
- Touch and drag to reorder images
- Tap the X button to remove images

> 📌 **For mobile devices**, please use the [live demo](https://omnikingzeno.github.io/jpeg-to-pdf/) as local HTML files don't work on mobile browsers.

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with CSS Variables, Flexbox, Grid
- **Vanilla JavaScript** - ES6+ with Classes
- **jsPDF** - PDF generation library

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

Made with ❤️ for easy image-to-PDF conversion

