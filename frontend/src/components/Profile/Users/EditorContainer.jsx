import React, {Component} from 'react';
import {EditorState, convertToRaw, ContentState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
//import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';



function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID ##clientid###');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response)
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error)
        reject(error);
      });
    }
  );
}

class EditorContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange; Function = (editorState) => {
  //console.log(editorState)
    this.setState({
      editorState,
    });
  };

  render(){
    const { editorState } = this.state;
    {this.props.bodyData.articleDescription = draftToHtml(convertToRaw(editorState.getCurrentContent()))};
    //console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    return <div className='editor'>
      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange.bind(this)}    
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
        }}
      />
      
      
    </div>
  }
}

export default EditorContainer;