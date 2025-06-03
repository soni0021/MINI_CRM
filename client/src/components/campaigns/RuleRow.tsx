import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface Rule {
  id: string;
  field: string;
  operator: string;
  value: string;
  conjunction: 'AND' | 'OR';
}

interface RuleRowProps {
  rule: Rule;
  isLast: boolean;
  onUpdate: (updates: Partial<Rule>) => void;
  onRemove: () => void;
}

const FIELDS = [
  { value: 'totalSpend', label: 'Total Spend' },
  { value: 'visitCount', label: 'Visit Count' },
  { value: 'lastSeenDays', label: 'Last Seen (Days)' },
  { value: 'city', label: 'City' }
];

const OPERATORS = [
  { value: '>', label: 'Greater than' },
  { value: '<', label: 'Less than' },
  { value: '=', label: 'Equals' },
  { value: '>=', label: 'Greater than or equal' },
  { value: '<=', label: 'Less than or equal' },
  { value: '!=', label: 'Not equals' }
];

export function RuleRow({ rule, isLast, onUpdate, onRemove }: RuleRowProps) {
  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg">
      <Select value={rule.field} onValueChange={(value) => onUpdate({ field: value })}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select field" />
        </SelectTrigger>
        <SelectContent>
          {FIELDS.map(field => (
            <SelectItem key={field.value} value={field.value}>
              {field.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={rule.operator} onValueChange={(value) => onUpdate({ operator: value })}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select operator" />
        </SelectTrigger>
        <SelectContent>
          {OPERATORS.map(op => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        value={rule.value}
        onChange={(e) => onUpdate({ value: e.target.value })}
        placeholder="Value"
        className="flex-1"
      />

      {!isLast && (
        <Select value={rule.conjunction} onValueChange={(value) => onUpdate({ conjunction: value as 'AND' | 'OR' })}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AND">AND</SelectItem>
            <SelectItem value="OR">OR</SelectItem>
          </SelectContent>
        </Select>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={onRemove}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
} 