interface VacationBalance {
  vacationYear: number;
  vacationBal: number;
}

interface SickBalance {
  sickYear: number;
  sickBal: number;
}

interface TimeRequest {
  status: string;
  notes: string;
}

interface User {
  employeeId: number;
  firstname: string;
  lastname: string;
  dept: string;
  vacationbalance: VacationBalance[];
  sickBalance: SickBalance[];
  timerequests: TimeRequest[];
}

interface NewResult {
  employeeId: number;
  firstname: string;
  lastname: string;
  dept: string;
  vacationYear: number;
  vacationBal: number;
  sickYear: number;
  sickBal: number;
  status: string;
  notes: string;
}

export default function transformUserToNewResult(user: User): NewResult {
  const { employeeId, firstname, lastname, dept } = user;
  const { vacationYear = 0, vacationBal = 0 } = user.vacationbalance?.at(-1) || {};
  const { sickYear = 0, sickBal = 0 } = user.sickBalance?.at(-1) || {};

  const pendingRequest = user.timerequests.find((request) => request.status === "Pending");
  const latestRequest = pendingRequest || user.timerequests[user.timerequests.length - 1];
  const { status = "", notes = "" } = latestRequest || {};

  const newResult: NewResult = {
    employeeId,
    firstname,
    lastname,
    dept,
    vacationYear,
    vacationBal,
    sickYear,
    sickBal,
    status,
    notes
  }
  return newResult;
}