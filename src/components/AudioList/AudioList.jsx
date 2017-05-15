import React, { Component } from 'react';
import * as MUI from 'material-ui'
// import SvgIconFace from 'material-ui/svg-icons/action/face';
import styles from './AudioListStyle.js'
import logo from '../../images/user-default.png'
import SvgIconSearch from 'material-ui/svg-icons/action/search'


class AudioList extends Component {
    constructor(props) {
        super(props);

        this.onChangeText = this.onChangeText.bind(this);
    }


    componentWillMount() {
        this.handleSearchDebounced = this.debounce(function () {
            console.log("Hitting", this.refs.search.getValue())
            this.props.fetchAudioData(this.refs.search.getValue());
        }, 500);
    }


    onChangeText(e) {
        console.log("hitting out sider");
        this.handleSearchDebounced();
    }
    debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };


    render() {
        let fileName = this.props.audioList;
        let allFiles = [];
        if (fileName && fileName.length) {
            var innerData = JSON.parse(fileName);
            allFiles = [];
            innerData.forEach((data, index) => {
                allFiles.push(data.slice(data.lastIndexOf('\\') + 1))
            });

        }

        return (

            <div >
                <MUI.Card style={styles.muiListContainer}>
                    <MUI.AppBar showMenuIconButton={false} style={styles.appbarContainer} >
                        <MUI.Avatar icon={<SvgIconSearch />} style={styles.searchBar} />
                        <MUI.TextField
                            ref="search"
                            hintText="Test searching"
                            fullWidth={true}
                            style={styles.textFeild}
                            onChange={this.onChangeText}
                            />
                    </MUI.AppBar>
                    <br />

                    <div style={styles.wrapper} >

                        {allFiles && allFiles.length ? allFiles.map((data, index) => {
                            return (<MUI.Chip
                                key={index}
                                style={styles.chip}
                                >
                                <MUI.Avatar src={logo} />
                                {data}
                            </MUI.Chip>)
                        }) : false}

                    </div>

                </MUI.Card>
                <br />

                <div style={styles.buttonConainer}>
                    <MUI.RaisedButton label="Download" primary={true} />
                </div>
            </div>

        );

    }
}
export default AudioList;
