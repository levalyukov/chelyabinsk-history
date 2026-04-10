import "../styles/TextEditor.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeading, faBold, faItalic, faUnderline, faHighlighter, faAlignCenter, faAlignLeft, faAlignRight, faAlignJustify, faList, faListCheck, faListOl } from "@fortawesome/free-solid-svg-icons";

export default function TextEditor () {
  return (
    <span id="text-editor">
      <button><span><FontAwesomeIcon icon={faHeading}/></span></button>
      <button><span><FontAwesomeIcon icon={faBold}/></span></button>
      <button><span><FontAwesomeIcon icon={faItalic}/></span></button>
      <button><span><FontAwesomeIcon icon={faUnderline}/></span></button>
      <button><span><FontAwesomeIcon icon={faHighlighter}/></span></button>
      <button><span><FontAwesomeIcon icon={faAlignCenter}/></span></button>
      <button><span><FontAwesomeIcon icon={faAlignLeft}/></span></button>
      <button><span><FontAwesomeIcon icon={faAlignJustify}/></span></button>
      <button><span><FontAwesomeIcon icon={faAlignRight}/></span></button>

      <button><span><FontAwesomeIcon icon={faList}/></span></button>
      <button><span><FontAwesomeIcon icon={faListCheck}/></span></button>
      <button><span><FontAwesomeIcon icon={faListOl}/></span></button>
      <button><span><FontAwesomeIcon icon={faListOl}/></span></button>
      <button><span><FontAwesomeIcon icon={faAlignRight}/></span></button>
    </span>
  );
};