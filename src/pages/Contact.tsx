import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Bot, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-10">
      <div className="container mx-auto max-w-lg">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Get in Touch</h1>
          <p className="text-sm text-muted-foreground mt-1">Questions about your application? We're here to help.</p>
        </div>

        <div className="surface-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div>
              <Label htmlFor="contact-msg">Message</Label>
              <Textarea id="contact-msg" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" rows={5} required />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>support@finassist.ai</span>
          </div>
        </div>
      </div>
    </div>
  );
}
