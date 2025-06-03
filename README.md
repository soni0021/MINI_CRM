# AI-Powered CRM Setup Instructions

This document provides setup instructions for the enhanced CRM features with Gemini AI integration and Firebase authentication.

## Features Added

### 1. AI-Powered Natural Language to Rule Builder
- Convert natural language descriptions into structured campaign rules
- Uses Google's Gemini AI for intelligent rule generation
- Supports complex audience targeting scenarios

### 2. Enhanced Campaign Creation UI
- Modern, intuitive interface for campaign creation
- Real-time audience size preview
- Advanced rule builder with AND/OR logic
- Integration with existing Firebase authentication

### 3. Real-time Audience Preview
- Live audience size calculation based on rules
- Debounced API calls for optimal performance
- MongoDB query optimization

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Google Gemini AI API key
- Firebase project (already configured)

### 1. Install Dependencies

#### Client Dependencies
```bash
cd client
npm install @radix-ui/react-select
```

#### Server Dependencies
```bash
cd server
npm install @google/generative-ai
```

### 2. Environment Configuration

Create a `.env` file in the `server` directory with the following variables:

```bash
# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# MongoDB Configuration (existing)
MONGODB_URI=your_mongodb_connection_string

# RabbitMQ Configuration (existing)
RABBITMQ_URL=your_rabbitmq_url
```

### 3. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key and add it to your `.env` file

### 4. Run the Application

#### Start the Server
```bash
cd server
npm run develop
```

#### Start the Client
```bash
cd client
npm run dev
```

### 5. Access New Features

1. **Login**: Use the existing Firebase Google authentication
2. **Navigate**: Click on "AI Campaigns" in the navbar
3. **Create Campaign**: Use the "Create Campaign" button to access the AI-powered form

## Usage Examples

### AI Rule Generation Examples

Try these natural language queries in the AI Rule Generator:

1. **High-Value Customers**: 
   "Customers who spent more than $500 and haven't visited in 30 days"

2. **Frequent Visitors**: 
   "Users who visit more than 5 times but spend less than $100"

3. **Geographic Targeting**: 
   "Customers from New York who spent over $200"

4. **Dormant Users**: 
   "Users who haven't visited in 60 days but previously spent over $300"

### Rule Builder Features

- **Field Options**: Total Spend, Visit Count, Last Seen Days, City
- **Operators**: >, <, =, >=, <=, !=
- **Logic**: AND/OR conditions between rules
- **Real-time Preview**: Audience size updates as you modify rules

## Technical Implementation

### Frontend Components
- `AIRuleGenerator`: Natural language to rules conversion
- `RuleBuilder`: Manual rule creation and editing
- `RuleRow`: Individual rule configuration
- `AudiencePreview`: Real-time audience size calculation
- `CampaignForm`: Complete campaign creation workflow

### Backend APIs
- `POST /ai/generate-rules`: Convert natural language to rules
- `POST /ai/audience-preview`: Calculate audience size
- `POST /ai/campaigns`: Create campaigns with AI-generated rules

### Database Integration
- Uses existing MongoDB customer schema
- Optimized queries for audience size calculation
- Support for complex rule combinations

## Authentication

The system uses the existing Firebase authentication:
- Google OAuth integration
- User session management via AuthProvider
- Protected routes for authenticated users

## Error Handling

- Graceful fallbacks for AI service failures
- User-friendly error messages
- Robust validation for rule generation

## Performance Optimizations

- Debounced audience preview requests (500ms)
- Optimized MongoDB aggregation queries
- Efficient rule-to-query conversion
- Client-side caching of rule configurations

## Future Enhancements

- Support for more complex OR conditions
- Additional customer fields for targeting
- Campaign performance analytics
- A/B testing capabilities
- Email template integration

## Troubleshooting

### Common Issues

1. **Gemini API Key Issues**
   - Ensure the API key is correctly set in `.env`
   - Verify the key has proper permissions
   - Check API quotas and limits

2. **Database Connection**
   - Verify MongoDB URI is correct
   - Ensure database is accessible
   - Check customer data exists for preview

3. **Authentication Issues**
   - Confirm Firebase configuration
   - Check browser localStorage for user session
   - Verify user is logged in before accessing campaigns

### Support
For technical support or questions about the implementation, refer to the existing CRM documentation or contact the development team. 
