/******************************************************************************************
 * 
 * Class: 
 * 
 * Description: This is a component -- rendered within the PartnerDetailsContainer.
 *              We show the partner detais such as name, display name, status ...
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
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Collapse from 'react-bootstrap/lib/Collapse';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';

class PartnerAccountManagers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           // add as necessary
        };

        addLocaleData(enLocale);      // Add Locale
        addLocaleData(jaLocale);      // Add Locale
        console.log( 'From acctmanagers...' + this.props.language.current );
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
        console.log( 'render in acct..' + this.props.language.current );
        // Get our message bundle based on the current locale         
        let messages = GetI18NMessages.get(this.props.language.current);

        /* Return our template to React */
        return (
            <IntlProvider locale={this.props.language.current} messages={messages}>

            <div>
                <h3 style={{ 'cursor': 'pointer' }} onClick={() => this.setState({ open: !this.state.open })}>
                    <FormattedMessage
                        id='account_managers'
                        defaultMessage='Account Managers'
                    />
                    <i className='fa fa-chevron-down pull-right' />
                </h3>
                <Collapse in={this.state.open}>
                    <form>
                    <FormGroup controlId="pd_AcctmanagerSelect">
                        <FormControl componentClass="select" multiple>
                            <option value="select">Assign Acccount Manager</option>
                            <option value="other 1">...</option>
                            <option value="other 2">...</option>
                            <option value="other 3">...</option>
                            <option value="other 4">...</option>
                            <option value="other 5">...</option>
                            <option value="other 6">...</option>
                        </FormControl>
                    </FormGroup>

                    <table className='table table-responsive table-bordered table-striped table-hover'>
                        <thead>
                            <tr className='griddle'>
                                <th>{/* Checkbox */}</th>
                                <th><FormattedMessage
                                    id={'name'}
                                    defaultMessage='NAME'
                                    />
                                </th>
                                <th><FormattedMessage
                                    id={'primary_account_manager'}
                                    defaultMessage='PRIMARY ACCOUNT MANAGER'
                                    />
                                </th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Checkbox /></td>
                                <td>Charlotte Smith</td>
                                <td><Radio name='pd_selectPrimaryAccountManager' /></td>
                            </tr>
                            
                            <tr>
                                <td><Checkbox /></td>
                                 <td>Cristian Garcia</td>
                                <td><Radio name='pd_selectPrimaryAccountManager' /></td>
                            </tr>
                        </tbody>
                     </table>
                    </form>

                   
                    
                </Collapse>
            </div>
             </IntlProvider>


        );  // end render
    }
}


//export default PartnerAccountManagers;

// Use the entire store
function getStoreProps(state) {
  return state
}

// We need to use CONNECT to hook up the REDUX store in order that the store
// is accessible via this.props...
export default connect(getStoreProps)(PartnerAccountManagers)
