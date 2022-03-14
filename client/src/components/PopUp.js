import { useContext } from "react";
import {DataContext} from "../contexts/dataContextProvider";
import { generatePDF , generateDOCX } from "../util";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf,faFileWord, faXmark} from '@fortawesome/free-solid-svg-icons'

const app_mode = process.env.REACT_APP_MODE;

const URL  = app_mode === 'development' ? 'http://localhost:5000' :"";


export default function PopUp(){

    const {setShowDownloadDiv,filename} = useContext(DataContext);

    function downloadPDF(){

        setShowDownloadDiv(false);

        let qlEditors = document.querySelectorAll('.ql-editor');
        // let container = document.querySelector('.container');
        let html = '';
        qlEditors.forEach(qlEditor=>{
           html+=`
             <div class="container" style="margin:0;padding:0;">
              <div class="ql-container" style="margin:0;padding:0;">
                <div class="${qlEditor.className}">
                    ${qlEditor.innerHTML}
                </div>  
              </div>
             </div>
            <div class="html2pdf__page-break"></div>
              `
        })
  
        let pdfOptions = {
          html,
          filename
        }
  
        generatePDF(pdfOptions);
      }
  

      function downloadDOCX(){

        setShowDownloadDiv(false);

        let qlEditors = document.querySelectorAll('.ql-editor');
        // let container = document.querySelector('.container');
        let html = '';
        qlEditors.forEach(qlEditor=>{
           html+=`
             <div class="container" style="margin:0;padding:0;">
              <div class="ql-container" style="width:8.5in;height:11in;">
                <div class="${qlEditor.className}">
                    ${qlEditor.innerHTML}
                </div>  
              </div>
             </div>
             
              `
        })
  
        let docxOption = {
          html,
          url:`${URL}/users/convert-to-docx`,
          filename
        }
  
        generateDOCX(docxOption);
      }

    return (
        <div className="pop-up-div">
            <span onClick={setShowDownloadDiv.bind(this,false)}
              style={{'display':'flex','justifyContent':'flex-end','padding':'5px 10px','cursor':'pointer'}}>
                <i style={{'fontSize':'40px'}}>
                    <FontAwesomeIcon icon={faXmark}/>
                </i>
            </span>
            <div className="pop-up">
                <div onClick={downloadPDF}>
                  <i>
                   <FontAwesomeIcon icon={faFilePdf}/>
                  </i>
                  <h3 style={{'margin':'0'}}>
                    .PDF
                  </h3>
                </div>
                <div onClick={downloadDOCX}>
                  <i>
                    <FontAwesomeIcon icon={faFileWord}/>
                  </i>
                  <h3 style={{'margin':"0"}}>
                    .DOCX
                  </h3>
                </div>
            </div>
        </div>
    )
}