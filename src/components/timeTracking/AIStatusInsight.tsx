
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Clock, Timer, TimerOff } from "lucide-react";

export const AIStatusInsight = () => {
  // You can randomize, or later make dynamic, the user, hours, and sources
  const name = "Zoya";
  const extraHours = 2;
  const sources = [
    { label: "Slack", color: "bg-blue-600" },
    { label: "Biometric", color: "bg-green-600" }
  ];
  return (
    <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/30 border-blue-800/40 shadow-glow text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <Timer className="w-6 h-6 text-blue-300" />
          AI Activity Insight
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-2">
        <div className="text-lg leading-relaxed">
          <span className="text-blue-200 font-semibold">{name}</span> worked <span className="text-green-400 font-bold">{extraHours} hours</span> overtime today.
        </div>
        <div className="text-base text-blue-300 mb-2">
          <span>
            <span className="text-purple-300 font-medium">How?</span> <br />
            Our AI kept an eye on:&nbsp;
            {sources.map(src => (
              <span
                key={src.label}
                className={`inline-block px-2 py-0.5 rounded mr-2 text-xs font-bold ${src.color} bg-opacity-30`}
              >
                {src.label}
              </span>
            ))}
            &nbsp;activity, and figured it out automatically. <span className="text-blue-400">No manual entry needed!</span>
          </span>
        </div>
        <div className="text-sm text-blue-500 italic">
          <TimerOff className="w-4 h-4 mb-0.5 inline-block" />
          &nbsp;Manual clocking is disabled – you’re all set!
        </div>
      </CardContent>
    </Card>
  );
};
