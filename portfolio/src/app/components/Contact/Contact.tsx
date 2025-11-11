"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ContactInfoItem } from "./ContactInfoItem";

interface Form {
  name: string;
  email: string;
  message: string;
}
interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const info = [
  { icon: "Envelope", label: "Email", value: "alex@example.com" },
  { icon: "Phone", label: "Phone", value: "+1 (555) 123-4567" },
  { icon: "Location", label: "Location", value: "New York, NY" },
];

export const Contact = () => {
  const [data, setData] = useState<Form>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((p) => ({ ...p, [name]: value }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!data.name.trim()) e.name = "Name is required";
    if (!data.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = "Invalid email";
    if (!data.message.trim()) e.message = "Message is required";
    return e;
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      (e.target as HTMLFormElement).style.animation = "shake 0.5s ease-in-out";
      setTimeout(() => ((e.target as HTMLFormElement).style.animation = ""), 500);
      return;
    }

    console.log("Submitted:", data);
    setSent(true);
    if ((window as any).confetti)
      (window as any).confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    setData({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16">Get In Touch</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={submit} className="space-y-6">
          <div>
            <Input name="name" placeholder="Your Name" value={data.name} onChange={change} />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={data.email}
              onChange={change}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={data.message}
              onChange={change}
              className="w-full p-4 bg-transparent border-2 border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-all duration-300 resize-none"
            />
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>

          <Button type="submit" className="w-full bg-primary text-dark-bg py-4 text-lg">
            Send Message
          </Button>

          {sent && (
            <div className="text-center text-primary font-semibold animate-pulse">
              Message Sent! Party Popper
            </div>
          )}
        </form>

        <div className="space-y-6">
          {info.map((c) => (
            <ContactInfoItem key={c.label} {...c} />
          ))}
        </div>
      </div>
    </div>
  );
};