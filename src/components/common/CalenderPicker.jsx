import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarPicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleChange = date => {
        setSelectedDate(date);
    };

    return (
        <div>
            <h2>Calendar Picker</h2>
            <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                dateFormat="dd/MM/yyyy" // Customize date format if needed
            />
        </div>
    );
};

export default CalendarPicker;
