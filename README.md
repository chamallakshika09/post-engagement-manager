# Post Engagement Manager

A web application for managing post engagements. This project uses React, TypeScript, Redux, and TailwindCSS to create a responsive and interactive UI for handling posts and their associated settings.

## Features

- View and manage posts
- Edit post settings
- Auto-response settings
- Notifications for success and error messages
- Responsive design with TailwindCSS

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>= 14.0.0)
- npm (>= 6.0.0)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/post-engagement-manager.git
   cd post-engagement-manager
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Running the App

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open the app in your browser:**

   Visit `http://localhost:3000` to see your app in action.

## Building for Production

To build the application for production, run:

```bash
npm run build
```

This will create a `dist` directory with the production build of your application.

The app is available at https://post-engagement-manager-rho.vercel.app/

## Project Structure

```bash
src/
├── assets/     # Static assets like images and icons
├── components/ # Reusable components
├── data/       # Static data
├── hooks/      # Custom hooks
├── layouts/    # Layout components
├── pages/      # Pages
├── store/      # Redux store setup
├── types/      # TypeScript types
├── App.tsx     # Main app component
├── index.css   # Global CSS
├── main.tsx    # Entry point
├── vite-env.d.ts
└── index.html
```

## Usage

Managing Posts

- Navigate to the main page to view all posts.
- Click on a post to edit its settings.
- Use the "Save" button to update the post settings.
  Notifications
- Success and error notifications will be displayed at the bottom right of the screen after actions like saving settings.
- Notifications will disappear after 5 seconds automatically.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add my feature'`)
5. Push to the branch (`git push origin feature/my-feature`)
6. Create a new Pull Request

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux](https://redux.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
