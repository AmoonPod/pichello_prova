"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "../ui/use-toast";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Simulate async function to send the form
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Show toast notification
    toast({ title: "Messaggio inviato con successo!", duration: 5000 });
    // Clear the inputs
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
  };

  return (
    <form className="mt-12 grid gap-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Nome e cognome</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Mario Rossi"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Il tuo numero di telefono</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="346..."
          />
        </div>
        <div>
          <Label htmlFor="email">La tua email</Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mariorossi@gmail.com"
          />
        </div>
      </div>
      <Label htmlFor="message">Messaggio</Label>
      <Textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ciao, sono interessato/a alle vostre..."
        rows={5}
      />
      <Button type="submit" className="mt-4">
        Invia messaggio
      </Button>
    </form>
  );
};

export default ContactForm;
