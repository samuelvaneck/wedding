import * as React from 'react'
import { Dropzone } from './Dropzone'
import { ProgressBar } from './ProgressBar'
const CheckIcon = require('../../../../images/check.svg');

interface fileUploadProps {
  files: any
  family_id: number
}

interface fileUploadState {
  uploading: boolean
  successfullUpload: boolean
  files: any
  uploadProgress: {}
  photoUrl: string
}

const getInitialFiles = (props: fileUploadProps) => props.files;

export class FileUpload extends React.Component<fileUploadProps, fileUploadState> {
  readonly state

  constructor(props: fileUploadProps) {
    super(props)
    this.state = {
      uploading: false,
      successfullUpload: false,
      files: getInitialFiles(this.props),
      uploadProgress: {},
      photoUrl: ''
    }
  }

  onFilesAdded(event, files: any) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  async uploadFiles(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    const promises = [];

    this.setState({
      uploadProgress: {},
      uploading: true
    });
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file))
    });
    try {
      await Promise.all(promises);
      this.setState({ 
        successfullUpload: true,
        uploading: false
      });
    } catch (error) {
      this.setState({
        successfullUpload: false,
        uploading: false
      })
    }
  }

  sendRequest(file) {
    const elem: HTMLMetaElement = document.querySelector('[name="csrf-token"]');
    const csrfToken = elem.content;

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('family[photo]', file, file.name)
      
      fetch('/families/' + this.props.family_id, {
        method: 'PUT',
        body: formData,
        headers: {
          'X-CSRF-Token': csrfToken,
          'X-Requested-With': 'XMLHTTPRequest'
        }
      }).then(response => response.json())
        .then(data => {
          this.setState({
            photoUrl: data.photo_url
          })
        })
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUpload) {
      return(
        <div className="progress-bar-wrapper">
          <ProgressBar progress={uploadProgress ? uploadProgress.precentage : 0} />
          <img src={CheckIcon}
               alt="done"
               className='check-icon'
               style={{ opacity: uploadProgress && uploadProgress.state === 'done' ? 0.5 : 0 }}
          />
        </div>
      )
    }
  }

  renderActionsButtons() {
    if (this.state.successfullUpload) {
      return(
        <button
          onClick={() => { 
            this.setState({
              files: [],
              successfullUpload: false
            })
          }}
          className='upload-button'
        >
          Clear
        </button>
      )
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.upload}
          onClick={event => this.uploadFiles(event)}
          className='upload-button'
        >
          Upload
        </button>
      )
    }
  }

  render() {
    const fileList = this.state.files.map(file => {
      if (file === undefined) return;

      return (
        <React.Fragment>
          <div key={file.name} className='file-row'>
            <span className='file-name'>{file.name}</span>
            {this.renderProgress(file)}
          </div>
          <img src={this.state.photoUrl} className='photo-thumbnail' />
        </React.Fragment>
      )
    });

    return (
      <React.Fragment>
        <div className="upload">
          <span className="title">Upload Files</span>
          <div className="content">
            <div>
              <Dropzone disabled={this.state.uploading || this.state.sucessfullUpload} 
                        onFilesAdded={(event, array) => this.onFilesAdded(event, array)} />
            </div>
            <div className="files">{fileList}</div>
          </div>
          <div className="actions">{this.renderActionsButtons()}</div>
        </div>
      </React.Fragment>
    )
  }
}