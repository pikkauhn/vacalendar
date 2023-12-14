'use client'
import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Accordion, AccordionTab, AccordionTabChangeEvent } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { User, TimeOffRequest } from '@prisma/client'
import { InputTextarea } from 'primereact/inputtextarea';



import ListUsers from '@/app/components/ListUsers';
import OrderRequests from './OrderRequests';
import UpdateRequest from './RequestResponse';

interface RequestProps {
  id: number;
}


const Requests = ({ id }: RequestProps) => {
  const [result, setResult] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [requests, setRequests] = useState<TimeOffRequest[]>([]);
  const [requestId, setRequestId] = useState<number | null>();
  const [noteValue, setNoteValue] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number | null>()  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedResults: any = await ListUsers(id);
        if (fetchedResults) {
          setLoading(false);
          setResult(fetchedResults);
          const orderedRequests = OrderRequests(fetchedResults);
          if (orderedRequests) {
            setRequests(orderedRequests);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Failed to fetch users: ', error);
        setLoading(false);
      }
    };

    fetchData();

    const cancelToken = new AbortController();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      cancelToken.abort();
      clearInterval(intervalId);
    };
  }, [id, loading]);

  const onTabChange = (e: AccordionTabChangeEvent) => {
    const selectedIndex: number | null = e.index as number | null;
    if (selectedIndex !== null) {
      const selectedData = requests[selectedIndex];
      const dataId = selectedData.id;
      setRequestId(dataId)
    } else {
      setRequestId(null)
    }
    setActiveIndex(selectedIndex)

  }

  const onDecision = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const status = (e.target as HTMLElement).innerText === 'Approve' ? 'Approved' : 'Denied';
    const requestInfo = {
      id: requestId,
      status,
      notes: noteValue,
    };
  
    try {
      await UpdateRequest(requestInfo);
      setLoading(true);
      setActiveIndex(null);
    } catch (error) {
      console.error('Error trying to update Request:', error);
    }
  };

  return (
    <div className="flex justify-content-center">
      {!loading ?
        <Card className="mt-3 w-24rem text-center mr-5" title={(requests.length > 0) ? "Time Off Requests" : "User Has No Requests"}>
          <Accordion activeIndex={activeIndex} onTabChange={(e: AccordionTabChangeEvent) => { onTabChange(e) }}>
            {requests.length > 0 &&
              requests.map((data, idx) => (
                <AccordionTab className="w-full" key={data.id} header={data.status}>
                  <h2 className='mt-0'>{data.timeOffTypeId}</h2>
                  <div className="flex flex-column text-left w-12">
                    <p className='mb-0 mt-0'>Reason:</p> <InputTextarea id="reason" autoResize value={data.reason} disabled />
                    <p className='flex justify-content-between mb-0'>
                      <span>Start:</span><span>{new Date(data.startDate).toLocaleString()}</span>
                    </p>
                    <p className='flex justify-content-between mt-0 mb-0'>
                      End:<span>{new Date(data.endDate).toLocaleString()}</span>
                    </p>
                    {(data.status !== "Pending") ? <><p>Notes:</p> <InputTextarea id="reason" autoResize value={data.notes} disabled /> </>: null}
                  </div>
                  {(data.status === "Pending") && (
                    <>
                      <div className='mb-2 mt-2 text-left'>
                        <span>Manager Notes:</span>
                        <InputTextarea
                          id="managerNote"
                          className='w-12'
                          autoResize
                          placeholder='(optional)'
                          value={noteValue}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setNoteValue(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex justify-content-between">
                        <Button
                          outlined
                          label="Deny"
                          icon="pi pi-ban"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            onDecision(e);
                          }}
                        />
                        <Button
                          outlined
                          label="Approve"
                          icon="pi pi-check"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            onDecision(e);
                          }}
                        />
                      </div>
                    </>
                  )}
                </AccordionTab>
              ))}
          </Accordion>
        </Card>        
        : null}
    </div>
  );

}

export default Requests