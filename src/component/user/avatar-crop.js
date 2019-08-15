import React, { Component } from 'react'
import {sys} from '@/tool'
import styled from 'styled-components'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css' // see installation section above for versions of NPM older than 3.0.0
// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-cropper').default

class AvatarCrop extends Component {

    constructor(props) {
        super(props)
        this.state = {
            src: '',
        }
        this.myRef = React.createRef()
    }


    onOk = e => {
        console.log(this.myRef.current.cropper.getCroppedCanvas());
        
        sys.defineCanvasToBlob()

        this.myRef.current.cropper.getCroppedCanvas().toBlob((blob) => {

            // const data = new FormData()
            // data.append('file', blob)
            // this.props.onCropFile(data)
            this.props.onCropBlob(blob)
          });
    }

    onCancel = e => {
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
                    <button onClick={this.onOk}>ok</button>
                    <button onClick={this.onCancel}>cancel</button>
                </div>
            </div>
        );
    }
}

export default AvatarCrop
  