# 🛍️ Stryde - Modern E-Commerce Platform

[![Laravel](https://img.shields.io/badge/Laravel-11.x-red.svg)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com)

Stryde is a modern, full-stack e-commerce platform built with Laravel 11, React 18, and TypeScript. It features a responsive design, real-time cart management, secure payment processing, and comprehensive admin dashboard.

## ✨ Features

### 🛒 Customer Features

-   **Product Catalog**: Browse products with categories and detailed information
-   **Shopping Cart**: Real-time cart management with quantity updates
-   **User Authentication**: Secure login with Google and GitHub OAuth
-   **Checkout Process**: Streamlined checkout with payment integration
-   **Order Management**: Track orders and view invoices
-   **Responsive Design**: Mobile-first design with Tailwind CSS

### 🔧 Admin Features

-   **Product Management**: Add, edit, and delete products with images
-   **Category Management**: Organize products with categories
-   **Order Dashboard**: Monitor and manage customer orders
-   **User Management**: Admin panel for user administration
-   **Analytics**: Sales and performance insights

### 🛠️ Technical Features

-   **Modern Stack**: Laravel 11 + React 18 + TypeScript
-   **Real-time Updates**: Live cart and order status updates
-   **Payment Integration**: Midtrans payment gateway
-   **File Upload**: Product image management
-   **API Integration**: External APIs for enhanced functionality
-   **Docker Support**: Containerized development environment

## 🚀 Tech Stack

### Backend

-   **Laravel 11** - PHP framework
-   **MySQL 8.0** - Database
-   **Redis** - Caching and sessions
-   **Laravel Sanctum** - API authentication
-   **Laravel Socialite** - OAuth authentication
-   **Midtrans** - Payment gateway

### Frontend

-   **React 18** - UI framework
-   **TypeScript** - Type safety
-   **Inertia.js** - SPA-like experience
-   **Tailwind CSS** - Styling
-   **Framer Motion** - Animations
-   **Radix UI** - Accessible components
-   **Lucide React** - Icons

### Development Tools

-   **Vite** - Build tool
-   **Docker** - Containerization
-   **Laravel Pint** - Code formatting
-   **PHPUnit** - Testing

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

-   **PHP 8.2+**
-   **Composer**
-   **Node.js 18+**
-   **npm** or **yarn**
-   **Docker** (optional, for containerized setup)
-   **MySQL 8.0+**
-   **Redis**

## 🛠️ Installation

### Option 1: Local Development

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd Stryde
    ```

2. **Install PHP dependencies**

    ```bash
    composer install
    ```

3. **Install Node.js dependencies**

    ```bash
    npm install
    ```

4. **Environment setup**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. **Configure database**
   Update your `.env` file with database credentials:

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=stryde
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    ```

6. **Run migrations and seeders**

    ```bash
    php artisan migrate
    php artisan db:seed
    ```

7. **Build assets**

    ```bash
    npm run build
    ```

8. **Start the development server**
    ```bash
    php artisan serve
    npm run dev
    ```

### Option 2: Docker Setup

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd Stryde
    ```

2. **Start Docker containers**

    ```bash
    docker-compose up -d
    ```

3. **Install dependencies**

    ```bash
    docker-compose exec app composer install
    docker-compose exec app npm install
    ```

4. **Environment setup**

    ```bash
    cp .env.example .env
    docker-compose exec app php artisan key:generate
    ```

5. **Run migrations**

    ```bash
    docker-compose exec app php artisan migrate
    docker-compose exec app php artisan db:seed
    ```

6. **Build assets**
    ```bash
    docker-compose exec app npm run build
    ```

The application will be available at:

-   **Web**: http://localhost:8000
-   **API**: http://localhost:9000
-   **Database**: localhost:3306
-   **Redis**: localhost:6379

## 🔧 Configuration

### Environment Variables

Key environment variables to configure:

```env
# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=stryde
DB_USERNAME=laravel
DB_PASSWORD=laravel

# Redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# OAuth (Google & GitHub)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Payment Gateway (Midtrans)
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_IS_PRODUCTION=false
```

### OAuth Setup

1. **Google OAuth**:

    - Go to [Google Cloud Console](https://console.cloud.google.com/)
    - Create a new project or select existing one
    - Enable Google+ API
    - Create OAuth 2.0 credentials
    - Add authorized redirect URIs: `http://localhost:8000/auth/google/callback`

2. **GitHub OAuth**:
    - Go to [GitHub Developer Settings](https://github.com/settings/developers)
    - Create a new OAuth App
    - Add callback URL: `http://localhost:8000/auth/github/callback`

## 📁 Project Structure

```
Stryde/
├── app/
│   ├── Http/Controllers/    # Application controllers
│   │   ├── Models/             # Eloquent models
│   │   ├── Services/           # Business logic services
│   │   └── Providers/          # Service providers
│   └── views/              # Blade templates
├── routes/
│   ├── web.php            # Web routes
│   └── auth.php           # Authentication routes
├── database/
│   ├── migrations/        # Database migrations
│   └── seeders/           # Database seeders
├── docker/                # Docker configuration
└── public/                # Public assets
```

## 🚀 Available Commands

### Development

```bash
# Start development servers
composer run dev

# Build assets for production
npm run build

# Watch for changes
npm run dev
```

### Database

```bash
# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Seed database
php artisan db:seed

# Refresh database
php artisan migrate:fresh --seed
```

### Testing

```bash
# Run tests
php artisan test

# Run tests with coverage
php artisan test --coverage
```

### Code Quality

```bash
# Format code
./vendor/bin/pint

# Analyze code
./vendor/bin/pint --test
```

## 🔒 Security Features

-   **CSRF Protection**: Built-in Laravel CSRF protection
-   **SQL Injection Prevention**: Eloquent ORM with parameter binding
-   **XSS Protection**: Automatic output escaping
-   **Authentication**: Secure user authentication with Laravel Breeze
-   **Authorization**: Role-based access control
-   **Input Validation**: Comprehensive form validation
-   **Secure Headers**: Security headers middleware

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/stryde/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

-   [Laravel](https://laravel.com) - The PHP framework
-   [React](https://reactjs.org) - The JavaScript library
-   [Tailwind CSS](https://tailwindcss.com) - The CSS framework
-   [Inertia.js](https://inertiajs.com) - The SPA library
-   [Midtrans](https://midtrans.com) - Payment gateway

---

**Built with ❤️ using Laravel and React**
