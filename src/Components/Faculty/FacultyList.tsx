// src/Components/Faculty/FacultyList.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Plus, MoreVertical, Filter, Search, ChevronDown } from "lucide-react";
import { CreateFacultyDialog } from "./CreateFacultyDialog";
import { EditFacultyDialog } from "./EditFacultyDialog"; // ✅ Only import — don't redefine!
import { Button } from "@/Components/global/button";
import { Input } from "@/Components/global/input";
import { Checkbox } from "@/Components/global/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/global/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/global/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/global/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/global/dropdown-menu";
import { Label } from "@/Components/global/label";
import { useToast } from "@/hooks/use-toast";
import { Faculty } from "./Faculty.types";
import { facultyService } from "@/services/facultyService";
import styles from "./Faculty.module.css";

const FacultyList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = async () => {
    try {
      setLoading(true);
      const data = await facultyService.getAllFaculty();
      setFacultyList(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load faculty data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredFaculty = facultyList.filter((faculty) => {
    const matchesSearch =
      faculty.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.mobile.includes(searchQuery);

    const matchesSubject = selectedSubjects.length === 0 || selectedSubjects.includes(faculty.subject);

    return matchesSearch && matchesSubject;
  });

  const handleView = (id: string) => {
    navigate(`/faculty/${id}`);
  };

  const handleEdit = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (updatedFaculty: Faculty) => {
    try {
      await facultyService.updateFaculty(updatedFaculty.id, updatedFaculty);
      setFacultyList((prev) =>
        prev.map((f) => (f.id === updatedFaculty.id ? updatedFaculty : f))
      );
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

  const handleCreateFaculty = async (newFaculty: Omit<Faculty, "id">) => {
    try {
      const createdFaculty = await facultyService.createFaculty(newFaculty);
      setFacultyList((prev) => [...prev, createdFaculty]);
      setCreateDialogOpen(false);
      toast({
        title: "Success",
        description: "Faculty created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create faculty",
        variant: "destructive",
      });
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSubjects([]);
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const uniqueSubjects = Array.from(new Set(facultyList.map((f) => f.subject)));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading faculty data...
      </div>
    );
  }

  return (
    <div className={styles.facultyContainer}>
      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 font-medium">
            <Filter className="h-4 w-4" />
            Filters
          </div>

          <div className="relative flex-1 min-w-[200px] max-w-[300px]">
            <Input
              placeholder="Search by Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                Filter by subject
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-3">
              <div className="space-y-2">
                {uniqueSubjects.map((subject) => (
                  <div key={subject} className="flex items-center gap-2">
                    <Checkbox
                      id={`subject-${subject}`}
                      checked={selectedSubjects.includes(subject)}
                      onCheckedChange={() => toggleSubject(subject)}
                    />
                    <label
                      htmlFor={`subject-${subject}`}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {subject}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            onClick={clearFilters}
            disabled={!searchQuery && selectedSubjects.length === 0}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Faculty Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Faculty ID</TableHead>
              <TableHead>Faculty Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Faculty Mobile</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFaculty.map((faculty) => (
              <TableRow key={faculty.id}>
                <TableCell className="font-medium">{faculty.id}</TableCell>
                <TableCell>
                  {faculty.firstName} {faculty.lastName}
                </TableCell>
                <TableCell>{faculty.subject}</TableCell>
                <TableCell>{faculty.email || "N/A"}</TableCell>
                <TableCell>{faculty.mobile}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(faculty.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(faculty)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Floating Create Button */}
      <Button
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg"
        size="icon"
        onClick={() => setCreateDialogOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Dialogs */}
      <CreateFacultyDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreate={handleCreateFaculty}
      />
      <EditFacultyDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        faculty={selectedFaculty}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default FacultyList;