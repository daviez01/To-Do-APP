import { Todo } from './Todo';

// This is the mock data that will be used in the application.
// It is an array of Todo objects.

export const TODOS: Todo[] = [
    {
        id: 1,
        title: 'Doctor Appointment',
        text: 'Doctor Appointment at st.Peters with Dr. Smith.',
        day: 'May 5th 2023',
        time: '2:30pm',
        completed: true,
    },
    {
        id: 2,
        title: 'Meeting at School',
        text: 'Meeting at school with principal.',
        day: 'May 6th 2023',
        time: '1:30pm',
        completed: true,
    },
    {
        id: 3,
        title: 'Food Shopping',
        text: 'Food shopping at Walmart.',
        day: 'May 7th 2023',
        time: '12:30pm',
        completed: false,
    },
];