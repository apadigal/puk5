import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.js';
import Search from './components/main/Search.js';
import PartnerTable from './components/main/PartnerTable.js';
import Pagination from './components/main/Pagination.js';
import Griddle from 'griddle-react';

console.log( "aaaa" );

var fakeData =  [
  {
    "id": 0,
    "name": "Mayer Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 7
  }, {
    "id": 1,
    "name": "Mayer Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 7
  }, {
    "id": 2,
    "name": "James Young",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 7
  }, {
    "id": 3,
    "name": "Mayer Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 7
  }
  
];

/**
 * Render our components in our app ID
 */
ReactDOM.render(
    <div>
        <Header /> 
        <Search />
        <PartnerTable />
        <Pagination />
        <Griddle results={fakeData} showFilter={true} />
    </div>,
    document.getElementById('app')
    
);
