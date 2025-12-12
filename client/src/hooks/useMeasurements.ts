import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import {
  getMeasurements,
  createMeasurement,
  deleteMeasurement,
  migrateLocalStorageData,
  type Measurement,
  type MeasurementInput,
} from '@/lib/measurementService';

// Query key factory
const measurementKeys = {
  all: ['measurements'] as const,
  byUser: (userId: string) => [...measurementKeys.all, userId] as const,
};

// Hook to fetch measurements
export function useMeasurements() {
  const { user } = useAuth();

  return useQuery({
    queryKey: user ? measurementKeys.byUser(user.uid) : ['measurements', 'anonymous'],
    queryFn: async () => {
      if (!user) return [];
      return await getMeasurements(user.uid);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!user,
  });
}

// Hook to create a measurement
export function useCreateMeasurement() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MeasurementInput) => {
      if (!user) throw new Error('Usuário não autenticado');
      return await createMeasurement(user.uid, data);
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({
          queryKey: measurementKeys.byUser(user.uid),
        });
      }
    },
  });
}

// Hook to delete a measurement
export function useDeleteMeasurement() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (measurementId: string) => {
      if (!user) throw new Error('Usuário não autenticado');
      return await deleteMeasurement(user.uid, measurementId);
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({
          queryKey: measurementKeys.byUser(user.uid),
        });
      }
    },
  });
}

// Hook to migrate localStorage data
export function useMigrateLocalStorage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Usuário não autenticado');
      return await migrateLocalStorageData(user.uid);
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({
          queryKey: measurementKeys.byUser(user.uid),
        });
      }
    },
  });
}
