"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, CalendarDays } from 'lucide-react';

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const resortName = searchParams.get('resortName') || "your selected resort";
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-lg text-center shadow-xl p-6 sm:p-8">
        <CardHeader>
          <CheckCircle size={64} className="mx-auto mb-6 text-green-500" />
          <CardTitle className="text-3xl font-bold text-primary">Booking Request Received!</CardTitle>
          <CardDescription className="text-lg mt-2">
            Thank you for choosing Occasion Stays.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your booking request for <strong className="text-foreground">{resortName}</strong> has been successfully submitted.
            We will contact you shortly via email with confirmation and payment details.
          </p>
          {(checkIn && checkOut) && (
            <div className="text-left bg-muted p-4 rounded-md">
                <h3 className="font-semibold text-lg mb-2 flex items-center"><CalendarDays size={20} className="mr-2 text-primary"/>Stay Details:</h3>
                <p><strong>Resort:</strong> {resortName}</p>
                <p><strong>Check-in:</strong> {checkIn}</p>
                <p><strong>Check-out:</strong> {checkOut}</p>
            </div>
          )}
          <Button asChild size="lg" className="w-full mt-6 bg-primary hover:bg-primary/90">
            <Link href="/">
              <Home size={20} className="mr-2" /> Back to Homepage
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
