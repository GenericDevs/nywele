// app/layout.jsx

import './globals.css'; // Global Tailwind CSS (if you set it up)
import './dashboard/AdminDashboard.css'; // Your specific dashboard CSS

export const metadata = {
  title: 'Nywele Admin Dashboard',
  description: 'Admin dashboard for product management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}