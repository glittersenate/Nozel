
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ConfettiExplosion from "@/components/ui/ConfettiExplosion";
import { toast } from "@/hooks/use-toast";

export const CreateReviewDialog = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: '',
    reviewType: 'quarterly',
    overallRating: 3,
    strengths: '',
    areasForImprovement: '',
    goals: '',
    dueDate: new Date(),
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    toast({
      title: "Review Submitted!",
      description: "Your performance review was submitted successfully.",
    });
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, overallRating: value[0] }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, dueDate: date }));
    }
  };

  return (
    <>
      <ConfettiExplosion trigger={success} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Create Review</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[540px] bg-[#0f172a] text-white border border-blue-800/30">
          <DialogHeader>
            <DialogTitle>Create New Performance Review</DialogTitle>
            <DialogDescription>
              Fill in the information below to create a new performance review.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left col */}
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="employeeName" className="mb-1 block">Employee Name</Label>
                  <Input
                    type="text"
                    id="employeeName"
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleChange}
                    className="bg-[#141a2e]/80 border-blue-800/50"
                  />
                </div>
                <div>
                  <Label htmlFor="reviewType" className="mb-1 block">Review Type</Label>
                  <select
                    id="reviewType"
                    name="reviewType"
                    value={formData.reviewType}
                    onChange={handleSelectChange}
                    className="w-full bg-[#141a2e]/80 border-blue-800/50 rounded px-2 py-2 text-blue-100"
                  >
                    <option value="quarterly">Quarterly</option>
                    <option value="annual">Annual</option>
                    <option value="project">Project-Based</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="overallRating" className="mb-1 block">Overall Rating</Label>
                  <div>
                    <Slider
                      id="overallRating"
                      name="overallRating"
                      defaultValue={[formData.overallRating]}
                      max={5}
                      step={0.5}
                      onValueChange={handleSliderChange}
                      className="text-yellow-500"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0</span>
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
                    </div>
                    <Badge className="mt-2 bg-blue-500 text-white">
                      {formData.overallRating.toFixed(1)} / 5.0
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label htmlFor="strengths" className="mb-1 block">Key Strengths</Label>
                  <Textarea
                    id="strengths"
                    name="strengths"
                    value={formData.strengths}
                    onChange={handleChange}
                    className="bg-[#141a2e]/80 border-blue-800/50"
                  />
                </div>
              </div>
              {/* Right col */}
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="areasForImprovement" className="mb-1 block">Areas for Improvement</Label>
                  <Textarea
                    id="areasForImprovement"
                    name="areasForImprovement"
                    value={formData.areasForImprovement}
                    onChange={handleChange}
                    className="bg-[#141a2e]/80 border-blue-800/50"
                  />
                </div>
                <div>
                  <Label htmlFor="goals" className="mb-1 block">Goals and Objectives</Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    className="bg-[#141a2e]/80 border-blue-800/50"
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate" className="mb-1 block">Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-[#141a2e]/80 border-blue-800/50",
                          !formData.dueDate && "text-muted-foreground"
                        )}
                      >
                        {formData.dueDate ? format(formData.dueDate, "PPP") : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#141a2e] border-blue-800/30" align="center" side="bottom">
                      <Calendar
                        mode="single"
                        selected={formData.dueDate}
                        onSelect={handleDateChange}
                        disabled={(date) =>
                          date > new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
              Create Review
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

// ... end of file

