"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { RuleRow } from './RuleRow';

interface Rule {
  id: string;
  field: string;
  operator: string;
  value: string;
  conjunction: 'AND' | 'OR';
}

interface RuleBuilderProps {
  rules: Rule[];
  onRulesChange: (rules: Rule[]) => void;
}

export function RuleBuilder({ rules, onRulesChange }: RuleBuilderProps) {
  const addRule = () => {
    const newRule: Rule = {
      id: Date.now().toString(),
      field: 'totalSpend',
      operator: '>',
      value: '',
      conjunction: 'AND'
    };
    onRulesChange([...rules, newRule]);
  };

  const updateRule = (id: string, updates: Partial<Rule>) => {
    onRulesChange(rules.map(rule => 
      rule.id === id ? { ...rule, ...updates } : rule
    ));
  };

  const removeRule = (id: string) => {
    onRulesChange(rules.filter(rule => rule.id !== id));
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Audience Rules</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rules.map((rule, index) => (
          <RuleRow
            key={rule.id}
            rule={rule}
            isLast={index === rules.length - 1}
            onUpdate={(updates) => updateRule(rule.id, updates)}
            onRemove={() => removeRule(rule.id)}
          />
        ))}
        <Button onClick={addRule} variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Condition
        </Button>
      </CardContent>
    </Card>
  );
} 