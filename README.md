

# **PropertyVista** - Final Full Stack Real Estate Project

Welcome to **PropertyVista**, your comprehensive solution for managing real estate listings seamlessly. This project is developed using **Django** for the backend and **React** for the frontend. It offers a feature-rich platform to browse, filter, view, and manage property listings, all while ensuring a smooth and engaging user experience.

## **Key Features:**

- 🏠 **Property Listings**: Display detailed property information including images, prices, locations, and more.
- 🔍 **Advanced Search Filters**: Easily search properties by price range, location, size, and other criteria.
- 🌍 **Google Maps Integration**: Visualize property locations on an interactive map for better navigation.
- ⭐ **User Reviews & Ratings**: Clients can leave reviews and rate properties based on their experiences.
- 🔐 **User Authentication**: Secure login and registration features for both users and property owners.
- 📱 **Responsive Design**: Fully optimized for a seamless experience across all devices.

## **Technologies Used**

- **Backend**: 
  - **Django** (Python)
  - **Django Rest Framework** for REST APIs
  - SQLITE3 (or your preferred database)

- **Frontend**: 
  - **React.js**
  - **Styled Components** or **CSS Modules** for styling

- **Additional Tools**:
  - **Google Maps API** for map integration
  - **JWT** (JSON Web Token) for secure authentication
  - **Git** for version control
  - **Docker** for containerization (optional)

## **Setup Instructions**

### 1. Clone the Repository:

git clone https://github.com/YourUsername/PropertyVista.git
2. Backend Setup (Django):
Navigate to the backend directory:

bash
Copy code
cd PropertyVista/backend
Set up a virtual environment (optional but recommended):

bash
Copy code
python -m venv venv
source venv/bin/activate  # On Windows use 'venv\Scripts\activate'
Install the required Python packages:

bash
Copy code
pip install -r requirements.txt
Apply database migrations:

bash
Copy code
python manage.py migrate
Create a superuser (for admin access):

bash
Copy code
python manage.py createsuperuser
Start the Django development server:

bash
Copy code
python manage.py runserver
The backend will be running at http://127.0.0.1:8000/.

3. Frontend Setup (React):
Navigate to the frontend directory:

bash
Copy code
cd PropertyVista/frontend
Install the necessary Node.js dependencies:

bash
Copy code
npm install
Start the React development server:

bash
Copy code
npm start
The frontend will be running at http://localhost:3000/.

Features in Development
🛠️ Admin Panel: A comprehensive dashboard to manage properties, user reviews, and feedback.
📊 Property Owner Dashboard: A secure area for property owners to manage their listings.
🔍 Enhanced Search: Additional filtering options like bedrooms, bathrooms, and amenities.
Screenshots
<p align="center"> <img src="./assets/images/homepage.jpg" alt="Homepage" width="600"/> </p> <p align="center"> <img src="./assets/images/listing.jpg" alt="Property Listing" width="600"/> </p>
Contributing
Contributions to PropertyVista are welcome! If you'd like to contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -am 'Add new feature').
Push your branch (git push origin feature/your-feature).
Open a Pull Request.
License
Distributed under the MIT License. See LICENSE for more information.

markdown
Copy code

### Key Changes:
- **HTML Image Tag**: Used HTML `<img>` tag for displaying screenshots and centering them.
- **Centering Images**: Images are now centered using `<p align="center">` for a more polished look.
- **Headings and Bullet Points**: Used consistent markdown formatting for easy readability and structure.

This README should now look visually appealing on GitHub or any markdown-rendering platform with e
