var Holidays = require('date-holidays');
const hd = new Holidays();
hd.init('US', 'ar');

export default async function arHolidays() {
    let d = new Date()
    let dY = d.getFullYear();
    let allHolidays = hd.getHolidays(dY);
    let found: any[] = [];
    // Filters all holidays for current year from date-holidays by name
    let arHoliday = allHolidays.filter((e: { name: string; }) => e.name === "New Year's Day" || e.name === "New Year's Day (substitute day)" || e.name === "Dr. Martin Luther King Jr./Rober E. Lee's Birthdays" || e.name === "George Washington's Birthday/Daisy Gatson Bates Day" || e.name === "Memorial Day" || e.name === "Independence Day" || e.name === "Independence Day (substitute day)" || e.name === "Labor Day" || e.name === "Veterans Day" || e.name === "Veterans Day (substitute day)" || e.name === "Thanksgiving Day" || e.name === "Christmas Eve" || e.name === "Christmas Day" || e.name === "Christmas Day (substitute day)");
    // Pushes holidays with "substitute" into found array
    arHoliday.map((data: { name: string; }, idx: any) => {
        (data.name.match("substitute")) ? found.push(data.name) : null;
    })

    // Removes previous holiday object from arHolidays where substitute is found 
    //  this leaves the substitute holidays and removes the originals 
    //      (office closes on substitute days where present)
    found.map((data) => {
        var removedDay = data.replace(' (substitute day)', '');
        arHoliday = arHoliday.filter((e: { name: any; }) => e.name !== removedDay)
        
    });

    return arHoliday;
}
