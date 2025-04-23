
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Thank you! We'll get back to you soon.",
    });
  };
  
  return (
    <div className="min-h-screen bg-ayush-light">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-herb-700 text-center mb-8">
            Contact Us
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-herb-700">Get In Touch</CardTitle>
                  <CardDescription>
                    Reach out to us with any questions about herbal medicine or our services.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-herb-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-herb-700">Email</h3>
                      <p className="text-herb-600">contact@ayush-garden.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-herb-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-herb-700">Phone</h3>
                      <p className="text-herb-600">+91 123 456 7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-herb-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-herb-700">Address</h3>
                      <p className="text-herb-600">
                        AYUSH Bhawan, Block B<br />
                        CGO Complex, INA<br />
                        New Delhi - 110023
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-herb-700">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" required />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" required />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Your message here..." 
                        className="min-h-[120px]" 
                        required 
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-herb-500 hover:bg-herb-600">
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
