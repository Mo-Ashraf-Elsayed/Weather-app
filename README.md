# Weather App 

## Overview
This is a simple weather app built using HTML, CSS, Bootstrap, and JavaScript. It displays the weather for the current day, the next day, and the day after the next day based on user location or the city which the user will search for it in input search. The app also includes a contact page for users to get in touch and a responsive design with a clean user interface.

### Features:
- Display the weather of the current day, the next day, and the day after the next day.
- Permission request to access user's location and show weather for their current location.
- Search for weather information by city or country or latitude&longitude ex => (26.5626,31.7449).
- Shows temperature, weather condition, and relevant weather icons (sunny, cloudy, night mode).
- Dynamic weather details for each day.
- Navbar with links to navigate to the Home page and Contact page.
- Footer with a contact form for users to enter their email and follow social media links.


## Pages:
The app consists of two main pages:
1. **Home Page**: Displays weather information for the selected city based on user location and includes a search bar.
2. **Contact Page**: A static page with contact details (phone number, location) and a form to collect user emails.

## How It Works:

### Home Page:
- **Navbar**: 
  - The navbar provides links to the **Home** page (which is the default page) and the **Contact** page.
  - When the user clicks on the **Contact** link, they are redirected to the contact page.
  
- **Search Bar**:
  - The user can search for a specific city or country latitude&longitude ex => (26.5626,31.7449) to view the weather details.
  - A search bar is placed above the weather details section where users can search.

- **Weather Information**:
  - The weather for three days is displayed in three separate sections:
    - **Current Day**: Displays the day name, date (without year), city name, temperature, weather icon, and the weather condition (e.g., sunny, cloudy).
    - **Next Day**: Displays the day name,icon expressing the weather conditions, highest and lowest temperatures, and the weather condition.
    - **Day After Next Day**: Similar to the next day section, displaying the day name,icon expressing the weather conditions, highest and lowest temperatures, and weather condition.
  - **Night Mode**: If the current time is night, a night icon is displayed to indicate it’s nighttime.

- **Location Permission**:
  - On the first load, the app asks for the user's permission to access their location.
  - If the user clicks "Allow," the app displays weather data for the user's current location.
  - If the user clicks "Block," the app will display nothing until the user manually search in input search.

- **Footer**:
  - Contains an email input field and links to social media accounts for contact.

### Contact Page:
- **Static Information**: Displays contact details such as the phone number, location, and contact instructions.
- **Navbar**: Includes the same navbar as the Home Page for easy navigation.
- **Footer**: Includes a contact form to collect emails and social media links.

---

## Technologies Used:
- **HTML**: Used to create the structure of the web pages (Home and Contact pages).
- **CSS**: Used to style the app's layout, colors, and fonts.
- **Bootstrap**: Used for responsive design and easy-to-use UI components.
- **JavaScript**: Used to fetch weather data via API, handle user input, and implement location permissions.

---

## API Used:
- The weather data is fetched using an external API from (weather api) website to get real-time weather information for the location of the user or the city which the user will search for it in input search.

---

### [LinkedIn](https://www.linkedin.com/in/mohammed-ashraf0/)
### [Live Demo](https://mo-ashraf-elsayed.github.io/Weather-app/)
