import React, { Component } from 'react'
import {sys} from 'tool'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css' // see installation section above for versions of NPM older than 3.0.0
// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-cropper').default

class AvatarCrop extends Component<any, any> {

    constructor(props:any) {
        super(props)
        this.state = {
            src: '',
        }
    }
    myRef:any = React.createRef()


    onOk = (e:any) => {
        console.log(this.myRef.current.cropper.getCroppedCanvas());
        
        sys.defineCanvasToBlob()

        this.myRef.current.cropper.getCroppedCanvas().toBlob((blob:any) => {

            // const data = new FormData()
            // data.append('file', blob)
            // this.props.onCropFile(data)
            this.props.onCropBlob(blob)
          });
    }

    onCancel = (e:any) => {
        console.log('onCancel')
        this.props.onCancel()
    }

    _crop() { }

    render() {
        return (
            <div>
                <Cropper
                    // ref='cropper'
                    ref={this.myRef}
                    src={this.props.file}
                    style={{ height: 400, width: '100%' }}
                    // Cropper.js options
                    aspectRatio={1}
                    guides={false}
                    crop={this._crop.bind(this)} />
                <div>
                    <button onClick={this.onOk}>{this.props.words.cmn_select}</button>
                    <button onClick={this.onCancel}>{this.props.words.cmn_cancel}</button>
                </div>
            </div>
        );
    }
}
interface IState2Prop{
    words: any,
};

const mapStateToProps:{(arg0:any):IState2Prop} = state => ({
    words: state.locale.words,
})


export default connect(
    mapStateToProps,    
)(AvatarCrop)

// export default AvatarCrop
  