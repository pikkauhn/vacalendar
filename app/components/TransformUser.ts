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

export default function transformUserToNewResult(user: User): NewResult {
    const{ id, firstname, lastname, dept } = user;
    const { year = 0, balance = 0 } = user.timebalance.at(-1) || {};

    const pendingRequest = user.timerequests.find((request) => request.status === "Pending");
    const latestRequest = pendingRequest || user.timerequests[user.timerequests.length - 1];
    const { status = "", notes = "" } = latestRequest || {};

    const newResult: NewResult = {
      id,
      firstname,
      lastname,
      dept,
      year,
      balance,
      status,
      notes
    }
    return newResult;
  }