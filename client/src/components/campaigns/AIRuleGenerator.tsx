"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';

interface Rule {
  id: string;
  field: string;
  operator: string;
  value: string;
  conjunction: 'AND' | 'OR';
}

interface AIRuleGeneratorProps {
  onRulesGenerated: (rules: Rule[]) => void;
}

export function AIRuleGenerator({ onRulesGenerated }: AIRuleGeneratorProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRules = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/ai/generate-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() })
      });
      
      if (!response.ok) throw new Error('Failed to generate rules');
      
      const { rules } = await response.json();
      onRulesGenerated(rules);
      setQuery('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI-Powered Rule Builder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Describe your target audience in natural language... e.g., 'customers who spent more than $500 and haven't visited in 30 days'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={3}
        />
        <Button 
          onClick={handleGenerateRules} 
          disabled={!query.trim() || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Rules...
            </>
          ) : (
            'Generate Rules from Text'
          )}
        </Button>
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
      </CardContent>
    </Card>
  );
} 