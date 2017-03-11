/******************************************************************************************
 * 
 * Class: PartnerDetailsContainer
 * 
 * Description: This is a container that hosts a tab view
 *              We need to show the details of a Partner in a tabbed view...
 *              Details, Addresses, Contacts, IP Address
 * 
 *              Each tab contains an individual component.
 * I18N = TRUE
 * 
 * @see PartnerSummary.jsx (Links to here)
 * 
 * (c) Sony Computer Entertainment Europe, 2017
 *               
 *****************************************************************************************/

import React from 'react';
import { connect } from 'react-redux';

import { Router, Route, Link, browserHistory } from 'react-router';
import Button from 'react-bootstrap/lib/Button';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

// I18N from react-intl.  The 'messages' files are defined in GetI18NMessages.
import { FormattedMessage, defineMessages } from 'react-intl';
import { IntlProvider, addLocaleData } from 'react-intl';
import enLocale from 'react-intl/locale-data/en';
import jaLocale from 'react-intl/locale-data/ja';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import GetI18NMessages from '../utils/GetI18NMessages';

// Partner components
import PartnerAccountManagers from './PartnerAccountManagers.jsx';
import PartnerAddresses from './PartnerAddresses.jsx';
import PartnerContacts from './PartnerContacts.jsx';
import PartnerDetails from './PartnerDetails.jsx';

class PartnerDetailsContainer extends React.Component {

    constructor(props) {
        super(props);
        //alert( this.props.location.query.lang );
        this.state = {
            locale: this.props.location.query.lang,
            partnerId: this.props.params.id
        };

        addLocaleData(enLocale);      // Add Locale
        addLocaleData(jaLocale);      // Add Locale

    }

    setLocale(locale) {
        //alert( 'Changing locale to: ' + locale );
        //this.setState( { locale: locale } );
    }


    /**
     * Render method
     */
    render() {
        // Get our message bundle based on the current locale         
        let messages = GetI18NMessages.get(this.props.language.current);

        let outlineStyle = {
            'border': '1px solid #ddd',
            'border-top': '0px'
        };

        // Use Bootstrap Collapse @See Child components
        return (
            <IntlProvider locale={this.props.language.current} messages={messages}>
                <div>
                    <Header changeLocale={this.setLocale.bind(this)} locale={this.state.locale} title='search_partner' />
                    <div className='container-fluid '>
                        <div className='row'>
                            <div className='col-sm-1'></div>
                            <div className='col-sm-10'>
                                <div className='panel-heading'>
                                    <div className='panel-title'>
                                        PMDB -
                                        <FormattedMessage
                                            id={'partner_details'}
                                            defaultMessage='Partner Details'
                                        />
                                        Electronic Arts
                                   </div>
                                </div>
                                <h3>
                                    <FormattedMessage
                                        id='overview'
                                        defaultMessage='Overview'
                                    />
                                </h3>
                            </div>
                            <div className='col-sm-1'></div>
                        </div>
                        
                        {/* Partner Details */}
                        <div className='row'>
                            <div className='col-sm-1'></div>
                            <div className='col-sm-10'>
                                <PartnerDetails partnerId={this.state.partnerId} />
                            </div>
                            <div className='col-sm-1'></div>
                        </div>

                         {/* Partner Account Manager(s) REMOVE FOR THIS SPRINT.. force display:none */}
                        <div style={{display: 'none'}} className='row'>
                            <div className='col-sm-1'></div>
                            <div className='col-sm-10'>
                                <PartnerAccountManagers locale={this.state.locale} />
                                <hr />
                            </div>
                            <div className='col-sm-1'></div>
                        </div>

                         {/* Partner Addresses */}
                        <div className='row'>
                            <div className='col-sm-1'></div>
                            <div className='col-sm-10'>
                                <PartnerAddresses />
                                <hr />
                            </div>
                            <div className='col-sm-1'></div>
                        </div>
                        {/* Partner Contacts */}
                        <div className='row'>
                            <div className='col-sm-1'></div>
                            <div className='col-sm-10'>
                                <PartnerContacts locale={this.state.locale} />
                                <hr />
                            </div>
                            <div className='col-sm-1'></div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </IntlProvider>

        );
    }
}

// Use the entire store
function getStoreProps(state) {
  return state
}

// We need to use CONNECT to hook up the REDUX store in order that the store
// is accessible via this.props...
export default connect(getStoreProps)(PartnerDetailsContainer)