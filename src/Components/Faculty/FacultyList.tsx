import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Plus, MoreVertical, Filter, Search, ChevronDown } from "lucide-react";
import { CreateFacultyDialog } from "./CreateFacultyDialog";
import { EditFacultyDialog } from "./EditFacultyDialog";
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
import { useToast } from "@/hooks/use-toast";
import { Faculty } from "./Faculty.types";
import { facultyService } from "@/services/facultyService";

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
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <p className="text-gray-500">Loading faculty data...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 font-medium text-gray-700">
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
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
            className="text-gray-600 hover:text-gray-900"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Faculty Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Faculty ID</TableHead>
                <TableHead className="font-semibold text-gray-700">Faculty Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Subject</TableHead>
                <TableHead className="font-semibold text-gray-700">Email</TableHead>
                <TableHead className="font-semibold text-gray-700">Faculty Mobile</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaculty.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No faculty members found
                  </TableCell>
                </TableRow>
              ) : (
                filteredFaculty.map((faculty) => (
                  <TableRow key={faculty.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{faculty.id}</TableCell>
                    <TableCell>
                      {faculty.firstName} {faculty.lastName}
                    </TableCell>
                    <TableCell>{faculty.subject}</TableCell>
                    <TableCell className="text-gray-600">{faculty.email || "N/A"}</TableCell>
                    <TableCell>{faculty.mobile}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
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
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {filteredFaculty.length > 0 ? `1 - ${filteredFaculty.length} of ${filteredFaculty.length}` : "0 of 0"}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Items per page:</span>
            <Select defaultValue="07">
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="07">07</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Floating Create Button */}
      <Button
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
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