/******************************************************************************************
 * 
 * Class: PartnerSummary
 * 
 * Description: Show a list of (searchable) partners within a GRID.
 *              A click on a row takes the user to the PartnerDetails view.
 * 
 * @see PartnerDetails.jsx
 * 
 * I18N = TRUE
 * 
 * (c) Sony Computer Entertainment Europe, 2017
 *               
 ******************************************************************************************/

import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as pmdbConstants from '../app/Constants';
import * as config from '../config/config';

// I18N from react-intl.  Th e'messages' files are defined in GetI18NMessages.
import { FormattedMessage, defineMessages } from 'react-intl';
import { IntlProvider, addLocaleData } from 'react-intl';
import enLocale from 'react-intl/locale-data/en';
import jaLocale from 'react-intl/locale-data/ja';

import { Modal, Button } from 'react-bootstrap';

// Helpers for XHR and Griddle-React/Bootstrap
import axios from 'axios';
import Griddle from 'griddle-react';
import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap';
import CustomFilterComponent from './CustomFilterComponent.jsx';
//import CustomFilterFunction from './CustomFilterComponent.jsx';

// Our components
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import GetI18NMessages from '../utils/GetI18NMessages';


// Need the griddle-bootstrap css.  
// note: @see webpack.config..loaders for css
require('griddle-react-bootstrap/dist/griddle-react-bootstrap.css');

let currentLocale = 'en';

/**
 * Class PartnerSummary
 * Purpose: This is the dat agrid that shows the partners form the DB
 * 
 * 'Griddle' is used for the GRID component.
 */
class PartnerSummary extends React.Component {

    /**
     * Class constructor.  Initialise our state. Note that currentlocale is
     * from our class variable above.  We need ot do this in order to 
     * preserve it for when we go to say, Partner Details.
     */
    constructor(props) {
        super(props);

        /** Our data from the server is stored here.. and our curretn locale  */
        this.state = {
            partnerData: [],
            lastError: '',
            showError: false
            //locale: currentLocale
        };

        this.setLocale.bind(this);    // ES6 Bind this to our setlocate function
        addLocaleData(enLocale);      // Add Locale
        addLocaleData(jaLocale);      // Add Locale

        // alert( 'From out store...: ' + this.props.language.current );
    }

    /**
     * Control comes here as part of the React lifecycle *after* the component is 
     * rendered
     * 
     * Therefore, let's get the data from our server...
     * 
     * setState will trigger the Render... but it does not happen immediately.
     * 
     * Render will check IF the data has been loaded by inspecting partnerData.  
     * If it's empty.. put up the loqading view...
     * 
     */
    componentDidMount() {
        console.log( 'Calling getPartners..' );
        this.getPartnerData();
        // Acquire data for our summary table!!!!
        // @todo make this part of an env. variable
        /*
        axios.get(config.API_SERVICES_URL + '/partners')
            .then(res => {

                // Save this in our state var of partnerData
                // This will be available when we render the component
                this.setState({ partnerData: res.data });
            }).catch(err => {
                this.setState({ lastError: err.toString() });
                this.setState({ showError: true });
            }
            )
            */
    }

    /**
     * Get partner data and update state.
     */
    getPartnerData() {

        axios.get(config.API_SERVICES_URL + '/partners')
            .then(res => {

                // Save this in our state var of partnerData
                // This will be available when we render the component
                this.setState({ partnerData: res.data });
            }).catch(err => {
                this.setState({ lastError: err.toString() });
                this.setState({ showError: true });
            }
        )

    }

    /**
     * Save the current locale.  Need to save it as a 'class variable'
     * for when we are rendered again.
     */
    componentWillUnmount() {
        currentLocale = this.state.locale;
    }

    /**
     * 
     * @deprecated
     * 
     * Row click event.  We need to go to our details route.
     * We do this by pushing down on the browserhistory... We are passed
     * an object from the Griddle grid and we use that to obtain the 
     * value of the partner_id. pass the locale too
     */
    rowClick(row) {
        // alert(row.props.data[['guid']]);
        //browserHistory.push('/partnerdetails/' + row.props.data[['guid']]);
    }

    /**
     * This is called when the user changes language in the header component
     * setState causes Render to be called.
     */
    setLocale(locale) {
        //this.setState({ locale: locale });
    }

    hideModal() {
        this.setState({ showError: false });
    }

    /**
     * The component render function.
     * 
     * Return the summary page.
     * 
     */
    render() {

        if (this.state.partnerData.length === 0) {
            //return <Loading />
           // return (<div><i className="fa fa-spinner" aria-hidden="true"></i></div>);
        }

        /* 
         * Example to Iterate over the partner reaults 
         */
        //this.state.partnerData.map(function (data) {
        //console.log('This partner is: ' + data.partner_name);
        //});

        var metaData = this.getColumnMetaData();

        // Get our message bundle based on the current locale         
        let messages = GetI18NMessages.get(this.props.language.current);

        return (
            <IntlProvider locale={this.props.language.current} messages={messages}>
                <div>
                    <Header title='search_partner' />
                    <div className='row'>
                        <div className='col-sm-1'></div>
                        <div className='col-sm-10'>
                            <div className='panel-heading'>
                                <div className='panel-title'>
                                    PMDB&nbsp;-&nbsp;

                                    <FormattedMessage
                                        id={'app_title'}
                                        defaultMessage='Partner Management Database'
                                    />

                                </div>
                            </div>

                            <Griddle results={this.state.partnerData}
                                tableClassName={'table table-responsive table-bordered table-striped table-hover'}
                                useGriddleStyles={false}
                                columns={['guid',
                                    'partyLevel.partyLevelName',
                                    'partnerName',
                                    'partnerCategory.partnerCategoryName',
                                    'partnerStatus.partnerStatusCode']}
                                resultsPerPage={5}
                                noDataMessage='Loading...' 
                                columnMetadata={metaData}
                                showFilter={true}
                                filterPlaceholderText='Search partners...'
                                useCustomFilterer={true}
                                useCustomFilterComponent={true}
                                customFilterer={CustomFilterComponent.CustomFilterFunction}
                                customFilterComponent={CustomFilterComponent}
                                useCustomPagerComponent={true}
                                customPagerComponent={BootstrapPager}
                            //onRowClick={this.rowClick.bind(this)}
                            />
                        </div>
                        <div className='col-sm-1'></div>
                    </div>
                    <Footer />

                    <Modal
                        {...this.props}
                        show={this.state.showError}
                        onHide={this.hideModal.bind(this)}
                        dialogClassName="custom-modal"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-lg">PMDB Failure</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>'{this.state.lastError}'</h4>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.hideModal.bind(this)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </IntlProvider>
        );  // End return
    } // End render method


    /**
     * Get column metadata... This will be used by the Griddle component
     * to include columns.. and set specific renderers for columns.
     * 
     * Use react-intl for column names
     */
    getColumnMetaData() {

        const CenteredHeader = ({ displayName }) =>
            <div style={{ textAlign: 'center' }}>{displayName}</div>;


        return [{
            'columnName': 'guid',
            'order': 1,
            'locked': false,
            'visible': true,
            'displayName':
            <FormattedMessage
                id='global_partner_id'
                defaultMessage='Global Partner ID Default'
            />,
            'customComponent': CellIdComponent
        }, {
            'columnName': 'partnerName',
            'order': 2,
            'locked': false,
            'visible': true,
            'displayName': <FormattedMessage
                id='partner_name'
                defaultMessage='Partner Name'
            />,
            'customComponent': LinkComponent
        }, {
            'columnName': 'partyLevel.partyLevelName',
            'order': 3,
            'locked': false,
            'visible': true,
            'displayName': <FormattedMessage
                id='party_level'
                defaultMessage='Party Level'
            />
        }, {
            'columnName': 'partnerCategory.partnerCategoryName',
            'order': 4,
            'locked': false,
            'visible': true,
            'displayName': <FormattedMessage
                id='partner_type'
                defaultMessage='Partner Type'
            />
        }, {
            'columnName': 'partnerStatus.partnerStatusCode',
            'order': 5,
            'locked': false,
            'visible': true,
            'displayName': <FormattedMessage
                id='partner_status'
                defaultMessage='Partner Status'
            />,
            'customComponent': StatusComponent,
            'customHeaderComponent': CenteredHeader

        }];
    }
} // end class


/**
 * Example to create a hyperlink in the Griddle grid.  Hyperlinks
 * must use the React <Link component.  Here we are going to our 
 * PartnerDetails route -- passing the ID of the partner.
 */
var LinkComponent = React.createClass({

    render: function () {
        var url = '/partnerdetails/' + this.props.rowData.guid;
        return <Link to={{ pathname: url }}>{this.props.data}</Link>;
    }
});

/**
 * Placeholder to influence display on a cell by cell basis...
 */
var CellIdComponent = React.createClass({

    render: function () {

        PartnerSummary.currentRowNum++;
        // ignore for now.. var url = '/partnerdetails/' + this.props.data;
        return <span id={'ps_' + PartnerSummary.currentRowNum + ' ' + this.props.data}>{this.props.data}</span>;

    }
});

/**
 * We need to render the state as a checkbox.  Therefore, we need
 * a custom component to do so.
 * 
 * Localzied to here so no need to externalise this
 * 
 * Also.. center align it.
 * 
 * @deprecated
 * 
 */
var StatusComponent = React.createClass({

    render: function () {

        if (this.props.data === 'ACTIVE') {
            return <div style={{ textAlign: 'center', 'width': '100%' }}>
                <div style={{ textAlign: 'center', 'margin': '0 auto', 'width': '50%', 'backgroundColor': '#00a550', 'color': '#fff' }}>
                    Active
                        </div>
            </div>;
        } else {
            return <div style={{ textAlign: 'center', 'width': '100%' }}>
                <div style={{ textAlign: 'center', 'margin': '0 auto', 'width': '50%', 'backgroundColor': '#a90228', 'color': '#fff' }}>
                    Inactive
                        </div>
            </div>;
        }

    }
});

// Use the entire store
function getStoreProps(state) {
    return state
}

// We need to use CONNECT to hook up the REDUX store in order that the store
// is accessible via this.props...
export default connect(getStoreProps)(PartnerSummary)