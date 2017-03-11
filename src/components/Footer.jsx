import React from 'react';

var Footer = React.createClass({


    render: function () {
        /* 
         if ( undefined !== this.props.params ) {
             alert( this.props.params.id );
         } else {
             alert( 'Props undefined');
         }
         */

        return (
            <div>
                <div className="container-fluid">
                    <div className="row panel-footer">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-5">
                             Copyright © 2017 Sony Interactive Entertainment. All rights reserved.
                        </div>
                        <div className="col-sm-5">
                            Privacy Policy Terms of Use 
                        </div>

                        <div className="col-sm-1 "></div>
                    </div>
                </div>


                    </div>
                
        );
    }
});

export default Footer;