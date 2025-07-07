import { createContext } from "react";
import { CurrentData, Customer, Employee, Invoice, Order } from "types";

interface DataContextProps {
  customer: Customer | null;
  setCustomer: (value: Customer | null) => void;
  order: Order | null;
  setOrder: (value: Order | null) => void;
  employee: Employee | null;
  setEmployee: (value: Employee | null) => void;
  invoice: Invoice | null;
  setInvoice: (value: Invoice | null) => void;
  isLoadingStateEntities: boolean;
  setIsLoadingStateEntities: (value: boolean) => void;
  isLoadingCurrentData: boolean;
  setIsLoadingCurrentData: (value: boolean) => void;
  currentData: CurrentData | null;
  setCurrentData: (value: CurrentData | null) => void;
}

const DataContext = createContext<DataContextProps>({
  isLoadingStateEntities: false,
  setIsLoadingStateEntities: () => {},
  isLoadingCurrentData: false,
  setIsLoadingCurrentData: () => {},
  customer: null,
  setCustomer: () => {},
  order: null,
  setOrder: () => {},
  employee: null,
  setEmployee: () => {},
  invoice: null,
  setInvoice: () => {},
  currentData: null,
  setCurrentData: () => {},
});

export default DataContext;
