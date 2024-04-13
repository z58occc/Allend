import React from 'react';
import ClipboardJS from 'clipboard';
import { CiShare2 } from "react-icons/ci";


class CopyButton extends React.Component {
  componentDidMount() {
    // 初始化 ClipboardJS
    this.clipboard = new ClipboardJS('#copyButton', {
      text: () => window.location.href 
    });


    this.clipboard.on('success', (e) => {
      alert('已將網址複製！');
      e.clearSelection();
    });


    this.clipboard.on('error', (e) => {
      alert('複製失敗');
    });
  }

  componentWillUnmount() {
    // 清理 ClipboardJS 
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }

  render() {
    return (
      <i id="copyButton" style={{cursor:'pointer'}}><CiShare2 size={30}/></i>
    );
  }
}

export default CopyButton;
