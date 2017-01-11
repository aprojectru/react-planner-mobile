import React, {PropTypes} from 'react';

import IconCheck from 'react-icons/lib/fa/check';
import IconClose from 'react-icons/lib/fa/close';


const STYLE = {
    backgroundColor: "#424242",
    height: "100%",
    width: "100%",
    fontFamily: "helvetica",
    overflow: "hidden"

};

const STYLE_CENTER = {
    maxWidth: "700px",
    height: "100%",
    margin: "0 auto",
    position: "relative",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"

};

const STYLE_BUTTON = {
    color: "white",
    width: "70px",
    height: "70px",
    borderRadius: "35px",
    textDecoration: "none",
    display: "inline-block",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
    backgroundColor: "#478dda",
    margin: "14px 12px 14px 12px"
};


const STYLE_TEXTAREA = {
    width: "100%",
    height: "220px",
    color: "black",
    fontFamily: "helvetica",
    fontWeight: 500,
    fontSize: "20px",
    borderRadius: "5px",
    lineHeight: "22px",
    backgroundColor: "#fbfbfb",
    padding: "20px 20px 20px 20px",
    boxSizing: "border-box",
    border: "3px solid rgba(0,0,0,0)",
}


export default class CommentTextEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula malesuada condimentum. Maecenas viverra fermentum elit vitae viverra. Pellentesque porttitor nibh sed justo egestas tempor. Etiam luctus mollis laoreet. Vestibulum erat enim, vulputate eget consequat vitae, blandit nec justo. Pellentesque scelerisque risus ut eleifend ullamcorper. Praesent ut hendrerit dolor. Donec malesuada interdum lorem. Duis cursus bibendum augue, sit amet tempus ex varius consectetur. Proin feugiat, arcu id sagittis venenatis, sapien mauris varius tortor, ac blandit erat justo ac ex. Aenean tempor felis est, in auctor diam aliquet in."};

        //this.state = {value: this.props.text};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        //alert('Salva testo ' + this.state.value);
        this.props.saveCommentText(this.props.activeComment, this.props.text);
        event.preventDefault();
    }

    render() {
        return (
            <div style={{... STYLE}}>
                <div style={{... STYLE_CENTER}}>

                    <div style={{width: "100%", maxWidth: "600px", textAlign: "center", display: "inline-flex"}}>
                            <textarea style={{... STYLE_TEXTAREA}} value={this.state.value}
                                      onChange={this.handleChange}/>
                    </div>
                    <div style={{display: "inline-flex"}}>
                        <div style={{width: "100px", textAlign: "center"}}>

                            <a href="javascript:;" style={{... STYLE_BUTTON}} title={"Salva"}
                               onClick={this.handleSubmit}>
                                <IconCheck style={{marginTop: "22px"}}/>
                            </a>
                            <a href="javascript:;" style={{... STYLE_BUTTON}} title={"Annulla"}

                            >
                                <IconClose style={{marginTop: "22px"}}/>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

CommentTextEditor.propTypes = {

    text: PropTypes.string.isRequired,
    activeComment: PropTypes.number.isRequired,
    saveCommentText: PropTypes.func.isRequired,
    // cancelModifyCommentText: PropTypes.func.isRequired
};