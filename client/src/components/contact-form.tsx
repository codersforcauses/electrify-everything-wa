import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const initialForm: ContactFormData = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange =
    (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await api.post("/contact/contact/", form);
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            required
            value={form.name}
            onChange={handleChange("name")}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange("email")}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Questions or Comments
        </label>
        <Textarea
          id="message"
          required
          rows={8}
          value={form.message}
          onChange={handleChange("message")}
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong — please try again.
        </p>
      )}
      {status === "success" && (
        <p className="text-sm text-green-700">
          Thanks — we&apos;ll get back to you soon.
        </p>
      )}
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="self-end bg-[#dd42e4] text-white hover:bg-[#dd42e4]/90"
      >
        {status === "submitting" ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
}
