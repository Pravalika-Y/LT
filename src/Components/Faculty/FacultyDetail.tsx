import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/Components/global/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/global/card";
import { Badge } from "@/Components/global/badge";
import { useToast } from "@/hooks/use-toast";
import { Faculty } from "./Faculty.types";
import { ManageAvailabilityDialog } from "./ManageAvailabilityModal";
import { EditFacultyDialog } from "./EditFacultyDialog";
import { facultyService } from "@/services/facultyService";
import styles from "./Faculty.module.css";


const FacultyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(true);
  const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    loadFacultyDetail();
  }, [id]);

  const loadFacultyDetail = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await facultyService.getFacultyById(id);
      setFaculty(data || null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load faculty details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAvailability = async (updatedFaculty: Faculty) => {
    try {
      await facultyService.updateFaculty(updatedFaculty.id, updatedFaculty);
      setFaculty(updatedFaculty);
      setAvailabilityDialogOpen(false);
      toast({
        title: "Success",
        description: "Availability updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update availability",
        variant: "destructive",
      });
    }
  };

  const handleSaveEdit = async (updatedFaculty: Faculty) => {
    try {
      await facultyService.updateFaculty(updatedFaculty.id, updatedFaculty);
      setFaculty(updatedFaculty);
      setEditDialogOpen(false);
      toast({
        title: "Success",
        description: "Faculty updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update faculty",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className={styles.loading}>Loading...</span>
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-lg text-muted-foreground">Faculty not found</p>
        <Button onClick={() => navigate("/")}>Back to Faculty List</Button>
      </div>
    );
  }

  return (
    <div className={styles.facultyContainer}>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/faculty")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">
            {faculty.firstName} {faculty.lastName}
            <span className="text-muted-foreground ml-2">- {faculty.subject}</span>
          </h1>
        </div>
      </div>

      <div className="border-b mb-6">
        <button className="px-4 py-2 text-sm font-medium border-b-2 border-primary">
          Overview
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Basic Details</CardTitle>
            <Button variant="link" size="sm" className="text-primary" onClick={() => setEditDialogOpen(true)}>
              EDIT
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="font-medium">{faculty.firstName} {faculty.lastName}</p>
                </div>
              </div>

              {faculty.gender && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Gender</p>
                    <p className="font-medium">{faculty.gender}</p>
                  </div>
                </div>
              )}

              {faculty.dateOfBirth && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                    <p className="font-medium">{faculty.dateOfBirth}</p>
                  </div>
                </div>
              )}

              {faculty.email && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">{faculty.email || "-"}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Mobile</p>
                  <p className="font-medium">{faculty.mobile}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Availability</CardTitle>
            <Button variant="link" size="sm" className="text-primary" onClick={() => setAvailabilityDialogOpen(true)}>
              MANAGE
            </Button>
          </CardHeader>
          <CardContent>
            {faculty.availability && faculty.availability.length > 0 ? (
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
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No availability set</p>
                <Button size="sm" onClick={() => setAvailabilityDialogOpen(true)}>
                  Add Availability
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <EditFacultyDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        faculty={faculty}
        onSave={handleSaveEdit}
      />

      <ManageAvailabilityDialog
        open={availabilityDialogOpen}
        onOpenChange={setAvailabilityDialogOpen}
        faculty={faculty}
        onSave={handleSaveAvailability}
      />
    </div>
  );
};

export default FacultyDetail;
