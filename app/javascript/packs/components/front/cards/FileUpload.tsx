import * as React from 'react'
import { Dropzone } from './Dropzone'

interface fileUploadProps {
  files: any
}

interface fileUploadState {
  uploading: boolean
  successfullUpload: boolean
  files: any
}

const getInitialFiles = (props: fileUploadProps) => props.files;

export class FileUpload extends React.Component<fileUploadProps, fileUploadState> {
  readonly state

  constructor(props: fileUploadProps) {
    super(props)
    this.state = {
      uploading: false,
      successfullUpload: false,
      files: getInitialFiles(this.props)
    }
  }

  onFilesAdded(event, array: any) {
    console.log({ event, array });
  }

  render() {
    return (
      <React.Fragment>
        <div className="upload">
          <span className="title">Upload Files</span>
          <div className="content">
            <div>
              <Dropzone disabled={this.state.uploading || this.state.sucessfullUpload} 
                        onFilesAdded={(event, array) => this.onFilesAdded(event, array)} />
            </div>
            <div className="files">
              {this.state.files}
            </div>
          </div>
          <div className="actions" />
        </div>
      </React.Fragment>
    )
  }
}