import React from 'react';
import { browserHistory } from 'react-router';
import { FormattedMessage, defineMessages } from 'react-intl';

import _ from 'lodash';
import squish from 'object-squish';
/**
 * Custom component for the filter (Search box)
 */
class CustomFilterComponent extends React.Component {



    /**
      * Class constructor.  Initialise our state.
      */
    constructor(props) {
        super(props);
        this.searchChange = this.searchChange.bind(this);
        /** Our data from the server is stored here  */
        this.state = {
            'query': ''
        };
    }

    searchChange(event) {
        this.setState({
            query: event.target.value
        });

        this.props.changeFilter(this.state.query);


        // Hack to get the value properly updted...
        setTimeout(() => {
            this.props.changeFilter(this.state.query);
        }, 1);
    }

    gotoCreate() {
        browserHistory.push('/partnercreate/' );
    };

    render() {

        /* Quick hack.. griddle sets the filter to 50%.. so make it
        * 200% to get full width
        */
        var style = {
            width: '200%'
        };

      
        return (
            <div style={style} className="filter-container">

                <div className="icon-addon addon-lg">

                    <input id="ps_Search" type="text" onChange={this.searchChange} className="form-control" />

                    <label htmlFor="search" className="glyphicon glyphicon-search" rel="tooltip" title="Search"></label>

                    <button onClick={this.gotoCreate.bind(this)} id="ps_Create" style={{ height: '46px', marginLeft: '32px', 'backgroundColor': '#0072ce !important' }} type="button"
                        className="btn btn-primary ">
                        <FormattedMessage
                            id="create_partner"
                            defaultMessage="Create Partner"
                        />
                        </button>
                </div>
                <br />
            </div>

        );
    }

    /**
     * Static Function for filtering... ID and Name only!
     */
    static CustomFilterFunction(items, query) {

        return _.filter(items, (item) => {
            var flat = squish(item);
            for (var key in flat) {
                // KEY is the column name (as received from the server)
                if (key === 'guid' || key === 'partnerName') {
                    if (String(flat[key]).toLowerCase().indexOf(query.toLowerCase()) >= 0) return true;
                }
            };
            return false;
        });
    }
}

export default CustomFilterComponent;

