import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Fuse, { IFuseOptions } from "fuse.js";
import { useAuthContext } from "hooks";
import { QueryKeys, queryClient } from "queryClient";
import {
  Customer,
  CustomerSearchEntity,
  Employee,
  EmployeeSearchEntity,
  Invoice,
  InvoiceSearchEntity,
  Order,
  OrderSearchEntity,
} from "types";
import { getCustomerListByIDs } from "modules/customermanagement/customers/api";
import { getEmployeeListByIDs } from "modules/employeemanagement/employees/api";
import { getInvoiceListByIDs } from "modules/ordermanagement/invoices/api";
import { getOrderListByIDs } from "modules/ordermanagement/orders/api";
import { getSearchableEntityList } from "modules/workflow/search/api";
import SearchContext from "./search-context";
import utils from "utils";

type SearchProviderProps = {
  children: ReactNode;
};

const SearchContextProvider: FC<SearchProviderProps> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const authContext = useAuthContext();

  const [customersSearchInstance, setCustomersSearchInstance] =
    useState<Fuse<CustomerSearchEntity> | null>(null);
  const [customersSearchInstanceLoading, setCustomersSearchInstanceLoading] =
    useState(true);

  const [employeesSearchInstance, setEmployeesSearchInstance] =
    useState<Fuse<EmployeeSearchEntity> | null>(null);
  const [employeesSearchInstanceLoading, setEmployeesSearchInstanceLoading] =
    useState(true);

  const [ordersSearchInstance, setOrdersSearchInstance] =
    useState<Fuse<OrderSearchEntity> | null>(null);
  const [ordersSearchInstanceLoading, setOrdersSearchInstanceLoading] =
    useState(true);

  const [invoicesSearchInstance, setInvoicesSearchInstance] =
    useState<Fuse<InvoiceSearchEntity> | null>(null);
  const [invoicesSearchInstanceLoading, setInvoicesSearchInstanceLoading] =
    useState(true);

  const { data: searchableEntitiesResult, isLoading: isLoadingSearchEntities } =
    useQuery({
      queryKey: [QueryKeys.SearchableEntities],
      queryFn: async () => {
        if (authContext.isLoading) return null;

        const searchableEntities = await getSearchableEntityList();

        console.log("searchableEntities: ", searchableEntities);
        return searchableEntities;
      },
      staleTime: Infinity,
      enabled: !authContext.isLoading,
    });

  const definedCustomerSearchEntityList = useMemo(
    () =>
      searchableEntitiesResult
        ? utils.graphql.getDefinedItems(searchableEntitiesResult.customerList)
        : [],
    [searchableEntitiesResult],
  );

  const definedEmployeeSearchEntityList = useMemo(
    () =>
      searchableEntitiesResult
        ? utils.graphql.getDefinedItems(searchableEntitiesResult.employeeList)
        : [],
    [searchableEntitiesResult],
  );

  const definedOrderSearchEntityList = useMemo(
    () =>
      searchableEntitiesResult
        ? utils.graphql.getDefinedItems(searchableEntitiesResult.orderList)
        : [],
    [searchableEntitiesResult],
  );

  const definedInvoiceSearchEntityList = useMemo(
    () =>
      searchableEntitiesResult
        ? utils.graphql.getDefinedItems(searchableEntitiesResult.invoiceList)
        : [],
    [searchableEntitiesResult],
  );

  console.log(
    "definedCustomerSearchEntityList: ",
    definedCustomerSearchEntityList,
  );

  console.log(
    "definedEmployeeSearchEntityList: ",
    definedEmployeeSearchEntityList,
  );

  console.log("definedOrderSearchEntityList: ", definedOrderSearchEntityList);

  console.log(
    "definedInvoiceSearchEntityList: ",
    definedInvoiceSearchEntityList,
  );

  /**
   * Customer search
   */

  useEffect(() => {
    if (definedCustomerSearchEntityList.length === 0) {
      setCustomersSearchInstanceLoading(false);
      return;
    }

    const fuseOptions: IFuseOptions<CustomerSearchEntity> = {
      keys: ["k", "n", "s", "v", "t", "m", "e", "c", "o", "a"],
      findAllMatches: true,
      threshold: 0.3,
    };

    const fuseInstance = new Fuse<CustomerSearchEntity>(
      definedCustomerSearchEntityList,
      fuseOptions,
    );
    setCustomersSearchInstance(fuseInstance);
    setCustomersSearchInstanceLoading(false);
  }, [definedCustomerSearchEntityList]);

  useEffect(() => {
    if (!customersSearchInstance) return;
    const searchedText = searchParams.get("searchCustomer");

    if (!searchedText || searchedText === "") return;

    queryClient.invalidateQueries({
      queryKey: [QueryKeys.Customers, "search"],
    });
  }, [searchParams, customersSearchInstance]);

  const searchCustomers = async (searchInput: string) => {
    if (!customersSearchInstance || searchInput.length < 2) {
      console.log(
        "searchCustomers customersSearchInstance or searchInput is not valid",
      );
      return [];
    }

    console.log("Called searchCustomers with searchInput: ", searchInput);

    const results = customersSearchInstance.search(searchInput);

    const searchResultIDs = results.map((result) => result.item.i);

    const customerList: Customer[] =
      await getCustomerListByIDs(searchResultIDs);

    return customerList;
  };

  const searchCustomersIDsOnly = (searchInput: string) => {
    if (!customersSearchInstance || searchInput.length < 2) {
      console.log(
        "searchCustomers customersSearchInstance or searchInput is not valid",
      );
      return [];
    }

    console.log("Called searchCustomers with searchInput: ", searchInput);

    const results = customersSearchInstance.search(searchInput);

    const searchResultIDs = results.map((result) => result.item.i);

    return searchResultIDs;
  };

  const searchCustomersWithPagination = async (searchInput: string) => {
    console.log(
      "searchCustomersWithPagination called with searchInput: ",
      searchInput,
    );
    if (!customersSearchInstance || searchInput.length < 2) {
      console.log("customersSearchInstance or searchInput is not valid");
      return { customerList: [], nextToken: null };
    }

    console.log(
      "Called searchCustomers WithPagination with searchInput: ",
      searchInput,
    );

    const results = customersSearchInstance.search(searchInput);

    const searchResultIDs = results.map((result) => result.item.i);

    const customerList: Customer[] =
      await getCustomerListByIDs(searchResultIDs);

    return { customerList, nextToken: null };
  };

  console.log("isLoadingSearchEntities: ", isLoadingSearchEntities);
  console.log(
    "customersSearchInstanceLoading: ",
    customersSearchInstanceLoading,
  );

  /**
   * Employee search
   */

  useEffect(() => {
    if (definedEmployeeSearchEntityList.length === 0) {
      setEmployeesSearchInstanceLoading(false);
      return;
    }

    const fuseOptions: IFuseOptions<EmployeeSearchEntity> = {
      keys: ["p", "v", "n", "a", "e", "t", "m", "w", "c"],
      findAllMatches: true,
      threshold: 0.3,
    };

    const fuseInstance = new Fuse<EmployeeSearchEntity>(
      definedEmployeeSearchEntityList,
      fuseOptions,
    );
    setEmployeesSearchInstance(fuseInstance);
    setEmployeesSearchInstanceLoading(false);
  }, [definedEmployeeSearchEntityList]);

  useEffect(() => {
    if (!employeesSearchInstance) return;
    const searchedText = searchParams.get("searchEmployee");

    if (!searchedText || searchedText === "") return;

    queryClient.invalidateQueries({
      queryKey: [QueryKeys.Employees, "search"],
    });
  }, [searchParams, employeesSearchInstance]);

  const searchEmployees = async (searchInput: string) => {
    if (!employeesSearchInstance || searchInput.length < 2) {
      console.log(
        "searchEmployees employeesSearchInstance or searchInput is not valid",
      );
      return [];
    }

    console.log("Called searchEmployees with searchInput: ", searchInput);

    const results = employeesSearchInstance.search(searchInput);

    const searchResultIDs = results.map((result) => result.item.i);

    const employeeList: Employee[] =
      await getEmployeeListByIDs(searchResultIDs);

    return employeeList;
  };

  const searchEmployeesIDsOnly = (searchInput: string) => {
    if (!employeesSearchInstance || searchInput.length < 2) {
      console.log(
        "searchEmployees employeesSearchInstance or searchInput is not valid",
      );
      return [];
    }

    console.log("Called searchEmployees with searchInput: ", searchInput);

    const results = employeesSearchInstance.search(searchInput);

    const searchResultIDs = results.map((result) => result.item.i);

    return searchResultIDs;
  };

  const searchEmployeesWithPagination = async (searchInput: string) => {
    console.log(
      "searchEmployeesWithPagination called with searchInput: ",
      searchInput,
    );
    if (!employeesSearchInstance || searchInput.length < 2) {
      console.log("employeesSearchInstance or searchInput is not valid");
      return { employeeList: [], nextToken: null };
    }

    console.log(
      "Called searchEmployees WithPagination with searchInput: ",
      searchInput,
    );

    const results = employeesSearchInstance.search(searchInput);

    const searchResultIDs = results.map((result) => result.item.i);

    const employeeList: Employee[] =
      await getEmployeeListByIDs(searchResultIDs);

    return { employeeList, nextToken: null };
  };

  console.log(
    "employeesSearchInstanceLoading: ",
    employeesSearchInstanceLoading,
  );

  /**
   * Order search
   */

  useEffect(() => {
    if (definedOrderSearchEntityList.length === 0) {
      setOrdersSearchInstanceLoading(false);
      return;
    }

    const fuseOptions: IFuseOptions<OrderSearchEntity> = {
      keys: ["a", "v", "c"],
      findAllMatches: true,
      threshold: 0.3,
    };

    const fuseInstance = new Fuse<OrderSearchEntity>(
      definedOrderSearchEntityList,
      fuseOptions,
    );
    setOrdersSearchInstance(fuseInstance);
    setOrdersSearchInstanceLoading(false);
  }, [definedOrderSearchEntityList]);

  useEffect(() => {
    if (!ordersSearchInstance) return;
    const searchedText = searchParams.get("searchOrder");

    if (!searchedText || searchedText === "") return;

    queryClient.invalidateQueries({
      queryKey: [QueryKeys.Orders, "search"],
    });
  }, [searchParams, ordersSearchInstance]);

  const searchOrders = async (searchInput: string) => {
    if (!ordersSearchInstance || searchInput.length < 2) {
      console.log(
        "searchOrders ordersSearchInstance or searchInput is not valid",
      );
      return [];
    }

    console.log("Called searchOrders with searchInput: ", searchInput);

    const results = ordersSearchInstance.search(searchInput);

    const searchResultIDs = results.map((result) => result.item.i);

    const orderList: Order[] = await getOrderListByIDs(searchResultIDs);

    return orderList;
  };

  const searchOrdersIDsOnly = (searchInput: string) => {
    if (!ordersSearchInstance || searchInput.length < 2) {
      console.log(
        "searchOrders ordersSearchInstance or searchInput is not valid",
      );
      return [];
    }

    console.log("Called searchOrders with searchInput: ", searchInput);

    const results = ordersSearchInstance.search(searchInput);

    const searchResultIDs = results.map((result) => result.item.i);

    return searchResultIDs;
  };

  const searchOrdersWithPagination = async (searchInput: string) => {
    console.log(
      "searchOrdersWithPagination called with searchInput: ",
      searchInput,
    );
    if (!ordersSearchInstance || searchInput.length < 2) {
      console.log("ordersSearchInstance or searchInput is not valid");
      return { orderList: [], nextToken: null };
    }

    console.log(
      "Called searchOrders WithPagination with searchInput: ",
      searchInput,
    );

    const results = ordersSearchInstance.search(searchInput);

    const searchResultIDs = results.map((result) => result.item.i);

    const orderList: Order[] = await getOrderListByIDs(searchResultIDs);

    return { orderList, nextToken: null };
  };

  console.log("ordersSearchInstanceLoading: ", ordersSearchInstanceLoading);

  /**
   * Invoice search
   */

  useEffect(() => {
    if (definedInvoiceSearchEntityList.length === 0) {
      setInvoicesSearchInstanceLoading(false);
      return;
    }

    const fuseOptions: IFuseOptions<InvoiceSearchEntity> = {
      keys: ["r", "v", "c"],
      findAllMatches: true,
      threshold: 0.3,
    };

    const fuseInstance = new Fuse<InvoiceSearchEntity>(
      definedInvoiceSearchEntityList,
      fuseOptions,
    );
    setInvoicesSearchInstance(fuseInstance);
    setInvoicesSearchInstanceLoading(false);
  }, [definedInvoiceSearchEntityList]);

  useEffect(() => {
    if (!invoicesSearchInstance) return;
    const searchedText = searchParams.get("searchInvoice");

    if (!searchedText || searchedText === "") return;

    queryClient.invalidateQueries({
      queryKey: [QueryKeys.Invoices, "search"],
    });
  }, [searchParams, invoicesSearchInstance]);

  const searchInvoices = async (searchInput: string) => {
    if (!invoicesSearchInstance || searchInput.length < 2) {
      console.log(
        "searchInvoices invoicesSearchInstance or searchInput is not valid",
      );
      return [];
    }

    console.log("Called searchInvoices with searchInput: ", searchInput);

    const results = invoicesSearchInstance.search(searchInput);

    const searchResultIDs = results.map((result) => result.item.i);

    const invoiceList: Invoice[] = await getInvoiceListByIDs(searchResultIDs);

    return invoiceList;
  };

  const searchInvoicesIDsOnly = (searchInput: string) => {
    if (!invoicesSearchInstance || searchInput.length < 2) {
      console.log(
        "searchInvoices invoicesSearchInstance or searchInput is not valid",
      );
      return [];
    }

    console.log("Called searchInvoices with searchInput: ", searchInput);

    const results = invoicesSearchInstance.search(searchInput);

    const searchResultIDs = results.map((result) => result.item.i);

    return searchResultIDs;
  };

  const searchInvoicesWithPagination = async (searchInput: string) => {
    console.log(
      "searchInvoicesWithPagination called with searchInput: ",
      searchInput,
    );
    if (!invoicesSearchInstance || searchInput.length < 2) {
      console.log("invoicesSearchInstance or searchInput is not valid");
      return { invoiceList: [], nextToken: null };
    }

    console.log(
      "Called searchInvoices WithPagination with searchInput: ",
      searchInput,
    );

    const results = invoicesSearchInstance.search(searchInput);

    const searchResultIDs = results.map((result) => result.item.i);

    const invoiceList: Invoice[] = await getInvoiceListByIDs(searchResultIDs);

    return { invoiceList, nextToken: null };
  };

  console.log("invoicesSearchInstanceLoading: ", invoicesSearchInstanceLoading);

  const value = {
    isLoadingCustomers:
      isLoadingSearchEntities || customersSearchInstanceLoading,
    searchCustomers,
    searchCustomersIDsOnly,
    searchCustomersWithPagination,
    isLoadingEmployees:
      isLoadingSearchEntities || employeesSearchInstanceLoading,
    searchEmployees,
    searchEmployeesIDsOnly,
    searchEmployeesWithPagination,
    isLoadingOrders: isLoadingSearchEntities || ordersSearchInstanceLoading,
    searchOrders,
    searchOrdersIDsOnly,
    searchOrdersWithPagination,
    isLoadingInvoices: isLoadingSearchEntities || invoicesSearchInstanceLoading,
    searchInvoices,
    searchInvoicesIDsOnly,
    searchInvoicesWithPagination,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContextProvider;
