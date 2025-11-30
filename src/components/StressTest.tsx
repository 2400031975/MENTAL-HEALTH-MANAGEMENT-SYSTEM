import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const questions = [
  "I feel overwhelmed by my responsibilities",
  "I have trouble sleeping or sleeping too much",
  "I find it hard to concentrate on tasks",
  "I feel irritable or on edge frequently",
  "I've lost interest in activities I used to enjoy",
  "I feel exhausted even after resting",
  "I worry excessively about future events",
  "I have difficulty making decisions",
];

type Answer = 0 | 1 | 2 | 3 | 4;

export const StressTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const answerOptions = [
    { value: 0, label: "Never" },
    { value: 1, label: "Rarely" },
    { value: 2, label: "Sometimes" },
    { value: 3, label: "Often" },
    { value: 4, label: "Very Often" },
  ];

  const handleAnswer = (value: Answer) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      // Save to localStorage
      const result = {
        date: new Date().toISOString(),
        score: newAnswers.reduce((sum, a) => sum + a, 0),
        maxScore: questions.length * 4,
      };
      const history = JSON.parse(localStorage.getItem('stressTestHistory') || '[]');
      localStorage.setItem('stressTestHistory', JSON.stringify([result, ...history].slice(0, 10)));
    }
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const getStressLevel = (score: number) => {
    const percentage = (score / (questions.length * 4)) * 100;
    if (percentage < 25) return { level: "Low", color: "text-green-600", message: "You're managing stress well! Keep up your healthy habits." };
    if (percentage < 50) return { level: "Moderate", color: "text-yellow-600", message: "Some stress is present. Consider practicing relaxation techniques." };
    if (percentage < 75) return { level: "High", color: "text-orange-600", message: "You're experiencing significant stress. Reaching out for support could help." };
    return { level: "Very High", color: "text-red-600", message: "You're under considerable stress. Please consider speaking with a counselor." };
  };

  if (showResults) {
    const totalScore = answers.reduce((sum, a) => sum + a, 0);
    const result = getStressLevel(totalScore);

    return (
      <Card className="shadow-card max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Your Stress Assessment Results</CardTitle>
          <CardDescription>Based on your responses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Your Stress Level</p>
              <p className={`text-4xl font-bold ${result.color}`}>{result.level}</p>
            </div>
            
            <div className="space-y-2">
              <Progress value={(totalScore / (questions.length * 4)) * 100} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Score: {totalScore} / {questions.length * 4}
              </p>
            </div>

            <div className="p-6 bg-secondary rounded-lg">
              <p className="text-base">{result.message}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Recommended Actions:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Practice deep breathing exercises daily</li>
              <li>• Maintain a regular sleep schedule</li>
              <li>• Connect with friends and family</li>
              <li>• Engage in physical activity</li>
              {(totalScore / (questions.length * 4)) * 100 > 50 && (
                <li className="text-primary font-medium">• Consider speaking with a mental health professional</li>
              )}
            </ul>
          </div>

          <Button onClick={reset} className="w-full" variant="outline">
            Take Assessment Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="shadow-card max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Stress Self-Assessment</CardTitle>
        <CardDescription>
          Question {currentQuestion + 1} of {questions.length}
        </CardDescription>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="min-h-[100px] flex items-center justify-center">
          <p className="text-lg text-center font-medium">{questions[currentQuestion]}</p>
        </div>

        <div className="space-y-3">
          {answerOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => handleAnswer(option.value as Answer)}
              variant="outline"
              className="w-full h-auto py-4 text-left justify-start hover:bg-secondary hover:border-primary transition-all"
            >
              <span className="text-base">{option.label}</span>
            </Button>
          ))}
        </div>

        {currentQuestion > 0 && (
          <Button
            onClick={() => {
              setCurrentQuestion(currentQuestion - 1);
              setAnswers(answers.slice(0, -1));
            }}
            variant="ghost"
            className="w-full"
          >
            Previous Question
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
