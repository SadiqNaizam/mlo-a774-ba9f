import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/CartItem';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast"

// Lucide Icons
import { CreditCard, Wallet, Landmark, Loader2 } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  address: z.string().min(5, { message: "Street address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  zip: z.string().regex(/^\d{5}(?:[-\s]\d{4})?$/, { message: "Must be a valid ZIP code." }),
  paymentMethod: z.enum(['card', 'paypal', 'bank'], {
    required_error: "You need to select a payment method.",
  }),
});

// Sample data for cart items
const initialCartItems = [
  {
    id: 1,
    name: 'Spicy Beef Tacos',
    price: 12.99,
    quantity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1599974579605-59dd79b183c4?q=80&w=200&h=200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Guacamole & Chips',
    price: 6.50,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1548463697-5a2b128c4cea?q=80&w=200&h=200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Horchata',
    price: 3.00,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1621501115319-333d8b02137e?q=80&w=200&h=200&auto=format&fit=crop',
  },
];

const CheckoutPage: React.FC = () => {
  console.log('CheckoutPage loaded');
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "123 Flavor St",
      city: "Tastytown",
      zip: "12345",
      paymentMethod: "card",
    },
  });

  const handleQuantityChange = (id: string | number, newQuantity: number) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = (id: string | number) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const deliveryFee = 5.00;
  const taxes = useMemo(() => subtotal * 0.08, [subtotal]);
  const total = useMemo(() => subtotal + deliveryFee + taxes, [subtotal, deliveryFee, taxes]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Submitted:", values);
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        toast({
            title: "Order Placed!",
            description: "Your delicious food is on its way.",
        });
        // Here you would typically redirect the user or clear the cart.
    }, 2000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 lg:py-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8">Checkout</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Form Details */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="zip" render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl><Input placeholder="12345" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Select how you'd like to pay for your order.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormItem>
                            <FormControl>
                              <RadioGroupItem value="card" id="card" className="sr-only" />
                            </FormControl>
                            <Label htmlFor="card" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                              <CreditCard className="mb-3 h-6 w-6" /> Credit Card
                            </Label>
                          </FormItem>
                          <FormItem>
                            <FormControl>
                              <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                            </FormControl>
                             <Label htmlFor="paypal" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                              <Wallet className="mb-3 h-6 w-6" /> PayPal
                            </Label>
                          </FormItem>
                          <FormItem>
                            <FormControl>
                              <RadioGroupItem value="bank" id="bank" className="sr-only" />
                            </FormControl>
                            <Label htmlFor="bank" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                              <Landmark className="mb-3 h-6 w-6" /> Bank Transfer
                            </Label>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="pt-4"/>
                    </FormItem>
                  )} />
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="lg:sticky lg:top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-h-64 overflow-y-auto pr-2 -mr-2">
                    {cartItems.length > 0 ? (
                      cartItems.map(item => (
                        <CartItem
                          key={item.id}
                          {...item}
                          onQuantityChange={handleQuantityChange}
                          onRemove={handleRemove}
                        />
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-4">Your cart is empty. <Link to="/restaurant-listing" className="text-primary hover:underline">Go add something!</Link></p>
                    )}
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2">
                    <Input id="promo" placeholder="Promo Code" />
                    <Button type="button" variant="secondary">Apply</Button>
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxes</span>
                      <span>${taxes.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" size="lg" disabled={isProcessing || cartItems.length === 0}>
                    {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </Button>
                </CardFooter>
              </Card>
            </div>

          </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;