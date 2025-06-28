# Judyann's Portfolio

A modern, responsive portfolio website built with vanilla JavaScript, featuring Supabase integration and Vercel deployment.

## 🚀 Features

- **Modern Design**: Clean, responsive design with smooth animations
- **Contact Form**: Integrated with Supabase for message storage
- **Project Showcase**: Dynamic project loading with filtering
- **Skills Section**: Interactive skills display
- **Mobile Responsive**: Optimized for all device sizes
- **SEO Optimized**: Meta tags and structured data
- **Fast Loading**: Optimized assets and lazy loading
- **Dark Mode Ready**: CSS variables for easy theming

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Supabase (Database & Authentication)
- **Deployment**: Vercel
- **Animations**: AOS (Animate On Scroll)
- **Typing Effect**: Typed.js
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter & Poppins)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Supabase account
- A Vercel account

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Judyann-Portfolio-v2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [Supabase](https://supabase.com/)
2. Go to Settings > API to get your credentials
3. Create the following tables in your Supabase database:

#### Contact Messages Table
```sql
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Projects Table
```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[] NOT NULL,
    image_url VARCHAR(500),
    live_url VARCHAR(500),
    github_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Configure Environment Variables

Update the `js/config.js` file with your Supabase credentials:

```javascript
const SUPABASE_URL = 'your-supabase-url';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key';
```

### 5. Customize Content

Update the following files with your information:
- `index.html`: Personal information, social links
- `js/main.js`: Project data, skills
- `styles/main.css`: Colors, fonts, styling

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
npm run deploy
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables in Vercel

Add your Supabase credentials as environment variables in your Vercel project settings:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## 📁 Project Structure

```
Judyann-Portfolio-v2/
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # Main stylesheet
├── js/
│   ├── config.js          # Configuration file
│   └── main.js            # Main JavaScript file
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## 🎨 Customization

### Colors
Update the CSS variables in `styles/main.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #f59e0b;
    --accent-color: #10b981;
    /* ... other colors */
}
```

### Content
- **Personal Info**: Update the hero section in `index.html`
- **Projects**: Modify the `getDemoProjects()` function in `js/main.js`
- **Skills**: Update the skills section in `index.html`
- **Contact Info**: Update contact details in `index.html`

### Styling
- **Fonts**: Change Google Fonts import in `index.html`
- **Animations**: Modify AOS settings in `js/main.js`
- **Layout**: Adjust grid layouts in `styles/main.css`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to Vercel

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Security

- Supabase Row Level Security (RLS) enabled
- Input validation on contact form
- XSS protection
- CSRF protection via Supabase

## 🚀 Performance

- Optimized images and assets
- Lazy loading for animations
- Minified CSS and JavaScript in production
- CDN for external libraries

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) for the backend
- [Vercel](https://vercel.com/) for hosting
- [AOS](https://michalsnik.github.io/aos/) for animations
- [Typed.js](https://github.com/mattboldt/typed.js/) for typing effects
- [Font Awesome](https://fontawesome.com/) for icons

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact me through the portfolio contact form
- Email: judyann@example.com

---

Made with ❤️ by Judyann 