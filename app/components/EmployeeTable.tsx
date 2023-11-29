'use client'
import React, { useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { DataTable, DataTableFilterMeta, DataTableSelectEvent, DataTableUnselectEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ListUsers from '@/app/components/ListUsers';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';

interface TimeBalance {
  year: number;
  balance: number;
}

interface TimeRequests {
  status: string;
  notes: string;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  dept: string;
  timebalance: TimeBalance[];
  timerequests: TimeRequests[];
}

interface NewResult {
  id: number;
  firstname: string;
  lastname: string;
  dept: string;
  year: number;
  balance: number;
}

interface StatusResult {
  status: string;
  notes: string;
}

interface ColumnDefinition {
  field: keyof NewResult;
  header: string;
}

interface StatusDefinition {
  field: keyof StatusResult;
  header: string;
}

const EmployeeTable: React.FC = () => {
  const router = useRouter();
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
        const fetchedResults = await ListUsers(0);
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
          id: result.id,
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
            id: result.id,
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

  const columns: ColumnDefinition[] = [
    { field: 'firstname', header: 'First Name' },
    { field: 'lastname', header: 'Last Name' },
    { field: 'dept', header: 'Department' },
    { field: 'year', header: 'Yearly Allowed' },
    { field: 'balance', header: 'Balance' },
  ];

  const statuses: StatusDefinition[] = [
    { field: 'status', header: 'Requests' }
  ]

  const onRowSelect = (event: DataTableSelectEvent) => {
    router.push(`/Requests/${event.data.id}`);
  };

  const header = renderHeader();

  return (
    <DataTable
      value={transformedResult}
      paginator
      rows={10}
      filters={filters}
      filterDisplay="row"
      selectionMode='single'
      selection={selectedEmployee!}
      onSelectionChange={(e: any) => setSelectedEmployee(e.value)}
      loading={loading}
      onRowSelect={onRowSelect}
      metaKeySelection={false}
      globalFilterFields={['firstname', 'lastname', 'dept', 'year', 'balance', 'status']}
      header={header}
      emptyMessage="No Employees Found"
      tableStyle={{ minWidth: '50rem' }}
    >
      {columns.map((col) => (
        <Column key={col.field} sortable field={col.field} header={col.header} />
      ))}
      {statuses.map((col, idx) => {
        return (
          <Column key={col.field} sortable field={col.field} header={col.header} />
        )
      }
      )}

    </DataTable>
  );
};

export default EmployeeTable;
