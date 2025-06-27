import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ClipboardList,
  ChefHat,
  Bike,
  PackageCheck,
  Icon,
} from "lucide-react";

// Define the possible order statuses
export type OrderStatus =
  | "Order Placed"
  | "In the Kitchen"
  | "Out for Delivery"
  | "Delivered";

// Define the props for the component
interface OrderTrackerProps {
  currentStatus: OrderStatus;
  className?: string;
}

// Define the steps of the order process
const orderSteps: { name: OrderStatus; icon: Icon }[] = [
  { name: "Order Placed", icon: ClipboardList },
  { name: "In the Kitchen", icon: ChefHat },
  { name: "Out for Delivery", icon: Bike },
  { name: "Delivered", icon: PackageCheck },
];

const OrderTracker: React.FC<OrderTrackerProps> = ({
  currentStatus,
  className,
}) => {
  console.log("OrderTracker loaded with status:", currentStatus);

  const currentStepIndex = orderSteps.findIndex(
    (step) => step.name === currentStatus
  );

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Track Your Order</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start justify-between">
          {orderSteps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isFuture = index > currentStepIndex;

            const iconColor =
              isCompleted || isCurrent ? "text-white" : "text-gray-500";
            const iconBgColor = isCompleted
              ? "bg-green-500"
              : isCurrent
              ? "bg-blue-500"
              : "bg-gray-200";
            const textColor = isFuture ? "text-gray-400" : "text-gray-800";
            const lineColor = isCompleted ? "bg-green-500" : "bg-gray-200";

            return (
              <React.Fragment key={step.name}>
                {/* Step Item */}
                <div className="flex flex-col items-center text-center w-24">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300",
                      iconBgColor
                    )}
                  >
                    <step.icon className={cn("h-6 w-6", iconColor)} />
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-xs sm:text-sm font-medium",
                      textColor
                    )}
                  >
                    {step.name}
                  </p>
                </div>

                {/* Connector Line (not after the last item) */}
                {index < orderSteps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-1 rounded-full mt-6 mx-2",
                      lineColor
                    )}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;