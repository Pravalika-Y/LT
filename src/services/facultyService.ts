import { Faculty } from "@/Components/Faculty/Faculty.types";
import { mockFaculty } from "@/Components/Faculty/mockData";


class FacultyService {
  private delay(ms: number = 300): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async getAllFaculty(): Promise<Faculty[]> {
    await this.delay();
    return [...mockFaculty];
  }
  async getFacultyById(id: string): Promise<Faculty | undefined> {
    await this.delay();
    return mockFaculty.find((f) => f.id === id);
  }
  async createFaculty(faculty: Omit<Faculty, "id">): Promise<Faculty> {
    await this.delay();
    const newFaculty: Faculty = {
      ...faculty,
      id: `FAC${Math.floor(Math.random() * 10000)}`,
    };
    return newFaculty;
  }
  async updateFaculty(id: string, updates: Partial<Faculty>): Promise<Faculty> {
    await this.delay();
    const faculty = await this.getFacultyById(id);
    if (!faculty) {
      throw new Error(`Faculty with ID ${id} not found`);
    }
    return { ...faculty, ...updates };
  }

  async deleteFaculty(id: string): Promise<void> {
    await this.delay();
    
    console.log(`Deleting faculty with ID: ${id}`);
  }

  async searchFaculty(query: string): Promise<Faculty[]> {
    await this.delay();
    const lowerQuery = query.toLowerCase();
    return mockFaculty.filter(
      (f) =>
        f.firstName.toLowerCase().includes(lowerQuery) ||
        f.lastName?.toLowerCase().includes(lowerQuery) ||
        f.subject.toLowerCase().includes(lowerQuery)
    );
  }
  async filterBySubject(subject: string): Promise<Faculty[]> {
    await this.delay();
    if (subject === "all") return mockFaculty;
    return mockFaculty.filter((f) => f.subject === subject);
  }
}

export const facultyService = new FacultyService();
