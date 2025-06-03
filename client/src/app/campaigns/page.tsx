"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Sparkles, Users, Target } from 'lucide-react';
import { useAuth } from '@/components/providers/authprovider';

export default function CampaignsPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container max-w-4xl mx-auto py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Campaigns</h1>
          <p className="text-gray-500 mb-8">Please log in to access campaigns</p>
          <Link href="/login">
            <Button>Log In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI-Powered Campaigns</h1>
          <p className="text-gray-500">Create targeted campaigns using natural language</p>
        </div>
        <Link href="/campaigns/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Campaign
          </Button>
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              AI Rule Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Describe your target audience in plain English and let AI create precise targeting rules automatically.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              Real-time Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              See estimated audience size in real-time as you build your campaign rules.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-500" />
              Advanced Targeting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Use complex conditions with AND/OR logic for precise customer segmentation.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Demo Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Try AI Campaign Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Experience the power of AI-driven campaign creation. Simply describe your target audience and watch as our AI transforms your description into precise targeting rules.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Example queries you can try:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• "Customers who spent more than $500 and haven't visited in 30 days"</li>
                <li>• "High-value customers from New York who visit frequently"</li>
                <li>• "Customers with low engagement but high spending potential"</li>
              </ul>
            </div>
            <Link href="/campaigns/create">
              <Button className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Get Started with AI Campaign Builder
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Integration with existing campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Campaign Features</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Your existing campaign management features are still available and enhanced with new AI capabilities.
          </p>
          <div className="space-y-2">
            <Link href="/" className="block">
              <Button variant="outline" className="w-full justify-start">
                View All Shops & Campaigns
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 