import * as React from 'react'
const cloudIcon = require('../../../../images/cloud-computing.svg') 

interface dropZoneProps {
  disabled: boolean
  onFilesAdded: (event: any, array: any) => void
}

interface dropZoneState {
  highlight: boolean
}

export class Dropzone extends React.Component<dropZoneProps, dropZoneState> {
  constructor(props: dropZoneProps) {
    super(props);
    this.state = {
      highlight: false
    }
  }
  
  private fileInputRef = React.createRef<HTMLInputElement>()

  openFileDialog(event: React.MouseEvent<HTMLDivElement>) {
    if (this.props.disabled) return;

    this.fileInputRef.current.click();
  }

  handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (this.props.disabled) return;

    const files = event.target.files;
    const array = this.fileListToArray(files);
    
    this.props.onFilesAdded(event, array)
  }

  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i))
    }
    return array;
  }

  onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (this.props.disabled) return;

    this.setState({ highlight: true });
  }

  onDragLeave(event: React.DragEvent<HTMLDivElement>) {
    this.setState({ highlight: false });
  }

  onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (this.props.disabled) return;

    const files = event.dataTransfer.files;
    const array = this.fileListToArray(files);
    this.props.onFilesAdded(event, array);
    this.setState({ highlight: false });
  }

  render() {
    const dragClass = this.state.highlight ? 'dropzone highlight' : 'dropzone';

    return (
      <React.Fragment>
        <div className={dragClass} 
             onClick={event => this.openFileDialog(event)}
             style={{ cursor : this.props.disabled ? 'default' : 'pointer' }}
             onDragOver={event => this.onDragOver(event)}  
             onDragLeave={event => this.onDragLeave(event)}
             onDrop={event => this.onDrop(event)} >
          <img src={cloudIcon} className='dropzone-icon' />
          <input ref={this.fileInputRef}
                 className='file-input'
                 type='file'
                 multiple
                 onChange={event => this.handleFileInputChange(event)}
          />
          <span>Upload Files</span>
        </div>
      </React.Fragment>
    )
  }
}