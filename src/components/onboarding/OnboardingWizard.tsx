import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, User, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const onboardingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email required"),
  position: z.string().min(1, "Position required"),
  department: z.string().min(1, "Department required"),
  document: z.any().optional(),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

const steps = [
  { label: "Personal Info", icon: User },
  { label: "Job Info", icon: Briefcase },
  { label: "Document Upload", icon: FileUp },
];

function PersonalInfoStep({ methods }: { methods: ReturnType<typeof useForm> }) {
  return (
    <div className="space-y-4">
      <label className="block">
        Name
        <Input {...methods.register("name")} placeholder="e.g. Jane Doe" />
        <p className="text-sm text-red-500 mt-1">
          {typeof methods.formState.errors.name?.message === "string" ? methods.formState.errors.name?.message : ""}
        </p>
      </label>
      <label className="block">
        Email
        <Input {...methods.register("email")} type="email" placeholder="e.g. jane@company.com" />
        <p className="text-sm text-red-500 mt-1">
          {typeof methods.formState.errors.email?.message === "string" ? methods.formState.errors.email?.message : ""}
        </p>
      </label>
    </div>
  );
}

function JobInfoStep({ methods }: { methods: ReturnType<typeof useForm> }) {
  return (
    <div className="space-y-4">
      <label className="block">
        Position
        <Input {...methods.register("position")} placeholder="e.g. Product Manager" />
        <p className="text-sm text-red-500 mt-1">
          {typeof methods.formState.errors.position?.message === "string" ? methods.formState.errors.position?.message : ""}
        </p>
      </label>
      <label className="block">
        Department
        <Input {...methods.register("department")} placeholder="e.g. Engineering" />
        <p className="text-sm text-red-500 mt-1">
          {typeof methods.formState.errors.department?.message === "string" ? methods.formState.errors.department?.message : ""}
        </p>
      </label>
    </div>
  );
}

function DocumentUploadStep({ methods }: { methods: ReturnType<typeof useForm> }) {
  const value = methods.watch("document");
  return (
    <div className="space-y-4">
      <label className="block">
        Upload Offer Letter/ID (PDF, optional)
        <Input
          type="file"
          accept=".pdf"
          onChange={e => {
            methods.setValue("document", e.target.files?.[0]);
          }}
        />
      </label>
      {value && value.name && (
        <div className="text-green-600 text-sm">
          Selected: {value.name}
        </div>
      )}
    </div>
  );
}

export function OnboardingWizardDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const methods = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    mode: "onTouched",
  });

  const handleNext = async () => {
    const valid = await methods.trigger(step === 0 ? ["name", "email"] : ["position", "department"]);
    if (valid) setStep(s => s + 1);
  };

  const handleBack = () => setStep(s => s - 1);

  const onSubmit = (data: OnboardingFormData) => {
    setOpen(false);
    setStep(0);
    methods.reset();
    // Here you would submit to backend, for now we just show a toast
    // or call a callback prop
    // toast({ title: "Onboarding complete!", description: `${data.name} added to employees.` });
    alert("Onboarding complete! " + JSON.stringify({ ...data, document: data.document?.name || "" }, null, 2));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-400 px-8 shadow-xl text-lg">Onboard New Employee</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Employee Onboarding</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center gap-3 mb-6">
          {steps.map((stepObj, idx) => (
            <div key={stepObj.label} className="flex items-center">
              <stepObj.icon className={cn("w-6 h-6", idx === step ? "text-blue-500" : "text-gray-400")} />
              {idx < steps.length - 1 && (
                <div className={cn("mx-2 h-1 w-8 rounded bg-gradient-to-r", idx < step ? "from-blue-500 to-blue-400" : "from-gray-200 to-gray-400")}></div>
              )}
            </div>
          ))}
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-6"
            autoComplete="off"
          >
            {step === 0 && <PersonalInfoStep methods={methods} />}
            {step === 1 && <JobInfoStep methods={methods} />}
            {step === 2 && <DocumentUploadStep methods={methods} />}
            <div className="flex justify-between">
              <Button type="button" disabled={step === 0} variant="secondary" onClick={handleBack}>Back</Button>
              {step < steps.length - 1 ? (
                <Button type="button" onClick={handleNext}>Next</Button>
              ) : (
                <Button type="submit" className="bg-green-600 hover:bg-green-700">Finish</Button>
              )}
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
