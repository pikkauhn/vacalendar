import React from 'react'

import ListUsers from '@/app/components/ListUsers';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const page = async () => {
    const result: any = await ListUsers();
    interface result {
        firstname: string;
        lastname: string;
        dept: string;
        timebalance: Array<{ year: number; balance: number }>;
      }
      
      interface NewResult {
        firstname: string;
        lastname: string;
        dept: string;
        year: number;
        balance: number;
      }
      
      function transformData(results: result[]): NewResult[] {
        const newResult: NewResult[] = [];
        for (const result of results) {
          for (const timeBalance of result.timebalance) {
            newResult.push({
              firstname: result.firstname,
              lastname: result.lastname,
              dept: result.dept,
              year: timeBalance.year,
              balance: timeBalance.balance,
            });
          }
        }
        return newResult;
      }
      
      const transformedResult = transformData(result);
      const columns = [
        {field: 'firstname', header: 'First Name'},
        {field: 'lastname', header: 'Last Name'},
        {field: 'year', header: 'Yearly Allowed'},
        {field: 'balance', header: 'Balance'},
      ]
      

    return (
        <>
        <DataTable value={transformedResult} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </>
    )
}

export default page