import { useState, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/global/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/global/select";
import { Button } from "@/Components/global/button";
import { Label } from "@/Components/global/label";
import { Input } from "@/Components/global/input";
import { Faculty, AvailabilitySlot } from "./Faculty.types";

interface ManageAvailabilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faculty: Faculty | null;
  onSave: (faculty: Faculty) => void;
}

export const ManageAvailabilityDialog = ({
  open,
  onOpenChange,
  faculty,
  onSave,
}: ManageAvailabilityDialogProps) => {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);

  useEffect(() => {
    if (faculty) {
      setSlots(faculty.availability.length > 0 ? faculty.availability : [{ days: "", startTime: "", endTime: "" }]);
    }
  }, [faculty]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (faculty) {
      onSave({
        ...faculty,
        availability: slots.filter((slot) => slot.days && slot.startTime && slot.endTime),
      });
    }
  };

  const addSlot = () => {
    setSlots([...slots, { days: "", startTime: "", endTime: "" }]);
  };

  const removeSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const updateSlot = (index: number, field: keyof AvailabilitySlot, value: string) => {
    const newSlots = [...slots];
    newSlots[index] = { ...newSlots[index], [field]: value };
    setSlots(newSlots);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0">
        <div className="flex items-center justify-between border-b p-6 pb-4">
          <h2 className="text-lg font-semibold">
            Manage Availability - {faculty?.firstName} {faculty?.lastName}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Left Side - Form Section */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You can select multiple days and set the start and end times for each selected day. Use the '+' button to add more days and their corresponding timings as needed.
              </p>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {slots.map((slot, index) => (
                  <div key={index} className="grid gap-3 p-4 border rounded-lg relative">
                    {slots.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => removeSlot(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}

                    <div className="space-y-2">
                      <Label className="text-xs">Select Days</Label>
                      <Select value={slot.days} onValueChange={(value) => updateSlot(index, "days", value)}>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mon">Monday</SelectItem>
                          <SelectItem value="Tue">Tuesday</SelectItem>
                          <SelectItem value="Wed">Wednesday</SelectItem>
                          <SelectItem value="Thu">Thursday</SelectItem>
                          <SelectItem value="Fri">Friday</SelectItem>
                          <SelectItem value="Sat">Saturday</SelectItem>
                          <SelectItem value="Sun">Sunday</SelectItem>
                          <SelectItem value="Mon, Tue, Wed">Mon, Tue, Wed</SelectItem>
                          <SelectItem value="Mon, Wed, Fri">Mon, Wed, Fri</SelectItem>
                          <SelectItem value="Tue, Thu">Tue, Thu</SelectItem>
                          <SelectItem value="Mon, Tue, Wed, Thu, Fri">Mon-Fri</SelectItem>
                          <SelectItem value="Sat, Sun">Sat, Sun</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 space-y-2">
                        <Input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => updateSlot(index, "startTime", e.target.value)}
                          className="h-9"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground pt-2">to</span>
                      <div className="flex-1 space-y-2">
                        <Input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => updateSlot(index, "endTime", e.target.value)}
                          className="h-9"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addSlot} className="w-full" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Availability
                </Button>
              </div>
            </div>

            {/* Right Side - Current Availability Display */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Current Availability</h3>
              {faculty?.availability && faculty.availability.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-2 bg-muted/50">
                    <div className="p-3 font-medium text-sm border-r">Days</div>
                    <div className="p-3 font-medium text-sm">Time</div>
                  </div>
                  {faculty.availability.map((slot, index) => (
                    <div key={index} className="grid grid-cols-2 border-t">
                      <div className="p-3 text-sm border-r">{slot.days}</div>
                      <div className="p-3 text-sm">{slot.startTime} - {slot.endTime}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg p-8 text-center">
                  <p className="text-sm text-muted-foreground">No availability set yet</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 px-6 pb-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
