# NEON Website

A movie studio website inspired by NEON's design aesthetic, featuring independent films, merchandise, and award-winning content.

## 🎬 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Minimalist black design with subtle accents
- **Interactive Elements**: Hover effects, smooth scrolling, and button animations
- **Movie Showcase**: Featured films, coming soon, and award winners sections
- **Merchandise Store**: Product collections with pre-order functionality
- **Modern Typography**: Clean, readable fonts with perfect spacing
- **Accessibility**: Keyboard navigation and screen reader friendly

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Fork or Download** this repository
2. **Upload files** to your GitHub repository:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
4. **Visit your site** at `https://yourusername.github.io/repository-name`

### Option 2: Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/neon-website.git
   cd neon-website
   ```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```

3. **View the site** at `http://localhost:8000`

## 📁 File Structure

```
neon-website/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styles and responsive design
├── script.js           # JavaScript functionality and interactions
└── README.md           # This documentation
```

## 🎨 Design Features

### Color Palette
- **Primary Background**: `#0a0a0a` (Deep Black)
- **Secondary Background**: `#0f0f0f` (Card Background)
- **Text Primary**: `#ffffff` (White)
- **Text Secondary**: `#888888` (Gray)
- **Text Muted**: `#666666` (Dark Gray)
- **Accent Color**: `rgba(255, 255, 255, 0.1)` (Subtle White)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900
- **Responsive Scaling**: Using `clamp()` for fluid typography

### Layout
- **Max Width**: 1200px container
- **Grid System**: CSS Grid with auto-fit columns
- **Spacing**: Consistent 8px base unit system
- **Border Radius**: Minimal 4px for subtle roundness

## 🔧 Customization

### Adding New Movies

1. **Find the appropriate section** in `index.html`
2. **Copy existing movie card structure**:
   ```html
   <div class="movie-card">
       <div class="movie-poster">
           <div class="poster-placeholder">🎬</div>
       </div>
       <div class="movie-info">
           <div class="movie-status">Now Available</div>
           <div class="movie-title">Your Movie Title</div>
           <div class="movie-year">2025</div>
           <div class="movie-buttons">
               <button class="btn btn-sm btn-primary">Play Trailer</button>
           </div>
       </div>
   </div>
   ```

### Adding New Products

1. **Locate product grid** in `index.html`
2. **Add new product card**:
   ```html
   <div class="product-card">
       <div class="product-image">
           <div class="image-placeholder">👕</div>
       </div>
       <div class="product-info">
           <div class="product-status">Pre-Order Now</div>
           <div class="product-name">Product Name</div>
           <div class="product-price">$XX <span class="product-currency">USD</span></div>
       </div>
   </div>
   ```

### Changing Colors

1. **Open `styles.css`**
2. **Modify the color variables** at the top:
   ```css
   body {
       background-color: #0a0a0a; /* Change background */
       color: #ffffff; /* Change text color */
   }
   ```

### Adding Real Images

1. **Create an `images/` folder**
2. **Replace placeholder content**:
   ```html
   <!-- Instead of -->
   <div class="poster-placeholder">🎬</div>
   
   <!-- Use -->
   <img src="images/movie-poster.jpg" alt="Movie Title">
   ```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 767px and below
- **Small Mobile**: 480px and below

## ⚡ Performance Features

- **Smooth Scrolling**: CSS `scroll-behavior: smooth`
- **Optimized Animations**: Uses `transform` and `opacity` for 60fps
- **Lazy Loading**: Ready for image lazy loading implementation
- **Minimal JavaScript**: Lightweight interactions
- **CSS Grid**: Modern layout without heavy frameworks

## 🎯 Browser Support

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

## 📞 Interactive Features

### Buttons
- **Play Trailer**: Shows loading state and success message
- **Add to Wishlist**: Visual feedback with checkmark
- **Pre-Order**: Cart addition confirmation

### Navigation
- **Smooth Scroll**: Animated scrolling to sections
- **Mobile Menu**: Collapsible navigation for mobile devices
- **Keyboard Navigation**: Full keyboard accessibility

### Animations
- **Fade In**: Elements appear as you scroll
- **Hover Effects**: Subtle interactions on cards and buttons
- **Transform Effects**: Scale and translate animations

## 🔒 SEO & Accessibility

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Alt Text**: Ready for image alt attributes
- **Focus Management**: Visible focus indicators
- **Screen Reader**: Compatible with assistive technologies
- **Meta Tags**: Ready for SEO meta tag implementation

## 🚀 Deployment Options

### GitHub Pages
- Free hosting
- Custom domain support
- Automatic deployment

### Netlify
1. Connect GitHub repository
2. Deploy automatically on push
3. Custom domain and HTTPS included

### Vercel
1. Import GitHub repository
2. Zero-config deployment
3. Built-in performance optimization

### Traditional Hosting
- Upload files via FTP
- Works with any web server
- No build process required

## 🔨 Development

### Local Development Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

### File Watching (Optional)
For live reload during development:
```bash
# Using live-server (npm)
npm install -g live-server
live-server

# Using browser-sync
npm install -g browser-sync
browser-sync start --server --files "*.html, *.css, *.js"
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2.
