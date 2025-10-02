// API Service for CRUD operations
export class ApiService {
  private baseUrl = '/api';

  // Generic CRUD operations
  async create<T>(endpoint: string, data: Partial<T>): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Create operation failed:', error);
      throw error;
    }
  }

  async read<T>(endpoint: string, id?: string): Promise<T | T[]> {
    try {
      const url = id ? `${this.baseUrl}${endpoint}/${id}` : `${this.baseUrl}${endpoint}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Read operation failed:', error);
      throw error;
    }
  }

  async update<T>(endpoint: string, id: string, data: Partial<T>): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Update operation failed:', error);
      throw error;
    }
  }

  async delete(endpoint: string, id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Delete operation failed:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();