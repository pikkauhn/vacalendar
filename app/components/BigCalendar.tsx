import {
    Calendar,
    momentLocalizer,
    Views,
    DateLocalizer
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import events from '../resources/events'
import moment from 'moment';

const localizer = momentLocalizer(moment);

const EventCalendar = (props: any) => (
    <div>
        <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
        />
    </div>
)

export default EventCalendar