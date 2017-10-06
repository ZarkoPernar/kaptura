// import {
//     MdDashboard,
//     MdStore,
//     MdAssignment,
//     MdPeopleOutline,
//     MdBook,
// } from 'react-icons/lib/md'

import MdDashboard from 'react-icons/lib/md/dashboard'
import MdTimer from 'react-icons/lib/md/timer'
import MdStore from 'react-icons/lib/md/store'
import MdAssignment from 'react-icons/lib/md/assignment'
import MdPeopleOutline from 'react-icons/lib/md/people-outline'
import MdBook from 'react-icons/lib/md/book'
import MdPersonOutline from 'react-icons/lib/md/person-outline'
import MdReceipt from 'react-icons/lib/md/receipt'

export default [
    {
        to: '/',
        key: 'home',
        title: 'Početna',
        icon: MdDashboard,
    }, {
        to: '/sati',
        key: 'sati',
        title: 'Sati',
        icon: MdTimer,
    }, {
        to: '/projekti',
        key: 'projekti',
        title: 'Projekti',
        icon: MdAssignment,
        // sublinks: [{
        //     to: '/projekti/charts',
        //     key: 'charts',
        //     title: 'Charts',
        // }]
    }, {
        to: '/tvrtka',
        key: 'tvrtka',
        title: 'Tvrtka',
        icon: MdStore,
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
    }, {
        to: '/fakture',
        key: 'fakture',
        title: 'Fakture',
        icon: MdReceipt,
    }, {
        to: '/korisnik',
        key: 'korisnik',
        title: 'Korisnik',
        icon: MdPersonOutline,
    },
]
