import * as React from 'react'

interface CodeInputProps {
  id: string
  inputKeyUp: (event: React.KeyboardEvent) => void
  inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

export const CodeInputField: React.FC<CodeInputProps> = ({ id, inputKeyUp, inputChange, value }) => {
  return(
    <React.Fragment>
      <div className={"pr-1"}>
        <input type="text" 
                className={"form-control code-input-field"} 
                id={id} 
                value={value}
                maxLength={1} 
                autoComplete="off" 
                onKeyUp={inputKeyUp}
                onChange={inputChange} />
      </div>
    </React.Fragment>
  )
}
