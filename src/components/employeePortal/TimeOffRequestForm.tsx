
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const leaveTypeOptions = [
  { value: "vacation", label: "Vacation" },
  { value: "sick", label: "Sick" },
  { value: "personal", label: "Personal" },
];

type TimeOffRequestFormProps = {
  onSubmit: (request: {
    type: string;
    startDate: string;
    endDate: string;
    days: number;
  }) => void;
};

export const TimeOffRequestForm: React.FC<TimeOffRequestFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState({ type: "vacation", startDate: "", endDate: "", days: 1 });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ 
      ...form, 
      [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    onSubmit(form);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ ...form, startDate: "", endDate: "", days: 1 });
    }, 700);
  };

  return (
    <form className="grid sm:grid-cols-4 gap-3 mb-1" onSubmit={handleSubmit}>
      <div>
        <label className="block text-xs font-bold text-blue-200 mb-1">Type</label>
        <select
          name="type"
          className="w-full rounded border px-2 py-2 bg-blue-900/90 text-white"
          value={form.type}
          onChange={handleChange}
          required
        >
          {leaveTypeOptions.map(opt => (
            <option value={opt.value} key={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-bold text-blue-200 mb-1">Start Date</label>
        <input
          type="date"
          name="startDate"
          className="w-full rounded border px-2 py-2 bg-blue-900/90 text-white"
          value={form.startDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-blue-200 mb-1">End Date</label>
        <input
          type="date"
          name="endDate"
          className="w-full rounded border px-2 py-2 bg-blue-900/90 text-white"
          value={form.endDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-blue-200 mb-1">Days</label>
        <input
          type="number"
          name="days"
          min={1}
          max={31}
          className="w-full rounded border px-2 py-2 bg-blue-900/90 text-white"
          value={form.days}
          onChange={handleChange}
          required
        />
      </div>
      <div className="sm:col-span-4 text-right pt-2">
        <Button
          type="submit"
          className="bg-gradient-to-tr from-green-600 to-blue-500 text-white font-bold px-4 py-2 rounded"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </form>
  );
};
