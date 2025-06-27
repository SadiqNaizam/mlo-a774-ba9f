import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker, { OrderStatus } from '@/components/OrderTracker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Home, Briefcase, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder data for the page
const userProfile = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    phone: '123-456-7890',
};

const savedAddresses = [
    { type: 'Home', icon: Home, address: '123 Flavor St, Foodie City, 12345', isDefault: true },
    { type: 'Work', icon: Briefcase, address: '456 Business Ave, Downtown, 67890', isDefault: false },
];

const paymentMethods = [
    { type: 'Visa', last4: '1234', expiry: '12/26' },
];

const orderHistory = [
    { id: '#FVRSH-8726', date: '2024-07-29', total: '$45.00', status: 'In the Kitchen' as OrderStatus, items: '1x Sushi Platter, 1x Miso Soup' },
    { id: '#FVRSH-8725', date: '2024-07-28', total: '$25.50', status: 'Delivered' as OrderStatus, items: '1x Pepperoni Pizza, 1x Coke' },
    { id: '#FVRSH-8724', date: '2024-07-25', total: '$18.00', status: 'Delivered' as OrderStatus, items: '2x Cheeseburgers, 1x Fries' },
];

const UserProfilePage = () => {
    console.log('UserProfilePage loaded');

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1 container max-w-screen-lg mx-auto py-8 sm:py-12">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">My Account</h1>
                
                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="addresses">Addresses</TabsTrigger>
                        <TabsTrigger value="payments">Payments</TabsTrigger>
                        <TabsTrigger value="orders">Order History</TabsTrigger>
                    </TabsList>
                    
                    {/* Profile Tab */}
                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Manage your personal details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" defaultValue={userProfile.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" defaultValue={userProfile.email} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="tel" defaultValue={userProfile.phone} />
                                </div>
                                <Button>Save Changes</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    {/* Addresses Tab */}
                    <TabsContent value="addresses">
                        <Card>
                             <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <CardTitle>Saved Addresses</CardTitle>
                                    <CardDescription>Manage your delivery addresses.</CardDescription>
                                </div>
                                <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add New Address</Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {savedAddresses.map((addr, index) => (
                                    <div key={index} className="flex items-start justify-between p-4 border rounded-lg gap-4">
                                        <div className="flex items-start gap-4 flex-1">
                                            <addr.icon className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="font-semibold">{addr.type}</p>
                                                    {addr.isDefault && <Badge>Default</Badge>}
                                                </div>
                                                <p className="text-sm text-muted-foreground">{addr.address}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 sm:gap-2">
                                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>This action cannot be undone. This will permanently delete this address.</AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    {/* Payments Tab */}
                    <TabsContent value="payments">
                         <Card>
                             <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <CardTitle>Payment Methods</CardTitle>
                                    <CardDescription>Manage your saved cards.</CardDescription>
                                </div>
                                <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add New Card</Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               {paymentMethods.map((card, index) => (
                                   <div key={index} className="flex items-center justify-between p-4 border rounded-lg gap-4">
                                       <div className="flex items-center gap-4">
                                           <img src="https://placehold.co/40x25/EFEFEF/3B3B3B?text=VISA" alt="Visa" className="h-6 rounded-sm" />
                                           <div>
                                               <p className="font-semibold">{card.type} ending in {card.last4}</p>
                                               <p className="text-sm text-muted-foreground">Expires {card.expiry}</p>
                                           </div>
                                       </div>
                                       <div className="flex items-center gap-1 sm:gap-2">
                                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                     <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>This action will remove your payment method.</AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                       </div>
                                   </div>
                               ))}
                            </CardContent>
                         </Card>
                    </TabsContent>
                    
                    {/* Order History Tab */}
                    <TabsContent value="orders">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order History</CardTitle>
                                <CardDescription>View your past and current orders.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {orderHistory.map(order => (
                                        <Card key={order.id} className="overflow-hidden">
                                            <CardHeader className="bg-gray-50/50 p-4">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                    <div>
                                                        <p className="font-semibold text-primary">Order {order.id}</p>
                                                        <p className="text-sm text-muted-foreground">Date: {order.date} · Total: {order.total}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>{order.status}</Badge>
                                                        <Button asChild><Link to="/checkout">Re-order</Link></Button>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4 sm:p-6">
                                                <p className="text-sm font-medium mb-4">Items: <span className="text-muted-foreground font-normal">{order.items}</span></p>
                                                <OrderTracker currentStatus={order.status} />
                                            </CardContent>
                                        </Card>
                                    ))}
                                    {orderHistory.length === 0 && (
                                        <div className="text-center py-12 text-muted-foreground">
                                            <p>You haven't placed any orders yet.</p>
                                            <Button asChild className="mt-4"><Link to="/restaurant-listing">Start Ordering</Link></Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
};

export default UserProfilePage;