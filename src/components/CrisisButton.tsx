import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CrisisButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="destructive" 
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-all z-50"
        >
          <Phone className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Crisis Support</DialogTitle>
          <DialogDescription className="text-base">
            You're not alone. Help is available 24/7.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">National Crisis Hotlines</h3>
            <div className="space-y-3">
              <div className="p-4 bg-secondary rounded-lg">
                <p className="font-medium">National Suicide Prevention Lifeline</p>
                <a href="tel:988" className="text-2xl font-bold text-primary hover:underline">988</a>
                <p className="text-sm text-muted-foreground mt-1">Available 24/7</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <p className="font-medium">Crisis Text Line</p>
                <p className="text-lg font-bold text-primary">Text HOME to 741741</p>
                <p className="text-sm text-muted-foreground mt-1">Free, confidential support</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <p className="font-medium">Campus Emergency</p>
                <a href="tel:911" className="text-2xl font-bold text-destructive hover:underline">911</a>
                <p className="text-sm text-muted-foreground mt-1">For immediate emergencies</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
