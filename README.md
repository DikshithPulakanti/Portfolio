# Dikshith Pulakanti - Portfolio

A modern, interactive portfolio website showcasing my work, experience, and skills in Machine Learning, Deep Learning, and Full-Stack Development.

## Features

- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Built with React and Vite for optimal speed
- 🎭 **Interactive Elements** - Smooth scroll animations, hover effects, and modal dialogs
- 🎯 **Sections Included**:
  - Hero section with introduction
  - About me section
  - Education timeline
  - Work experience
  - Interactive projects showcase
  - Technical skills display
  - Contact information

## Technologies Used

- React 18
- Vite
- Framer Motion (animations)
- React Icons
- CSS3 (custom styling)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Hero.jsx            # Hero/landing section
│   │   ├── About.jsx           # About me section
│   │   ├── Education.jsx       # Education timeline
│   │   ├── Experience.jsx      # Work experience
│   │   ├── Projects.jsx        # Projects showcase
│   │   ├── Skills.jsx          # Technical skills
│   │   └── Contact.jsx         # Contact information
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App styles
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Customization

You can easily customize the portfolio by editing the component files in `src/components/`. Each component contains the relevant information that can be updated:

- **Hero.jsx** - Update name, title, and description
- **About.jsx** - Modify the about section content
- **Education.jsx** - Update education details
- **Experience.jsx** - Modify work experience
- **Projects.jsx** - Add or update projects
- **Skills.jsx** - Update technical skills
- **Contact.jsx** - Update contact information

## Color Scheme

The portfolio uses a modern color scheme that can be customized in `src/index.css`:

- Primary Color: `#6366f1` (Indigo)
- Secondary Color: `#8b5cf6` (Purple)
- Text Colors: Various shades of slate gray

## Deployment

You can deploy this portfolio to various platforms:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder after building
- **GitHub Pages**: Use the `gh-pages` package
- **AWS S3**: Upload the `dist` folder to an S3 bucket

## License

This project is open source and available for personal use.

## Contact

- Email: pulakanti.d@northeastern.edu
- LinkedIn: [dikshithpulakanti](https://www.linkedin.com/in/dikshithpulakanti/)
- Phone: (617) 594-2757
