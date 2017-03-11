/******************************************************************************************
 * 
 * Class: PartnerAddresses
 * 
 * Description: Show partner addresses in a table.  Assume
 * 
 * I18N = TRUE
 * 
 * 
 * (c) Sony Computer Entertainment Europe, 2017
 *               
 *****************************************************************************************/

import React from 'react';
import { connect } from 'react-redux';

// react-international
import { FormattedMessage, defineMessages } from 'react-intl';
import { IntlProvider, addLocaleData } from 'react-intl';
import { injectIntl, intlShape } from 'react-intl';
import enLocale from 'react-intl/locale-data/en';
import jaLocale from 'react-intl/locale-data/ja';
import GetI18NMessages from '../utils/GetI18NMessages';

// http xhr helper
import axios from 'axios';

// bootstrap react componenets
import Collapse from 'react-bootstrap/lib/Collapse';

// Griddle
import Griddle from 'griddle-react';
import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap';
require('griddle-react-bootstrap/dist/griddle-react-bootstrap.css');

class PartnerAddresses extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            //
        };

        addLocaleData(enLocale);      // Add Locale
        addLocaleData(jaLocale);      // Add Locale

    }

    componentDidMount() {


    }

    componentWillUnmount() {

    }

    /**
     * Invoked by onclick in our edit icon
     */
    doEditMode() {

    }

    /**
     * Render method.  Return template.
     */
    render() {
        if ( undefined === this.props.currentPartner ) {
            return (<div><i className="fa fa-spinner" aria-hidden="true"></i></div>)
        }

        // Get our message bundle based on the current locale         
        let messages = GetI18NMessages.get(this.props.language.current);

        var metaData = this.getColumnMetaData();

        // It's possible to creat ea Partner without address (initial creaion)
        // So we check if we have an address object.. if not.. just creat ean empty one...
        if ( undefined === this.props.currentPartner.partner.partnerAddresses ) {
            this.props.currentPartner.partner.partnerAddresses = [];
        }
        /* Return our template to React */
        return (
            <IntlProvider locale={this.props.language.current} messages={messages}>
            <div>

                <h3 style={{ 'cursor': 'pointer' }} onClick={() => this.setState({ open: !this.state.open })}>
                    <FormattedMessage
                        id='addresses'
                        defaultMessage='Addresses'
                    />
                    &nbsp;({this.props.currentPartner.partner.partnerAddresses.length})
                    <i className='fa fa-chevron-down pull-right' />
                </h3>

                <Collapse in={this.state.open}>
                    <div>
                         <Griddle results={this.props.currentPartner.partner.partnerAddresses}
                                tableClassName={'table table-responsive table-bordered table-striped table-hover'}
                                useGriddleStyles={false}
                                columns={['addressType.addressTypeName',
                                    'addressLine1',
                                    'cityTownCountry', 'guid']}
                                resultsPerPage={5}
                                columnMetadata={metaData}
                                showFilter={false}
                                useCustomPagerComponent={true}
                                customPagerComponent={BootstrapPager}
                                
                            />

                    </div>
                </Collapse>
            </div>
            </IntlProvider>
        );  // end render return
    } // end render

    getColumnMetaData() {
        return [{
            'columnName': 'guid',
            'order': 1,
            'locked': false,
            'visible': true,
            'displayName': ' ',
            'isMultipleSelection' : true,
            'uniqueIdentifier':"guid"
            
        },{
            'columnName': 'addressType.addressTypeName',
            'order': 2,
            'locked': false,
            'visible': true,
            'displayName':
            <FormattedMessage
                id='address_type'
                defaultMessage='Address Type'
            />
        }, {
            'columnName': 'addressLine1',
            'order': 3,
            'locked': false,
            'visible': true,
            'displayName':
            <FormattedMessage
                id='address_line1'
                defaultMessage='Address Line'
            />
        }, {
            'columnName': 'cityTownCountry',
            'order': 4,
            'locked': false,
            'visible': true,
            'displayName':
            <FormattedMessage
                id='country'
                defaultMessage='Country'
            />
        }]

    }
}


// Use the entire store
function getStoreProps(state) {
  return state
}

// We need to use CONNECT to hook up the REDUX store in order that the store
// is accessible via this.props...
export default connect(getStoreProps)(PartnerAddresses)
