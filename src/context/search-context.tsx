import { createContext } from "react";
import { Customer, Employee, Invoice, Order } from "types";

interface SearchContextProps {
  isLoadingCustomers: boolean;
  searchCustomers: (searchInput: string) => Promise<Customer[]>;
  searchCustomersIDsOnly: (searchInput: string) => string[];
  searchCustomersWithPagination: (
    searchInput: string,
  ) => Promise<{ customerList: Customer[]; nextToken: string | null }>;
  isLoadingEmployees: boolean;
  searchEmployees: (searchInput: string) => Promise<Employee[]>;
  searchEmployeesIDsOnly: (searchInput: string) => string[];
  searchEmployeesWithPagination: (
    searchInput: string,
  ) => Promise<{ employeeList: Employee[]; nextToken: string | null }>;
  isLoadingOrders: boolean;
  searchOrders: (searchInput: string) => Promise<Order[]>;
  searchOrdersIDsOnly: (searchInput: string) => string[];
  searchOrdersWithPagination: (
    searchInput: string,
  ) => Promise<{ orderList: Order[]; nextToken: string | null }>;
  isLoadingInvoices: boolean;
  searchInvoices: (searchInput: string) => Promise<Invoice[]>;
  searchInvoicesIDsOnly: (searchInput: string) => string[];
  searchInvoicesWithPagination: (
    searchInput: string,
  ) => Promise<{ invoiceList: Invoice[]; nextToken: string | null }>;
}

const SearchContext = createContext<SearchContextProps>({
  isLoadingCustomers: false,
  searchCustomers: () => Promise.resolve([]),
  searchCustomersIDsOnly: () => [],
  searchCustomersWithPagination: () =>
    Promise.resolve({ customerList: [], nextToken: null }),
  isLoadingEmployees: false,
  searchEmployees: () => Promise.resolve([]),
  searchEmployeesIDsOnly: () => [],
  searchEmployeesWithPagination: () =>
    Promise.resolve({ employeeList: [], nextToken: null }),
  isLoadingOrders: false,
  searchOrders: () => Promise.resolve([]),
  searchOrdersIDsOnly: () => [],
  searchOrdersWithPagination: () =>
    Promise.resolve({ orderList: [], nextToken: null }),
  isLoadingInvoices: false,
  searchInvoices: () => Promise.resolve([]),
  searchInvoicesIDsOnly: () => [],
  searchInvoicesWithPagination: () =>
    Promise.resolve({ invoiceList: [], nextToken: null }),
});

export default SearchContext;
