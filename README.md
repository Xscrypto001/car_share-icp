

# CarSharing App

Welcome to the CarSharing App repository! This application allows users to find available cars, view details about specific cars, and book them for use.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)


## Features

### Current Features

- **View Available Cars**: Users can see a list of cars currently available for sharing.
- **Car Details**: Detailed information about each car, including specifications and availability.
- **Book Car**: Users can book a car for a specified period.

### Future Enhancements

- **User Authentication**: Implement user accounts and authentication.
- **Review and Rating**: Allow users to leave reviews and ratings for cars.
- **Payment Integration**: Integrate payment services for booking cars.
- **Notification System**: Notify users about booking confirmations and updates.

## Technologies Used

- **Frontend**: React.js, TypeScript
- **Backend**: DFINITY Internet Computer (IC), Candid (DFINITY's interface description language)
- **APIs**: @dfinity/agent for communication with backend canisters

- **Other Tools**: Node.js, npm or yarn

## Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (version >= 14.17.0)
- npm (version >= 7.20.0) or yarn (version >= 1.22.0)
- DFINITY SDK and dfx CLI (for local development)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Xscrypto001/car_share-icp.git
   cd carsharing-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

## Usage

1. **Start the backend canister**:

   Make sure your DFINITY development environment is set up. Start the backend canister using dfx:

   ```bash
   dfx start --clean
   ```

2. **Start the frontend**:

   ```bash
   npm start
   # or
   yarn start
   ```

3. **Open the application**:

   Open your browser and go to `http://localhost:3000` to view the CarSharing App.

## Contributing

Contributions are welcome! Please fork this repository and create a pull request with your improvements. For major changes, please open an issue first to discuss what you would like to change.

