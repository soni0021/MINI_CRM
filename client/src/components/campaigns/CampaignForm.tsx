"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AIRuleGenerator } from './AIRuleGenerator';
import { RuleBuilder } from './RuleBuilder';
import { AudiencePreview } from './AudiencePreview';
import { useAuth } from '@/components/providers/authprovider';

interface Rule {
  id: string;
  field: string;
  operator: string;
  value: string;
  conjunction: 'AND' | 'OR';
}

export function CampaignForm() {
  const [campaignName, setCampaignName] = useState('');
  const [rules, setRules] = useState<Rule[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!campaignName.trim() || rules.length === 0) {
      alert('Please provide campaign name and at least one rule');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:8000/ai/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: campaignName,
          rules: rules,
          userEmail: user
        })
      });

      if (response.ok) {
        router.back();
      } else {
        throw new Error('Failed to create campaign');
      }
    } catch (error) {
      alert('Error creating campaign');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Campaign</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="campaignName">Campaign Name</Label>
              <Input
                id="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Enter campaign name"
                required
              />
            </div>
          </CardContent>
        </Card>

        <AIRuleGenerator onRulesGenerated={setRules} />
        
        <RuleBuilder rules={rules} onRulesChange={setRules} />
        
        <AudiencePreview rules={rules} />

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !campaignName.trim() || rules.length === 0}
          >
            {isSubmitting ? 'Creating...' : 'Create Campaign'}
          </Button>
        </div>
      </form>
    </div>
  );
} 