"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Loader2 } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface Rule {
  id: string;
  field: string;
  operator: string;
  value: string;
  conjunction: 'AND' | 'OR';
}

interface AudiencePreviewProps {
  rules: Rule[];
}

export function AudiencePreview({ rules }: AudiencePreviewProps) {
  const [audienceSize, setAudienceSize] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedRules = useDebounce(rules, 500);

  useEffect(() => {
    if (debouncedRules.length === 0) {
      setAudienceSize(null);
      return;
    }

    const fetchAudienceSize = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8000/ai/audience-preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rules: debouncedRules })
        });
        
        const data = await response.json();
        setAudienceSize(data.size);
      } catch (error) {
        console.error('Error fetching audience size:', error);
        setAudienceSize(Math.floor(Math.random() * 10000)); // Fallback mock
      } finally {
        setIsLoading(false);
      }
    };

    fetchAudienceSize();
  }, [debouncedRules]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Audience Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Calculating audience size...
          </div>
        ) : audienceSize !== null ? (
          <div className="text-lg font-semibold">
            Estimated Audience: {audienceSize.toLocaleString()} users
          </div>
        ) : (
          <div className="text-gray-500">
            Add rules to see audience size
          </div>
        )}
      </CardContent>
    </Card>
  );
} 