import * as React from 'react'
import { Dropzone } from './Dropzone'

interface fileUploadProps {

}

interface fileUploadState {

}

export class FileUpload extends React.Component<fileUploadProps, fileUploadState> {
  readonly state

  constructor(props: fileUploadProps) {
    super(props)
    this.state = {}
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
              <Dropzone disabled={false} onFilesAdded={array => this.onFilesAdded(event, array)} />
            </div>
            <div className="files" />
          </div>
          <div className="actions" />
        </div>
      </React.Fragment>
    )
  }
}