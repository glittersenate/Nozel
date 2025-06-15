
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ConfettiExplosion from "@/components/ui/ConfettiExplosion";
import { CreateReviewForm } from "./CreateReviewForm";

export const CreateReviewDialog = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    setOpen(false);
    setTimeout(() => setSuccess(false), 1200);
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
          <CreateReviewForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </>
  );
};
