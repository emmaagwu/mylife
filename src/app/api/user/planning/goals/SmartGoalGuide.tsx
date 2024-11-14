'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function SmartGoalGuide() {
  const smartCriteria = [
    {
      letter: 'S',
      title: 'Specific',
      description: 'What exactly do you want to achieve?',
      examples: [
        'Instead of "Get fit", use "Run 5km in under 30 minutes"',
        'Instead of "Save money", use "Save $5000 for a house deposit"'
      ]
    },
    {
      letter: 'M',
      title: 'Measurable',
      description: 'How will you track progress?',
      examples: [
        'Include numbers, amounts, or clear milestones',
        'Example: "Read 24 books this year" (2 per month)'
      ]
    },
    {
      letter: 'A',
      title: 'Achievable',
      description: 'Is this realistic with your current resources?',
      examples: [
        'Consider your time, skills, and resources',
        'Break larger goals into smaller steps'
      ]
    },
    {
      letter: 'R',
      title: 'Relevant',
      description: 'Does this align with your role and values?',
      examples: [
        'Connect the goal to your chosen life role',
        'Ensure it supports your long-term vision'
      ]
    },
    {
      letter: 'T',
      title: 'Time-bound',
      description: 'When will you achieve this by?',
      examples: [
        'Set a specific deadline',
        'Break down long-term goals into shorter milestones'
      ]
    }
  ]

  return (
    <Card className="mt-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">SMART Goal Guidelines</CardTitle>
        <CardDescription>
          Make your goal specific, measurable, achievable, relevant, and time-bound
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {smartCriteria.map((criteria) => (
            <div key={criteria.letter} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {criteria.letter}
                </span>
                <h4 className="font-medium">{criteria.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground ml-8">
                {criteria.description}
              </p>
              <ul className="text-sm text-muted-foreground ml-8 list-disc pl-4">
                {criteria.examples.map((example, i) => (
                  <li key={i}>{example}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}