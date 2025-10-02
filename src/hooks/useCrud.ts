import { useState, useCallback } from 'react';
import { apiService } from '../services/api';

export interface CrudState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  selectedItem: T | null;
}

export function useCrud<T extends { id: string }>(endpoint: string) {
  const [state, setState] = useState<CrudState<T>>({
    data: [],
    loading: false,
    error: null,
    selectedItem: null,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const setData = useCallback((data: T[]) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  const setSelectedItem = useCallback((item: T | null) => {
    setState(prev => ({ ...prev, selectedItem: item }));
  }, []);

  // Create operation
  const create = useCallback(async (data: Partial<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const newItem = await apiService.create<T>(endpoint, data);
      setState(prev => ({
        ...prev,
        data: [...prev.data, newItem],
        loading: false,
      }));
      return newItem;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Create failed');
      setLoading(false);
      return null;
    }
  }, [endpoint]);

  // Read operations
  const fetchAll = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiService.read<T[]>(endpoint) as T[];
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Fetch failed');
      setLoading(false);
    }
  }, [endpoint]);

  const fetchById = useCallback(async (id: string): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const item = await apiService.read<T>(endpoint, id) as T;
      setSelectedItem(item);
      setLoading(false);
      return item;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Fetch failed');
      setLoading(false);
      return null;
    }
  }, [endpoint]);

  // Update operation
  const update = useCallback(async (id: string, data: Partial<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedItem = await apiService.update<T>(endpoint, id, data);
      setState(prev => ({
        ...prev,
        data: prev.data.map(item => item.id === id ? updatedItem : item),
        selectedItem: prev.selectedItem?.id === id ? updatedItem : prev.selectedItem,
        loading: false,
      }));
      return updatedItem;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Update failed');
      setLoading(false);
      return null;
    }
  }, [endpoint]);

  // Delete operation
  const remove = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await apiService.delete(endpoint, id);
      setState(prev => ({
        ...prev,
        data: prev.data.filter(item => item.id !== id),
        selectedItem: prev.selectedItem?.id === id ? null : prev.selectedItem,
        loading: false,
      }));
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Delete failed');
      setLoading(false);
      return false;
    }
  }, [endpoint]);

  return {
    state,
    create,
    fetchAll,
    fetchById,
    update,
    remove,
    setSelectedItem,
    setError,
  };
}