import { MdDashboard, MdStore, MdAssignment, MdPeopleOutline, MdBook } from 'react-icons/lib/md'

export default [
    {
        to: '/',
        key: 'home',
        title: 'Početna',
        icon: MdDashboard,
    }, {
        to: '/projekti',
        key: 'projekti',
        title: 'Projekti',
        icon: MdStore,
    }, {
        to: '/tvrtka',
        key: 'tvrtka',
        title: 'Tvrtka',
        icon: MdAssignment,
    }, {
        to: '/skladiste',
        key: 'skladiste',
        title: 'Skladište',
        icon: MdStore,
    }, {
        to: '/zaposlenici',
        key: 'zaposlenici',
        title: 'Zaposlenici',
        icon: MdPeopleOutline,
    }, {
        to: '/klijenti',
        key: 'klijenti',
        title: 'Klijenti',
        icon: MdBook,
    },
]
