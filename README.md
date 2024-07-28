# Installation Guide

## Table of Contents
- [Introduction](#introduction)
- [Screenshot](#screenshot)
- [Prerequisites](#prerequisites)
- [Running the Application](#running-the-application)
- [Setting Up Environment Variables](#setting-up-environment-variables)
- [Test Users](#test-users)
- [Application Walkthrough](#application-walkthrough)

## Introduction
This installation guide is for the Pokemon-App-Vite application. The source code can be found on GitHub: [pokemon-app-vite](https://github.com/felixvanmill/pokemon-app-vite). The guide is written in English to accommodate developers from various regions. The primary page in the application is the login page, which allows users to access their "My Pokémon" collection.

## Screenshot

![Screenshot](https://github.com/felixvanmill/pokemon-app-vite/blob/main/src/Images/screenshotlogin.png)

## Prerequisites
To run the React application, ensure you have the following packages and installations:

- **Node.js (v14 or later)**
    - Download and install Node.js from the [Node.js website](https://nodejs.org/). This guide was tested with Node version: v21.7.1.

- **Git**
    - Git is required to download the project folder. You can download Git from the [Git website](https://git-scm.com/). Alternatively, you can manually download the files from GitHub. This guide was tested with Git version 2.44.0.windows.1.

- **Code Editor**
    - A code editor is needed to edit and run code. This guide uses WebStorm, but you can use any editor of your choice (e.g., VSCode, Sublime Text). This guide was tested with WebStorm: Build #WS-233.14475.40, built on February 14, 2024.


## Running the Application
To get the application up and running, follow these steps:

1. **Clone the Repository**
    ```sh
    git clone https://github.com/felixvanmill/pokemon-app-vite.git
    cd pokemon-app-vite
    ```

2. **Install Dependencies**
    ```sh
    npm install
    ```

3. **Set Up Environment Variables**
    - Adjust the `.env` file in the root directory of the project (where `package.json` is located).
    - Copy in the necessary values:
      ```plaintext
      VITE_API_BASE_URL=https://api.datavortex.nl/pokemonapp
      VITE_API_KEY=pokemonapp:uHlwzGrkpZ45KU8J22aU
      ```

4. **Start the Development Server**
    ```sh
    npm run dev
    ```

5. **Open the Application in Your Browser**
    - Open your browser and navigate to the localhost link as provided by the environment.


## Test Users
- **Admin User**
    - Email: `adminfelix@gmail.com`
    - Password: `admin123123`

## Application Walkthrough
### Login Page
Use the credentials provided in the Test Users section to log in.

### My Pokémon
Once logged in, you have access to  the "My Pokémon" page where you can view your Pokémon collection.

### Items
The items page can be used to search for items that are found in the Pokémon world

### Pokémon
Click this link in the nav-bar to view the first 151 Pokémon. Click the Pokémon to view more details.
You can navigate between Pokémon with the keyboard keys or mouse. 

### Logout
To log out, click on the logout button in the top-right corner of the application.

For more information and updates, refer to the [GitHub repository](https://github.com/felixvanmill/pokemon-app-vite).
