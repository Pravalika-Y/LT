import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Manage Availability</DialogTitle>
          <DialogDescription>
            Set the availability schedule for {faculty?.firstName} {faculty?.lastName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 max-h-[400px] overflow-y-auto">
            {slots.map((slot, index) => (
              <div key={index} className="grid gap-4 p-4 border rounded-lg relative">
                {slots.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeSlot(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}

                <div className="space-y-2">
                  <Label>Days</Label>
                  <Select value={slot.days} onValueChange={(value) => updateSlot(index, "days", value)}>
                    <SelectTrigger>
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => updateSlot(index, "startTime", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => updateSlot(index, "endTime", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addSlot} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Another Slot
            </Button>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
