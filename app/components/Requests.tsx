'use client'
import React, { useEffect, useState } from 'react';
import ListUsers from '@/app/components/ListUsers';

interface RequestProps {
    id: number;
}

// TimeOffType Interface
interface TimeOffType {
    id: number;
    name: string;
    TimeOffRequest: TimeOffRequest[];
  }
  
  // User Interface
  interface User {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    timerequests: TimeOffRequest[];
    timebalance: TimeOffBalance[];
    dept: string;
    isAdmin: boolean;
    invite: string;
  }
  
  // TimeOffRequest Interface
  interface TimeOffRequest {
    id: number;
    userId: number;
    user: User;
    notes: string;
    isPaid: boolean;
    startDate: string;
    timeOffTypeId: number;
    timeOffType: TimeOffType;
    endDate: string;
    reason: string;
    status: string;
  }
  
  // TimeOffBalance Interface
  interface TimeOffBalance {
    userId: number;
    user: User;
    year: number;
    balance: number;
  }
  

const Requests = ({ id }: RequestProps) => {
    const [result, setResult] = useState<User>();
    const [loading, setLoading] = useState<boolean>();
    const [requests, setRequests] = useState<TimeOffRequest[]>([]);

    useEffect(() => {
        const getResults = async () => {
            try {
                const fetchedResults = await ListUsers(id);
                setResult(fetchedResults);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch users: ', error);
            }
        };

        if (!result) {
            getResults();            
        }        
        if (result) {
            setRequests(result.timerequests);
        }
    }, [id, result, requests]);    
    

    

    return (
        <div>
            {requests ? requests.map((data, idx) => {
                return (<div key={idx}>{data.id} {data.notes} {data.reason} {data.status} {data.startDate} </div>)
            }) : null }
        </div>
    )
}

export default Requests