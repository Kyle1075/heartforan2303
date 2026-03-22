# Heart Animation React Project

An interactive React web application featuring a charming landing page and a stunning 3D heart particle animation.

## Features

### Landing Page
- "Do you love me?" interactive prompt
- **Yes Button**: Navigates to the heart animation
- **No Button**: Evades to random positions when hovered or clicked
- Beautiful gradient background with smooth animations
- Fully responsive design

### Heart Animation Page
- 3D particle-based heart using Three.js
- Auto-rotating scene with interactive orbit controls
- Smooth particle animations powered by GSAP
- Back button to return to landing page

## Project Structure

```
src/
├── index.js                 # Entry point
├── index.css                # Global styles
├── App.js                   # Main app with routing
└── pages/
    ├── LandingPage.js       # Landing page component
    ├── LandingPage.css      # Landing page styles
    ├── HeartAnimation.js    # Heart animation component
    └── HeartAnimation.css   # Heart animation styles
public/
└── index.html               # HTML template
```

## Installation

1. Navigate to the project directory:
   ```bash
   cd Heart
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Project

Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Technologies Used

- **React 18**: UI library
- **React Router DOM**: Client-side routing
- **Three.js**: 3D graphics
- **GSAP**: Animation library
- **CSS3**: Styling and animations

## Browser Support

Works on all modern browsers that support:
- ES6+
- WebGL
- CSS3 animations

## License

Built with ❤️
