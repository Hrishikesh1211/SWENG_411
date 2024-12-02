import { createContext, useContext, useReducer, ReactNode } from 'react';
import type { Package, DailyStats } from '../types';

interface PackageState {
  packages: Package[];
  stats: DailyStats;
}

type PackageAction =
  | { type: 'ADD_PACKAGE'; package: Package }
  | { type: 'UPDATE_PACKAGES'; packages: Package[] }
  | { type: 'PICKUP_PACKAGES'; packageIds: string[] };

const initialState: PackageState = {
  packages: [],
  stats: {
    totalReceived: 0,
    pendingPickups: 0,
    delivered: 0,
    overdue: 0,
  },
};

function calculateStats(packages: Package[]): DailyStats {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return {
    totalReceived: packages.filter(pkg => 
      pkg.checkInDate.getTime() >= today.getTime()
    ).length,
    pendingPickups: packages.filter(pkg => 
      pkg.status === 'checked-in'
    ).length,
    delivered: packages.filter(pkg => 
      pkg.status === 'picked-up' && 
      pkg.pickUpDate?.getTime() >= today.getTime()
    ).length,
    overdue: packages.filter(pkg => 
      pkg.status === 'overdue'
    ).length,
  };
}

function packageReducer(state: PackageState, action: PackageAction): PackageState {
  switch (action.type) {
    case 'ADD_PACKAGE': {
      const packages = [...state.packages, action.package];
      return {
        packages,
        stats: calculateStats(packages),
      };
    }
    case 'UPDATE_PACKAGES': {
      return {
        packages: action.packages,
        stats: calculateStats(action.packages),
      };
    }
    case 'PICKUP_PACKAGES': {
      const packages = state.packages.map(pkg =>
        action.packageIds.includes(pkg.id)
          ? { ...pkg, status: 'picked-up' as const, pickUpDate: new Date() }
          : pkg
      );
      return {
        packages,
        stats: calculateStats(packages),
      };
    }
    default:
      return state;
  }
}

const PackageContext = createContext<{
  state: PackageState;
  dispatch: React.Dispatch<PackageAction>;
} | null>(null);

export function PackageProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(packageReducer, initialState);

  return (
    <PackageContext.Provider value={{ state, dispatch }}>
      {children}
    </PackageContext.Provider>
  );
}

export function usePackages() {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error('usePackages must be used within a PackageProvider');
  }
  return context;
}