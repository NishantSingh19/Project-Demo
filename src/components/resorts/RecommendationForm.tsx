"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from 'react'; // Changed from react-dom and renamed
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

// Removed SubmitButton as it was unused after refactoring to use react-hook-form's isSubmitting

export default function RecommendationForm({ onRecommendations, setLoading }: RecommendationFormProps) {
  // useActionState is the correct hook for React 19+
  const [state, formAction] = useActionState<ActionResponse | null, FormData>(handleGenerateRecommendations, null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      occasion: "",
      preferences: "",
      budget: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    onRecommendations(null); // Clear previous recommendations
    const formData = new FormData();
    formData.append('occasion', values.occasion);
    formData.append('preferences', values.preferences);
    formData.append('budget', values.budget);
    
    // Directly call the server action, useActionState will handle its response for 'state'
    // formAction is now the function to call
    const result = await formAction(formData); 
    
    if (result.success && result.data) {
      onRecommendations(result.data.recommendations);
    } else if (result.error && !result.fieldErrors) { // Only show general error if no field errors
      // console.error(result.error); // Optionally log
      form.setError("root.serverError", { type: "custom", message: result.error });
      onRecommendations(null);
    }

    if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            form.setError(field as keyof z.infer<typeof formSchema>, { message: errors.join(', ') });
        });
    }
    setLoading(false);
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
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              {form.formState.isSubmitting ? (
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
