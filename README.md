# Mobile Trader Project

## Overview
"Mobile Trader" is a web-based trading dashboard application, focusing on providing a 3D interactive trading experience. The project is built using Next.js and integrates various APIs for trading functionalities.

## Key Features

### 1. **AI Integration**
   - AI-driven functionalities for enhanced user experience.
   - [AI Route](https://github.com/webpov/mobile-trader/blob/main/src/app/api/ai/route.ts): Handles AI-related requests.

### 2. **Authentication**
   - Secure authentication mechanism.
   - [Auth Route](https://github.com/webpov/mobile-trader/blob/main/src/app/api/auth/route.ts): Manages authentication processes.

### 3. **Market Data**
   - Real-time market data display.
   - [Market Route](https://github.com/webpov/mobile-trader/blob/main/src/app/api/market/route.ts): Fetches and displays market data.

### 4. **Order Management**
   - Comprehensive order logging and management.
   - [Order Logs Route](https://github.com/webpov/mobile-trader/blob/main/src/app/api/order/logs/route.ts): Handles order-related data and logs.

### 5. **3D Models and Graphics**
   - Interactive 3D models for an immersive trading experience.
   - [Model Game Stage](https://github.com/webpov/mobile-trader/blob/main/src/model/level/ModelGameStage.tsx): Integrates 3D models into the platform.

### 6. **Customizable UI Components**
   - Various UI components for a customizable user interface.
   - [Dashboard Components](https://github.com/webpov/mobile-trader/blob/main/src/dom/organism/Dashboard): Includes elements like Buy/Sell buttons, Chart Window, etc.

## Technical Stack

- **Frontend**: React, Next.js, Three.js
- **Backend**: Node.js, Next.js API routes
- **3D Graphics**: @react-three/fiber, @react-three/drei
- **Styling**: CSS Modules

## Configuration and Setup

- **Next.js Configuration**: [next.config.js](https://github.com/webpov/mobile-trader/blob/main/next.config.js)
- **Dependencies**: Listed in [package.json](https://github.com/webpov/mobile-trader/blob/main/package.json)

## License

This project is licensed under the [MIT License](https://github.com/webpov/mobile-trader/blob/main/LICENSE).
