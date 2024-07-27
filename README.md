# React + Vite

## Setup Environment Variables

To ensure the application works correctly, you need to set up environment variables.

### Steps to Set Up Environment Variables

1. **Create a .env file**:
   - In the root directory of the project (where `package.json` is located), create a file named `.env`.

2. **Copy variable names from .env.dist**:
   - Open the `.env.dist` file, copy all the variable names, and paste them into the `.env` file.

3. **Assign appropriate values**:
   - Assign the necessary values to the variables in the `.env` file:

    ```plaintext
    VITE_API_BASE_URL=https://api.datavortex.nl/pokemonapp
    VITE_API_KEY=pokemonapp:uHlwzGrkpZ45KU8J22aU
    ```

## Getting Started

Follow these steps to set up and run the project:

1. **Clone the repository and change the current folder to the cloned git folder**:
    ```bash
    git clone https://github.com/felixvanmill/pokemon-app-vite.git
    cd pokemon-app-vite
    ```

2. **Install dependencies**:
   - These are the necessary packages to run the application. Run the code inside the terminal (For Webstorm, it has a terminal inside the program).
    ```bash
    npm install
    ```

3. **Set up environment variables inside the project folder**:
   - You need this API key to make requests to the API itself. The code is not published in the project folder because it is supposed to remain secret.
   - Create a `.env` file in the root directory of the project (where `package.json` is located).
   - Copy in the necessary values:
    ```plaintext
    VITE_API_BASE_URL=https://api.datavortex.nl/pokemonapp
    VITE_API_KEY=pokemonapp:uHlwzGrkpZ45KU8J22aU
    ```

4. **Start the development server with the terminal inside your code editor**:
   - This will start up the application.
    ```bash
    npm run dev
    ```

5. **Open the application with your browser**:
   - Open your browser and navigate to the localhost link provided in the terminal output.
