"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Users, CreditCard, Loader2, MapPin } from "lucide-react";
import { getResortById } from '@/lib/data';
import type { Resort } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  checkInDate: z.date({ required_error: "Check-in date is required." }),
  checkOutDate: z.date({ required_error: "Check-out date is required." }),
  numberOfGuests: z.coerce.number().min(1, { message: "At least one guest is required." }).max(10, { message: "Maximum 10 guests allowed." }),
}).refine(data => data.checkOutDate > data.checkInDate, {
  message: "Check-out date must be after check-in date.",
  path: ["checkOutDate"],
});

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const resortId = params.resortId as string;
  
  const [resort, setResort] = useState<Resort | null | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (resortId) {
      const foundResort = getResortById(resortId);
      setResort(foundResort);
    }
  }, [resortId]);

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      numberOfGuests: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof bookingFormSchema>) {
    setIsSubmitting(true);
    // Simulate API call for booking
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);

    toast({
      title: "Booking Submitted!",
      description: `Your booking request for ${resort?.name} has been submitted. We will contact you shortly.`,
      duration: 5000,
    });
    
    router.push(`/booking/confirmation?resortName=${encodeURIComponent(resort?.name || 'Resort')}&checkIn=${format(values.checkInDate, 'PPP')}&checkOut=${format(values.checkOutDate, 'PPP')}`);
  }

  if (resort === undefined) {
    return (
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-12 w-2/3 mb-4" />
        <Skeleton className="h-8 w-1/2 mb-8" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Skeleton className="h-12 w-full" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!resort) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary">Book Your Stay</h1>
        <p className="text-xl text-muted-foreground mt-2">Complete the form below to reserve your spot at <span className="font-semibold text-foreground">{resort.name}</span>.</p>
      </div>

    <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-xl md:sticky md:top-24">
            <CardHeader>
                 <Image
                    src={resort.images[0]}
                    alt={resort.name}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover rounded-t-lg"
                    data-ai-hint="resort booking"
                />
                <CardTitle className="text-2xl pt-4">{resort.name}</CardTitle>
                <CardDescription className="flex items-center">
                    <MapPin size={16} className="mr-1" /> {resort.location}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm line-clamp-4">{resort.description}</p>
            </CardContent>
        </Card>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Reservation Details</CardTitle>
          <CardDescription>Please fill in your information to complete the booking.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="checkInDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check-in Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date(new Date().setHours(0,0,0,0)) }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="checkOutDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check-out Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < (form.getValues("checkInDate") || new Date(new Date().setHours(0,0,0,0))) }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="numberOfGuests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="10" {...field} />
                    </FormControl>
                    <FormDescription>
                      <Users size={14} className="inline-block mr-1" /> Maximum 10 guests.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" /> Submit Booking Request
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground text-center w-full">
                This is a booking request. Payment will be processed upon confirmation.
            </p>
        </CardFooter>
      </Card>
      </div>
    </div>
  );
}
