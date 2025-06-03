# Mini CRM

Welcome to the **Mini CRM** project! This is a demonstration of a basic yet powerful Customer Relationship Management (CRM) application enhanced with AI capabilities for intelligent campaign creation.

---

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Technologies Used](#technologies-used)
- [AI-Powered Enhancements](#ai-powered-enhancements)
- [Usage Examples](#usage-examples)
- [Authentication](#authentication)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User authentication with Firebase (Google OAuth)
- CRUD operations for customer data
- Real-time updates and notifications via RabbitMQ Cloud
- Responsive UI built with Next.js, ShadCN, and TailwindCSS
- AI-powered natural language to rule builder for campaign creation using Google Gemini AI
- Real-time audience size preview with optimized MongoDB queries
- Modular, strongly-typed codebase using TypeScript

---

## Getting Started

### Prerequisites

Ensure you have the following installed and configured:

- Node.js (v14 or higher)
- pnpm (v6 or higher)
- MongoDB Atlas account with connection URI
- RabbitMQ Cloud account
- Firebase project with authentication enabled
- Google Gemini AI API key

### Installation

Clone the repository and install dependencies for both client and server:

```bash
git clone https://github.com/mangalamraj/CRM.git
cd CRM
```

Install client dependencies:

```bash
cd client
pnpm install
pnpm install @radix-ui/react-select
```

Install server dependencies:

```bash
cd ../server
pnpm install
pnpm install @google/generative-ai
```

### Environment Configuration

Create a `.env` file inside the `server` directory with the following variables:

```bash
# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# RabbitMQ Configuration
RABBITMQ_URL=your_rabbitmq_url
```

### Running the Application

Start the server:

```bash
cd server
pnpm run develop
```

Start the client:

```bash
cd ../client
pnpm run dev
```

Open your browser and navigate to `http://localhost:3000`.

---

## Technologies Used

### Frontend
- **Next.js** – React framework for server-side rendering and static site generation
- **TypeScript** – Typed superset of JavaScript
- **ShadCN** – React component design system built with TailwindCSS
- **TailwindCSS** – Utility-first CSS framework
- **Radix UI** – Accessible UI primitives (used for select components)

### Backend
- **Express.js** – Node.js web framework
- **MongoDB Atlas** – Cloud-hosted NoSQL database
- **Firebase Authentication** – User authentication and session management
- **RabbitMQ Cloud** – Cloud-based message broker for real-time updates
- **Google Gemini AI** – AI service for natural language processing and rule generation

---

## AI-Powered Enhancements

### Features Added

- **Natural Language to Rule Builder:** Convert plain English campaign descriptions into structured targeting rules using Gemini AI.
- **Enhanced Campaign Creation UI:** Intuitive interface with real-time audience size preview and advanced AND/OR logic for rules.
- **Real-time Audience Preview:** Live calculation of campaign audience size with debounced API calls and optimized MongoDB queries.

### Workflow

1. Login with Firebase Google authentication.
2. Navigate to the "AI Campaigns" section.
3. Use the AI-powered form to create campaigns by entering natural language rules or manually building them.
4. Preview audience size in real-time before launching campaigns.

---

## Usage Examples

Try these natural language inputs in the AI Rule Generator:

- **High-Value Customers:**  
  `"Customers who spent more than $500 and haven't visited in 30 days"`

- **Frequent Visitors:**  
  `"Users who visit more than 5 times but spend less than $100"`

- **Geographic Targeting:**  
  `"Customers from New York who spent over $200"`

- **Dormant Users:**  
  `"Users who haven't visited in 60 days but previously spent over $300"`

---

## Authentication

- Firebase Authentication with Google OAuth
- Session management via React context (`AuthProvider`)
- Protected routes to secure campaign management features

---

## Troubleshooting

### Common Issues

- **Gemini API Key:**  
  Ensure the key is correctly set in `.env` and has required permissions.

- **MongoDB Connection:**  
  Verify your MongoDB URI and database accessibility.

- **Firebase Authentication:**  
  Check Firebase project configuration and user login status.

- **RabbitMQ Connection:**  
  Confirm RabbitMQ URL and connectivity.

### Support

For further assistance, refer to the project documentation or contact the development team.

---

## Future Enhancements

- Support for more complex OR logic in campaign rules
- Additional customer fields for richer targeting
- Campaign performance analytics dashboard
- A/B testing capabilities
- Email template integration for campaigns

---

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for improvements or bug fixes.

---

## License

This project is created and maintained by **Manish Soni**.

---

Thank you for exploring the Mini CRM project!  
Feel free to reach out for collaboration or questions.



