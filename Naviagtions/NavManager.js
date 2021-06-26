import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {MyNavigation} from "./MyNavigation";

const NavManager = (props) => {

    return (
        <>

        </>
    );
};


NavManager.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
})


export default connect(mapStateToProps)(NavManager);
