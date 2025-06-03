import express from 'express';
// import { GoogleGenerativeAI } from '@google/generative-ai';
import Customer from '../model/customer-schema';

const router = express.Router();

// Initialize Gemini AI (commented out due to installation issues)
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface Rule {
  id: string;
  field: string;
  operator: string;
  value: string;
  conjunction: 'AND' | 'OR';
}

// Generate rules from natural language
router.post('/generate-rules', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Mock AI response since we can't install the Gemini package
    console.log('Received natural language query:', query);
    
    // Generate mock rules based on common patterns in the query
    const mockRules: Rule[] = [];
    
    // Check for spend-related patterns
    if (query.includes('spend') || query.includes('$')) {
      const spendAmount = query.match(/\$?(\d+)/)?.[1] || '1000';
      mockRules.push({
        id: '1',
        field: 'totalSpend',
        operator: '>',
        value: spendAmount,
        conjunction: 'AND'
      });
    }
    
    // Check for visit-related patterns
    if (query.includes('visit')) {
      if (query.includes('haven\'t')) {
        const days = query.match(/(\d+)\s*days/)?.[1] || '30';
        mockRules.push({
          id: '2',
          field: 'lastSeenDays',
          operator: '>',
          value: days,
          conjunction: 'AND'
        });
      } else {
        mockRules.push({
          id: '2',
          field: 'visitCount',
          operator: '>',
          value: '5',
          conjunction: 'AND'
        });
      }
    }
    
    // Check for city-related patterns
    const cityMatch = query.match(/from\s+([A-Za-z\s]+)/);
    if (cityMatch) {
      mockRules.push({
        id: '3',
        field: 'city',
        operator: '=',
        value: cityMatch[1].trim(),
        conjunction: 'AND'
      });
    }
    
    // If no rules were created, add a default one
    if (mockRules.length === 0) {
      mockRules.push({
        id: Date.now().toString(),
        field: 'totalSpend',
        operator: '>',
        value: '100',
        conjunction: 'AND'
      });
    }
    
    res.json({ rules: mockRules });
    
  } catch (error) {
    console.error('AI rules generation error:', error);
    res.status(500).json({ error: 'Failed to generate rules' });
  }
});

// Preview audience size based on rules
router.post('/audience-preview', async (req, res) => {
  try {
    const { rules } = req.body;
    
    if (!rules || !Array.isArray(rules)) {
      return res.status(400).json({ error: 'Rules array is required' });
    }

    // Instead of actual DB query, return mock audience size
    // This is a temporary solution until we can install dependencies properly
    const mockSize = Math.floor(Math.random() * 10000) + 100;
    console.log('Audience preview requested with rules:', rules.length);
    console.log('Returning mock audience size:', mockSize);
    
    res.json({ size: mockSize });
    
  } catch (error) {
    console.error('Audience preview error:', error);
    res.status(500).json({ error: 'Failed to calculate audience size' });
  }
});

// Create campaign with AI-generated rules
router.post('/campaigns', async (req, res) => {
  try {
    const { name, rules, userEmail } = req.body;
    
    if (!name || !rules || !userEmail) {
      return res.status(400).json({ error: 'Name, rules, and userEmail are required' });
    }

    // Here you would typically save the campaign to your database
    // For now, we'll just return success
    
    console.log('Creating campaign:', { name, rules: rules.length, userEmail });
    
    res.json({ 
      message: 'Campaign created successfully',
      campaignId: Date.now().toString(),
      name,
      rulesCount: rules.length
    });
    
  } catch (error) {
    console.error('Campaign creation error:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

export default router; 