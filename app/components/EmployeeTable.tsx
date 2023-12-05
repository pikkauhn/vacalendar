'use client';
import React, { useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { DataTable, DataTableFilterMeta, DataTableSelectEvent, DataTableUnselectEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ListUsers from '@/app/components/ListUsers';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';

import transformUserToNewResult from './TransformUser'

interface TimeBalance {
  year: number;
  balance: number;
}

interface TimeRequest {
  status: string;
  notes: string;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  dept: string;
  timebalance: TimeBalance[];
  timerequests: TimeRequest[];
}

interface NewResult {
  id: number;
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

interface StatusDefinition {
  field: keyof NewResult;
  header: string;
}

const EmployeeTable: React.FC = () => {
  const router = useRouter();
  const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };

  const [result, setResult] = useState<NewResult[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<NewResult | null>(null);
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [loading, setLoading] = useState<boolean>(true);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  useEffect(() => {
    const transformedResult: NewResult[] = []
    const getResults = async () => {   

      try {        
        const fetchedResults = await ListUsers(0);
        fetchedResults.map((user: any, idx: number) => {
          transformedResult.push(transformUserToNewResult(user));
          })          
        setResult(transformedResult);
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
        <InputText id="employeeSearch" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
      </span>
    </div>
  );

  const columns: ColumnDefinition[] = [
    { field: 'firstname', header: 'First Name' },
    { field: 'lastname', header: 'Last Name' },
    { field: 'dept', header: 'Department' },
    { field: 'year', header: 'Yearly Allowed' },
    { field: 'balance', header: 'Balance' },
  ];

  const statuses: StatusDefinition[] = [
    { field: 'status', header: 'Requests' },
  ];

  const onRowSelect = (event: DataTableSelectEvent) => {
    router.push(`/Requests/${event.data.id}`);
  };

  const header = renderHeader();

  return (
    <DataTable
      value={result}
      paginator
      rows={10}
      filters={filters}
      filterDisplay="row"
      selectionMode="single"
      selection={selectedEmployee ? selectedEmployee : null}
      onSelectionChange={(e: any) => setSelectedEmployee(e.value)}
      loading={loading}
      onRowSelect={onRowSelect}
      metaKeySelection={false}
      globalFilterFields={['firstname', 'lastname', 'dept', 'year', 'balance', 'status', 'notes']}
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
        );
      })}
    </DataTable>
  );
};

export default EmployeeTable;
