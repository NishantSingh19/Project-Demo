
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useTransition } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Wand2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { handleGenerateRecommendations, type ActionResponse } from "@/lib/actions";
import type { AIRecommendation } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { budgetOptions, occasions, preferencesList } from "@/lib/data";

const formSchema = z.object({
  occasion: z.string().min(1, "Please select an occasion."),
  preferences: z.string().min(3, "Please describe your preferences (min. 3 characters)."),
  budget: z.string().min(1, "Please select your budget range."),
});

type RecommendationFormProps = {
  onRecommendations: (recommendations: AIRecommendation[] | null) => void;
  setLoading: (loading: boolean) => void;
};

export default function RecommendationForm({ onRecommendations, setLoading }: RecommendationFormProps) {
  const [actionResponse, dispatchAction] = useActionState<ActionResponse | null, FormData>(handleGenerateRecommendations, null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      occasion: "",
      preferences: "",
      budget: "",
    },
  });

  // Effect to handle the result from the server action
  useEffect(() => {
    if (actionResponse === null) { // Initial state, do nothing
      return;
    }

    // Only process if the transition is complete
    if (!isPending) {
      if (actionResponse.success && actionResponse.data) {
        onRecommendations(actionResponse.data.recommendations);
      } else if (actionResponse.error && !actionResponse.fieldErrors) {
        form.setError("root.serverError", { type: "custom", message: actionResponse.error });
        onRecommendations(null);
      }

      if (actionResponse.fieldErrors) {
        Object.entries(actionResponse.fieldErrors).forEach(([field, errors]) => {
          form.setError(field as keyof z.infer<typeof formSchema>, { message: errors.join(', ') });
        });
      }
      setLoading(false); // Signal parent that loading is complete
    }
  }, [actionResponse, isPending, form, onRecommendations, setLoading]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true); // Signal parent that loading has started
    onRecommendations(null); // Clear previous recommendations
    form.clearErrors(); // Clear previous RHF errors

    const formData = new FormData();
    formData.append('occasion', values.occasion);
    formData.append('preferences', values.preferences);
    formData.append('budget', values.budget);
    
    startTransition(() => {
      dispatchAction(formData);
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Wand2 className="text-primary" />
          Personalized Resort Finder
        </CardTitle>
        <CardDescription>
          Let our AI help you find the perfect resort for your occasion, preferences, and budget.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occasion</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the occasion for your trip" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {occasions.map(occasion => (
                        <SelectItem key={occasion} value={occasion}>{occasion}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferences</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., beachfront, spa, kid-friendly activities, good for hiking"
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {budgetOptions.map(budget => (
                         <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root?.serverError && (
              <FormMessage>{form.formState.errors.root.serverError.message}</FormMessage>
            )}
            <Button type="submit" disabled={isPending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Get Recommendations
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
