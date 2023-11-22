'use client'
import React, { useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { DataTable, DataTableFilterMeta, DataTableSelectEvent, DataTableUnselectEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ListUsers from '@/app/components/ListUsers';
import { Button } from 'primereact/button';

interface TimeBalance {
  year: number;
  balance: number;
}

interface TimeRequests {
  status: string;
  notes: string;
}

interface User {
  firstname: string;
  lastname: string;
  dept: string;
  timebalance: TimeBalance[];
  timerequests: TimeRequests[];
}

interface NewResult {
  firstname: string;
  lastname: string;
  dept: string;
  year: number;
  balance: number;
  status: string;
  notes: string;
}

interface ColumnDefinition {
  field: keyof NewResult;
  header: string;
}

const EmployeeTable: React.FC = () => {
  const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };

  const [result, setResult] = useState<User[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<NewResult | null>(null);
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [loading, setLoading] = useState<boolean>(true);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  useEffect(() => {
    const getResults = async () => {
      try {
        const fetchedResults = await ListUsers();
        setResult(fetchedResults);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch users: ', error);
      }
    };
  
    if (result.length === 0) {
      getResults();
    }
  }, [result]);

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, global: { value, matchMode: FilterMatchMode.CONTAINS } }));
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters(defaultFilters);
    setGlobalFilterValue('');
  };

  const renderHeader = () => (
    <div className="flex justify-content-between">
      <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
      </span>
    </div>
  );

  const transformData = (results: User[]): NewResult[] => {
    return results.flatMap((result) => {
      let timeRequestData = [];
  
      if (!result.timerequests || result.timerequests.length === 0) {
        const emptyTimeBalance = { year: 0, balance: 0 };
        const emptyResult = {
          firstname: result.firstname,
          lastname: result.lastname,
          dept: result.dept,
          ...emptyTimeBalance,
          status: "",
          notes: "",
        };
        timeRequestData.push(emptyResult);
      } else {
        timeRequestData = result.timerequests.map((timeRequest, index) => {
          const timeBalanceDataItem = result.timebalance[index];
  
          return {
            firstname: result.firstname,
            lastname: result.lastname,
            dept: result.dept,
            year: timeBalanceDataItem.year,
            balance: timeBalanceDataItem.balance,
            status: timeRequest.status || "",
            notes: timeRequest.notes || "",
          };
        });
      }
  
      return timeRequestData;
    });
  };

  const transformedResult = transformData(result);
  console.log(transformedResult)

  // const pendingRequest = (transformedResult: any) => {
  //   transformedResult.map((data: any) => {
  //     if (!data.status) {

  //     }
  //   })
  // }

  // pendingRequest(transformedResult);

  const columns: ColumnDefinition[] = [
    { field: 'firstname', header: 'First Name' },
    { field: 'lastname', header: 'Last Name' },
    { field: 'dept', header: 'Department' },
    { field: 'year', header: 'Yearly Allowed' },
    { field: 'balance', header: 'Balance' },
    { field: 'status', header: 'Status' },
  ];

  const onRowSelect = (event: DataTableSelectEvent) => {
    console.log(`selected ${event.data.firstname}`);
  };

  const onRowUnselect = (event: DataTableUnselectEvent) => {
    console.log(`${event.data.firstname} Unselected`);
  };

  const header = renderHeader();

  return (
    <DataTable
      value={transformedResult}
      selectionMode="single"
      selection={selectedEmployee!}
      onSelectionChange={(e) => setSelectedEmployee(e.value)}
      onRowSelect={onRowSelect}
      onRowUnselect={onRowUnselect}
      metaKeySelection={false}
      paginator
      rows={10}
      filters={filters}
      filterDisplay="row"
      loading={loading}
      globalFilterFields={['firstname', 'lastname', 'dept', 'year', 'balance', 'status']}
      header={header}
      emptyMessage="No Employees Found"
      tableStyle={{ minWidth: '50rem' }}
    >
      {columns.map((col) => (
        <Column key={col.field} sortable field={col.field} header={col.header} />
      ))}
    </DataTable>
  );
};

export default EmployeeTable;
