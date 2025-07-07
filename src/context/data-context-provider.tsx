import { FC, ReactNode, useState } from "react";
import { CurrentData, Customer, Employee, Invoice, Order } from "types";
import DataContext from "./data-context";

type DataContextProviderProps = {
  children: ReactNode;
};

const DataContextProvider: FC<DataContextProviderProps> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoadingStateEntities, setIsLoadingStateEntities] =
    useState<boolean>(false);
  const [isLoadingCurrentData, setIsLoadingCurrentData] =
    useState<boolean>(false);
  const [currentData, setCurrentData] = useState<CurrentData | null>(null);

  return (
    <DataContext.Provider
      value={{
        customer,
        setCustomer,
        order,
        setOrder,
        employee,
        setEmployee,
        invoice,
        setInvoice,
        isLoadingStateEntities,
        setIsLoadingStateEntities,
        isLoadingCurrentData,
        setIsLoadingCurrentData,
        currentData,
        setCurrentData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
