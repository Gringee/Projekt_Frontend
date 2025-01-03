# Projekt Frontend

This project is a simple frontend application that allows users to manage posts and photos. Users can log in, view a dashboard, manage posts, and view a feed of photos. The application uses local storage to save data.

## Features

- User authentication (login and registration)
- Admin and user roles
- Post management (add, delete posts and comments)
- Photo feed (add, delete photos)
- Folder management for photos
- Responsive design

## Pages

### Login

- Users can log in or register.
- Admin users are redirected to the admin dashboard.
- Regular users are redirected to the user dashboard.

### Dashboard

- Admin Dashboard:
  - View and delete users.
  - Navigate to the photo feed or post management.
- User Dashboard:
  - Limited access.
  - Navigate to the photo feed or post management.

### Post Management

- Add new posts.
- Delete posts.
- Add comments to posts.
- Delete comments (only by the comment author).
- Posts and comments are saved in local storage and visible to all users.

### Photo Feed

- View all photos or browse by folders.
- Filter photos by user.
- Add new photos.
- Delete photos (only by the photo author).
- Photos are saved in local storage and visible to all users.

### Add Photo

- Add a new photo with a name and optional folder.
- Photos are saved in local storage and visible in the photo feed.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/projekt_frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd projekt_frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Open the application in your browser:
   ```bash
   http://localhost:3000
   ```
2. Register a new user or log in with an existing user.
3. Navigate through the application using the provided buttons and links.

## Project Structure

```
projekt_frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   └── ...
│   ├── pages/
│   │   ├── AddPhotoPage.tsx
│   │   ├── FeedPage.tsx
│   │   └── ...
│   ├── App.css
│   ├── App.tsx
│   ├── Dashboard.css
│   ├── Dashboard.tsx
│   ├── Login.css
│   ├── Login.tsx
│   ├── PostManagement.css
│   ├── PostManagement.tsx
│   └── types.ts
├── package.json
├── README.md
└── ...
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## License

This project is licensed under the MIT License.
